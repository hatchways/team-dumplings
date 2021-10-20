import { alpha } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
    },
  },
  caption: {
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  label: {
    fontWeight: 800,
    fontSize: 12,
    color: theme.palette.common.black,
    textTransform: 'uppercase',
    marginTop: theme.spacing(1),
  },
  inputs: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    height: '100%',
    padding: theme.spacing(2),
    marginTop: 0,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  submit: {
    textTransform: 'uppercase',
    margin: theme.spacing(6, 2, 2),
    padding: theme.spacing(1),
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    fontSize: 12,
    fontWeight: 600,
  },
  circularProgress: {
    color: theme.palette.common.white,
  },
}));

export default useStyles;
