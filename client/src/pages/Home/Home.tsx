import { Box, Container, Grid, InputLabel, Paper, TextField, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './useStyles';
import clsx from 'clsx';
import { CustomButton } from '../../components/Button/CustomButton';
import { CustomInput } from '../../components/Input/CustomInput';

const FormElement = ({ children }: { children: JSX.Element[] | JSX.Element }): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column" marginBottom={3}>
      {children}
    </Box>
  );
};

const Home = (): JSX.Element => {
  const theme = useTheme();
  const { root, leftLogoContainer, leftLogoText, leftBodyContainer, slogan, label, dateInOff, right, background } =
    useStyles();
  return (
    <>
      <Grid container className={root}>
        <Grid item xs={12} md={6} style={{ padding: theme.spacing(4) }}>
          <Paper variant="outlined" className={leftLogoContainer}>
            <img src="/assets/logo.png" alt={'Marketplace for Dog Sitters, Dog Owners'} />
            <Typography variant="h4" className={leftLogoText}>
              LovingSitter.
            </Typography>
          </Paper>
          <Container className={leftBodyContainer}>
            <Typography variant="h1" className={slogan}>
              Find the care your dog deserves
            </Typography>
            <form action="/action" method="get">
              <FormElement>
                <InputLabel htmlFor="where" className={label}>
                  Where
                </InputLabel>
                <CustomInput placeholder="Anywhere" id="where" />
              </FormElement>
              <FormElement>
                <InputLabel htmlFor="date" className={label}>
                  Drop In / Drop Off
                </InputLabel>
                <Box width={'100%'} display="flex">
                  <TextField id="dateIn" type="date" defaultValue="2022-01-01" className={clsx(dateInOff, 'left')} />
                  <TextField id="dateOff" type="date" defaultValue="2022-01-10" className={clsx(dateInOff, 'right')} />
                </Box>
              </FormElement>
              <FormElement>
                <CustomButton linkTo={'/'} btnText={'Find My Dog Sitter'} style={'findMyDog'} />
              </FormElement>
            </form>
          </Container>
        </Grid>
        <Grid item xs={12} md={6} className={right}>
          <img src="/assets/bg.jpg" alt={'Marketplace for Dog Sitters, Dog Owners'} className={background} />
          <Box display="flex" justifyContent="flex-end">
            <CustomButton
              linkTo={'/'}
              btnText={'Become a sitter'}
              style={'sitter'}
              cssStyle={{
                color: 'white',
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: 'white',
              }}
            />
            <CustomButton
              linkTo={'/signin'}
              btnText={'Login'}
              style={'login'}
              cssStyle={{ color: 'white', border: '1px solid #dfaf7a' }}
            />
            <CustomButton linkTo={'/signup'} btnText={'Signup'} style={'signup'} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
