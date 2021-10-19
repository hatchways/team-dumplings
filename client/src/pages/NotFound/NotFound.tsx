import { Box, Card, CardMedia, Grid, Paper, Typography } from '@material-ui/core';
import { CustomButton } from '../../components/Button/CustomButton';
import useStyles from './useStyles';

const NotFound = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.root}>
        <Card className={classes.card}>
          <CardMedia image="assets/logo.png" className={classes.media} />
        </Card>
        <Grid item container xs={11} md={6} component={Paper} square className={classes.wrapper}>
          <Typography variant="h1" className={classes.title}>
            404
          </Typography>
          <Typography variant="h3" className={classes.subTitle}>
            opps! page not found
          </Typography>
          <Typography variant="body2" style={{ marginTop: 10 }}>
            Sorry, the page you&apos;re looking for doesn&apos;t exist. if you think something is broken, report a
            problem.
          </Typography>
          <Box marginTop={6} display="flex" alignContent="center" justifyContent="center">
            <CustomButton linkTo={'/'} btnText={'return home'} style={'notFoundHome'} />
            <CustomButton linkTo={'/'} btnText={'report problem'} style={'report'} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
