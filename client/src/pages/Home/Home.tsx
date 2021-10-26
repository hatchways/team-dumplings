import { Box, Container, Grid, InputLabel, Paper, TextField, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './useStyles';
import clsx from 'clsx';
import { CustomButton } from '../../components/Button/CustomButton';
import { CustomInput } from '../../components/Input/CustomInput';
import { styled } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';

const FormElement = ({ children }: { children: JSX.Element[] | JSX.Element }): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column" marginBottom={3}>
      {children}
    </Box>
  );
};

const HomeGrid = styled(Grid)(spacing);

const Home = (): JSX.Element => {
  const { root, leftLogoContainer, leftLogoText, leftBodyContainer, slogan, label, dateInOff, right, background } =
    useStyles();
  return (
    <>
      <HomeGrid container className={root}>
        <HomeGrid item xs={12} md={6} p={4}>
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
        </HomeGrid>
        <HomeGrid item xs={12} md={6} p={3} className={right}>
          <img src="/assets/bg.jpg" alt={'Marketplace for Dog Sitters, Dog Owners'} className={background} />
          <Box display="flex" justifyContent="flex-end">
            <CustomButton linkTo={'/'} btnText={'Become a sitter'} style={clsx('sitter', 'home')} />
            <CustomButton linkTo={'/signin'} btnText={'Login'} style={clsx('login', 'home')} />
            <CustomButton linkTo={'/signup'} btnText={'Signup'} style={'signup'} />
          </Box>
        </HomeGrid>
      </HomeGrid>
    </>
  );
};

export default Home;
