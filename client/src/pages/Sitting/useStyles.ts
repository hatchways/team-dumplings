import { makeStyles } from '@material-ui/core/styles';
import { orange, red, teal, cyan, grey, blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  dataGrid: {
    minHeight: '132px',

    '& .MuiDataGrid-dataContainer, & .MuiDataGrid-viewport': {
      minWidth: 'auto!important',
    },

    '& .MuiDataGrid-viewport': {
      width: 'fit-content',
      maxWidth: 'none!important',
      minWidth: '100%!important',
    },

    '& .MuiDataGrid-viewport, & .MuiDataGrid-renderingZone, & .MuiDataGrid-row': {
      maxHeight: 'fit-content!important',
    },

    '& .MuiDataGrid-renderingZone': {
      transform: 'none!important',
      marginRight: '-16px',
    },

    '& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-cell': {
      textOverflow: 'unset',
      whiteSpace: 'normal',
      lineHeight: '1.2!important',
      maxHeight: 'fit-content!important',
      minHeight: 'auto!important',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'stretch',

      '& > div': {
        maxHeight: 'inherit',
        width: '100%',
        whiteSpace: 'initial',
        lineHeight: '1',
      },
    },

    '& .MuiDataGrid-columnHeader > div': {
      height: '100%',
    },

    '& .MuiDataGrid-columnHeaderWrapper': {
      maxHeight: 'none!important',
      flex: '1 0 auto',
    },

    '& .MuiDataGrid-row .MuiDataGrid-columnsContainer': {
      maxHeight: 'none!important',
    },

    '& .MuiDataGrid-cell': {
      overflowWrap: 'anywhere',
      padding: '0',

      '&--textRight div': {
        textAlign: 'right',
        justifyContent: 'flex-end',
      },

      '&:last-of-type > div': {
        paddingRight: theme.spacing(3),
      },

      '& > div': {
        padding: '0.75em',
        display: 'flex',
        alignSelf: 'stretch',
        alignItems: 'center',
      },
    },
  },
  root: {
    minHeight: '100vh',
    background: '#fafafa',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    paddingTop: theme.spacing(12),
  },
  title: {
    color: theme.palette.common.black,
    fontWeight: 600,
    textAlign: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: 'center',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  dogChip: {
    margin: theme.spacing(0.5),
    fontSize: theme.typography.pxToRem(12),
    '&.Mui-disabled': {
      textDecorationLine: 'line-through',
    },
  },
  chip: {
    '&.pending': {
      color: orange[400],
      borderColor: orange[400],
    },
    '&.declined': {
      color: red[400],
      borderColor: red[400],
    },
    '&.accepted': {
      color: teal[400],
      borderColor: teal[400],
    },
    '&.paid': {
      color: cyan[400],
      borderColor: cyan[400],
    },
    '&.progress': {
      color: blue[400],
      borderColor: blue[400],
    },
    '&.done': {
      color: grey[400],
      borderColor: grey[400],
    },
  },
}));
export default useStyles;
