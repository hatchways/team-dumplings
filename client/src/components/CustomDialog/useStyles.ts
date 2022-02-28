import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialog: {
    '&.comment': {
      maxHeight: '100vh',
    },
  },
}));

export default useStyles;
