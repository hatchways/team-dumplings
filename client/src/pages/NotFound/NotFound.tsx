import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { CustomButton } from '../../components/Button/CustomButton';
import useStyles from './useStyles';

const NotFound = (): JSX.Element => {
  const { root, wrapper, title, subTitle, media } = useStyles();
  return (
    <>
      <Grid container className={root}>
        <Box
          position="absolute"
          top={0}
          bottom={405}
          left={0}
          right={0}
          margin="auto"
          maxWidth={46}
          maxHeight={36}
          zIndex={2}
          border="none"
          boxShadow="none"
        >
          <img src="assets/logo.png" className={media} alt="Marketplace for Dog Sitters, Dog Owners" />
        </Box>
        <Grid item container xs={11} md={6} square component={Paper} className={wrapper}>
          <Typography variant="h1" className={title}>
            404
          </Typography>
          <Typography variant="h3" className={subTitle}>
            Oops! page not found
          </Typography>
          <Typography variant="body2">
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
