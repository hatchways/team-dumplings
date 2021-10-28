import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import useStyles from './useStyles';
import clsx from 'clsx';

const Payment = () => {
  const { root, sideBarMenuItem, title } = useStyles();
  return (
    <>
      <NavBar />
      <Grid container className={root} justifyContent={'center'}>
        <Grid container item md={2}>
          <Box width={'100%'} height="100%" pt={5} pb={10} pl={5}>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Edit Profile
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Profile Photo
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Availability
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, 'active')}>
              Payment
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Security
            </Link>
            <Link to={'#'} component={Box} className={clsx(sideBarMenuItem, '')}>
              Settings
            </Link>
          </Box>
        </Grid>
        <Grid container item md={6}>
          <Box width={'100%'} height="100%" component={Paper} pt={10} display="flex" justifyContent="center">
            <Typography variant="h2" className={title}>
              Payment Methods
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Payment;
