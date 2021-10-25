import { Avatar, Box, Chip, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import MessageIcon from '@material-ui/icons/Message';
import clsx from 'clsx';
import moment from 'moment';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useSnackBar } from '../../context/useSnackbarContext';
import { listRequests } from '../../helpers/APICalls/listRequests';
import { updateRequest } from '../../helpers/APICalls/updateRequest';
import { Request, SittingRequest } from '../../interface/Request';
import DogInfoAccordion from './DogInfoAccordion';
import useStyles from './useStyles';

const Sitting = () => {
  const [requests, setRequests] = useState<Request[] | SittingRequest[]>([]);
  const { updateSnackBarMessage } = useSnackBar();
  const [loading, setLoading] = useState<boolean>(true);
  const [referesh, setReferesh] = useState<boolean>(false);

  const saveRequests = (requests: Request[] | SittingRequest[]) => {
    setRequests(requests);
  };

  const handleUpdateStatus = ({ _id, ownerId, sitterId, dogId, start, end, status }: Request) => {
    setReferesh(false);
    updateRequest({ _id, ownerId, sitterId, dogId, start, end, status }).then((response) => {
      if (response.error) {
        updateSnackBarMessage(response.error.message);
      } else if (response.updatedRequest) {
        updateSnackBarMessage('Request updated  successfully');
      } else {
        updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
      }
    });
    setReferesh(true);
  };

  useEffect(() => {
    let ignore = true;

    function getRequests() {
      setLoading(true);
      listRequests().then((response) => {
        if (response.error) {
          updateSnackBarMessage(response.error.message);
        } else if (response.requests) {
          if (ignore) {
            saveRequests(response.requests);
            updateSnackBarMessage('Request Loaded successfully');
          }
        } else {
          updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
        }
      });

      setLoading(false);
      setReferesh(false);
    }
    getRequests();
    return () => {
      ignore = false;
    };
  }, [updateSnackBarMessage, referesh]);

  const { dataGrid, root, title, chip, heading, secondaryHeading, details, helper, link, dogChip } = useStyles();
  const columns = [
    {
      field: 'owner',
      headerName: 'Owner Info',
      width: 180,
      renderCell: function renderOwner(data: any) {
        return (
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <Avatar>{data.row.ownerId.profile.firstName.charAt(0)}</Avatar>
            <Box marginLeft={2}>
              <Typography>{`  ${data.row.ownerId.profile.firstName}  ${data.row.ownerId.profile.lastName}`}</Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: 'dog',
      headerName: 'Dog Info',
      width: 400,
      renderCell: function renderDogInfo(data: any) {
        const dog = data.row.dogId;
        return <DogInfoAccordion dog={dog} />;
      },
    },
    {
      field: 'DropIn',
      headerName: 'Drop in',
      width: 180,
      renderCell: function renderDropOff(data: any) {
        return <Typography>{moment(data.row.start).format('ddd DD/MM/YY h:mm a')}</Typography>;
      },
    },
    {
      field: 'DropOff',
      headerName: 'Drop off',
      width: 180,
      renderCell: function renderDropIn(data: any) {
        return <Typography>{moment(data.row.end).format('ddd DD/MM/YY h:mm a')}</Typography>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: function renderStatus(data: any) {
        return (
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <Chip label={data.row.status} variant="outlined" className={clsx(chip, data.row.status)} />
          </Box>
        );
      },
    },
    {
      field: 'price',
      headerName: 'Amount',
      width: 120,
      renderCell: function renderOwner(data: any) {
        const sittingHours = moment(data.row.end).diff(moment(data.row.start), 'hours');
        // TODO update, to get a real a price, we should update `Profile` to have `Price` field
        return <Typography>{`$ ${data.row.sitterId.profile.rate * 10 * sittingHours}`}</Typography>;
      },
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 150,
      renderCell: function renderOwner(data: any) {
        const request = data.row;
        const isDisabled = request.status === 'pending';
        return (
          <Box>
            <Tooltip title="Accept" placement="top">
              <IconButton
                disabled={!isDisabled}
                onClick={() => {
                  handleUpdateStatus({
                    _id: request._id,
                    ownerId: request.ownerId._id,
                    sitterId: request.sitterId._id,
                    dogId: request.dogId._id,
                    start: request.start,
                    end: request.end,
                    status: 'accepted',
                  });
                }}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Decline" placement="top">
              <IconButton
                color="primary"
                disabled={!isDisabled}
                onClick={() => {
                  handleUpdateStatus({
                    _id: request._id,
                    ownerId: request.ownerId._id,
                    sitterId: request.sitterId._id,
                    dogId: request.dogId._id,
                    start: request.start,
                    end: request.end,
                    status: 'declined',
                  });
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Messenger" placement="top">
              <IconButton color="default">
                <MessageIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <NavBar />
      <Grid container className={root} justifyContent="space-around" alignItems="center" spacing={2}>
        <Grid container item justifyContent="space-around" alignItems="center" spacing={5}>
          <Grid item>
            <Typography variant="h2" className={title}>
              My sitting requests
            </Typography>
          </Grid>
        </Grid>
        <Grid container item direction="row" xs={12} md={11}>
          <Box width="100%" minHeight={800}>
            <DataGrid
              className={dataGrid}
              getRowId={(row) => row._id}
              rows={requests}
              columns={columns}
              pageSize={8}
              checkboxSelection={false}
              rowsPerPageOptions={[8]}
              disableSelectionOnClick
              loading={loading}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Sitting;
