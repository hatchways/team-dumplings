import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
    },
  },
  inputs: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    height: '100%',
    padding: theme.spacing(2),
    marginBottom: '2em',
    hidden: true,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:cfous': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  label: {
    fontSize: 12,
    fontWeight: 800,
    color: theme.palette.common.black,
    textTransform: 'uppercase',
  },
  typography: {
    fontSize: 20,
    fontWeight: 800,
    textTransform: 'uppercase',
    margin: '1em 0 1em 0',
  },
  iconButton: {
    marginTop: 5,
  },
  submit: {
    textDecoration: 'none',
    margin: 5,
    fontSize: 12,
    fontWeight: 600,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    border: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(2, 4, 2, 4),
  },
}));

export default useStyles;
