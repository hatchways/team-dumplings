import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';

interface Props {
  linkTo: string;
  asideText: string;
  btnText: string;
}

const AuthHeader = ({ linkTo, asideText, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.authHeader}>
      <Typography className={classes.accAside}>{asideText}</Typography>
      <Link to={linkTo} className={classes.link}>
        <Button color="inherit" className={classes.accBtn} variant="contained">
          {btnText}
        </Button>
      </Link>
    </Box>
  );
};

export default AuthHeader;
