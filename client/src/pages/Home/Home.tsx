import { Box, Container, Grid, InputLabel, Paper, TextField, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import clsx from 'clsx';
import { useState } from 'react';
import { CustomButton } from '../../components/Button/CustomButton';
import { CustomInput } from '../../components/Input/CustomInput';
import useStyles from './useStyles';
const TODAY = new Date().toLocaleDateString('en-CA');

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
  const [where, setWhereValue] = useState<string>('');
  const [dropIn, setDropIn] = useState<string>(TODAY);
  const [dropOff, setDropOff] = useState<string>(TODAY);
  const handleWhereChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhereValue(e.target.value);
  };
  const handleDropInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropIn(e.target.value);
  };
  const handleDropOffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropOff(e.target.value);
  };

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
                <CustomInput placeholder="Anywhere" id="where" onChange={handleWhereChange} />
              </FormElement>
              <FormElement>
                <InputLabel htmlFor="date" className={label}>
                  Drop In / Drop Off
                </InputLabel>
                <Box width={'100%'} display="flex">
                  <TextField
                    id="dateIn"
                    type="date"
                    defaultValue={TODAY}
                    className={clsx(dateInOff, 'left')}
                    onChange={handleDropInChange}
                  />
                  <TextField
                    id="dateOff"
                    type="date"
                    defaultValue={TODAY}
                    className={clsx(dateInOff, 'right')}
                    onChange={handleDropOffChange}
                  />
                </Box>
              </FormElement>
              <FormElement>
                <CustomButton
                  linkTo={{
                    pathname: '/listing',
                    state: { where, dropIn, dropOff },
                  }}
                  btnText={'Find My Dog Sitter'}
                  style={'findMyDog'}
                />
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
