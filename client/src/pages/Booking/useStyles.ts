import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',

    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },

    paddingTop: theme.spacing(12),
  },
  leftContainer: {
    minHeight: '100%',
    backgroundColor: 'transparent',
    border: 'none',
  },
  rightContainer: {
    minHeight: '100%',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  nextBooking: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
    '& .MuiCardHeader-title': {
      fontWeight: 600,
      fontSize: 12,
    },
  },
  currentBooking: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
    '& .MuiCardHeader-title': {
      fontWeight: 600,
      fontSize: 12,
    },
  },
  nextBookingCardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  currentBookingCardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingLeft: 0,
  },
  currentBookingItem: {
    border: '0.5px solid rgba(0, 0, 0, 0.2)',
    borderRadius: 1,
    marginBottom: theme.spacing(2),
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  currentBookingList: {
    overflowY: 'scroll',
    height: '50vh',
  },
  bookingStatus: {
    marginRight: theme.spacing(4),
  },
  currentBookingCardHeader: {
    paddingBottom: 0,
    paddingTop: theme.spacing(2),
    '& .MuiCardHeader-title': {
      fontSize: '0.8571428571428571rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  avatarFullName: {
    marginLeft: theme.spacing(2),
  },
  day: {
    padding: theme.spacing(0.2),
  },
  selectedDay: {
    '& .MuiButtonBase-root': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiTypography-root': {
        color: theme.palette.common.white,
      },
    },
  },
  datePicker: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    paddingTop: theme.spacing(1),
    '& .MuiPickersBasePicker-pickerView': {
      maxWidth: '100%',
      minWidth: '100%',
      minHeight: '100%',
      padding: theme.spacing(1),
    },
    '& .MuiPickersStaticWrapper-staticWrapperRoot': {},
    '& .MuiTypography-body1 ': {
      color: theme.palette.primary.main,
    },
    '& .MuiPickersBasePicker-container': {},
  },
}));

export default useStyles;
