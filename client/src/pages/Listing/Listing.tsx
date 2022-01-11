import { Box, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { CustomButton } from '../../components/Button/CustomButton';
import NavBar from '../../components/NavBar/NavBar';
import { useSnackBar } from '../../context/useSnackbarContext';
import { listProfiles } from '../../helpers/APICalls/listProfiles';
import { Profile } from '../../interface/Profile';
import { ListingItem, rate } from './ListingItem';
import useStyles from './useStyles';
import { useDebounce } from 'use-debounce';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

const defaultDropInOffDate = new Date().toLocaleDateString('en-CA');

const Listing = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { root, title, search, dateInOff, iconStyle } = useStyles();
  const TODAY = new Date().getDay();
  const [loading, setLoading] = useState<undefined | boolean>(undefined);
  const [filter, setFilter] = useState<boolean>(false);
  const { updateSnackBarMessage } = useSnackBar();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [dateIn, setDateIn] = useState<number>(TODAY);
  const [dateOff, setDateOff] = useState<number>(TODAY);
  const [defaultDropIn, setDefaultDropIn] = useState(defaultDropInOffDate);
  const [defaultDropOff, setDefaultDropOff] = useState(defaultDropInOffDate);

  const [searchString, setSearchString] = useState<string>('');
  const dateInRef = useRef<HTMLInputElement>(null);
  const dateOffRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [debouncedSearch] = useDebounce({ filter, dateIn, dateOff, searchString }, 800);

  const handleFilterChange = () => {
    setFilter((filter) => !filter);
    if (filter) {
      const searchInput = searchRef.current;
      const dateInInput = dateInRef.current;
      const dateOffInput = dateOffRef.current;

      if (searchInput && dateInInput && dateOffInput) {
        searchInput.value = '';
        dateInInput.value = new Date().toISOString().slice(0, 10);
        dateOffInput.value = new Date().toISOString().slice(0, 10);
      }

      setSearchString('');
      setDateIn(TODAY);
      setDateOff(TODAY);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
    setFilter(true);
  };

  const handleDateInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateIn(new Date(event.target.value).getDay());
    setDefaultDropIn(new Date(event.target.value).toLocaleDateString('en-CA'));
    setFilter(true);
  };

  const handleDateOffChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateOff(new Date(event.target.value).getDay());
    setDefaultDropOff(new Date(event.target.value).toLocaleDateString('en-CA'));
    setFilter(true);
  };

  const getFullName = (firstName: string, lastName: string): string => {
    return firstName.concat(' ').concat(lastName);
  };

  const saveProfiles = (profiles: Profile[]) => {
    setProfiles(profiles);
  };

  useEffect(() => {
    let effect = true;
    if (location.state) {
      // eslint-disable-next-line
      const { where, dropOff, dropIn }: any = location.state;
      setDefaultDropIn(dropIn);
      setDefaultDropOff(dropOff);
      setDateIn(new Date(dropIn).getDay());
      setDateOff(new Date(dropOff).getDay());
      setSearchString(where);
      setFilter(true);
      history.replace('/listing', null);
    }
    return () => {
      effect = false;
    };
  }, [location, history]);

  useEffect(() => {
    let ignore = true;

    function getProfiles() {
      setLoading(true);
      listProfiles({ ...debouncedSearch }).then((response) => {
        if (response.error) {
          updateSnackBarMessage(JSON.stringify(response.error));
        } else if (response.success && response.success.profiles) {
          if (ignore) {
            saveProfiles(response.success.profiles);
            updateSnackBarMessage('Success Loading !');
          }
        } else {
          updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
        }
      });

      setLoading(false);
    }
    getProfiles();

    return () => {
      ignore = false;
    };
  }, [updateSnackBarMessage, debouncedSearch]);

  return (
    <>
      <NavBar />
      <Grid container className={root} justifyContent="space-around" alignItems="center" spacing={2}>
        <Grid container item justifyContent="space-around" alignItems="center" spacing={5}>
          <Grid item>
            <Typography variant="h2" className={title}>
              Your search results
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" alignItems="center">
            <Box display="flex">
              <TextField
                className={search}
                inputRef={searchRef}
                onChange={handleSearchChange}
                placeholder="Toronto, Ontario"
                value={searchString}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className={iconStyle} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="dateIn"
                InputProps={{
                  disableUnderline: true,
                }}
                type="date"
                defaultValue={defaultDropIn}
                value={defaultDropIn}
                className={clsx(dateInOff, 'left')}
                onChange={handleDateInChange}
                inputRef={dateInRef}
              />
              <TextField
                id="dateOff"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      {!filter ? (
                        <IconButton aria-label="clear/apply search filter" onClick={handleFilterChange}>
                          <CheckIcon />
                        </IconButton>
                      ) : (
                        <IconButton aria-label="clear/apply search filter" onClick={handleFilterChange}>
                          <ClearIcon color="primary" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
                type="date"
                defaultValue={defaultDropOff}
                value={defaultDropOff}
                className={clsx(dateInOff, 'right')}
                onChange={handleDateOffChange}
                inputRef={dateOffRef}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container item direction="row" xs={12} md={10}>
          <Grid item container spacing={1}>
            {!loading && !!profiles.length ? (
              profiles.map(
                ({ _id, address, description, firstName, gender, lastName, phoneNumber, rate, availability }) => (
                  <ListingItem
                    key={_id}
                    image={'img'}
                    fullName={getFullName(firstName, lastName)}
                    rating={Math.floor(Math.random() * 5) as rate}
                    slogan={'slogan'}
                    description={description}
                    location={address}
                    price={rate || 0}
                    availability={availability}
                    profileId={_id!}
                  />
                ),
              )
            ) : (
              <>
                <Box display="flex" width="100%" justifyContent="center" flexDirection="column">
                  <Typography variant="h2" color="primary" align="center">
                    No results found.
                  </Typography>
                  <Typography variant="body2" align="center">
                    We can't find any item matching your search.
                  </Typography>
                </Box>
              </>
            )}
          </Grid>
          <Grid item container md={12}>
            <Box width={'100%'} alignItems="center" justifyContent="center" display="flex" pt={5} pr={10} pl={10}>
              <CustomButton linkTo="/" btnText="show more" style="showmore" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Listing;
