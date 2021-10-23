import { ButtonGroup, CircularProgress, Grid, InputLabel } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useStyles from './useStyles';
import DemoUser from '../../../components/DemoUser/DemoUser';

interface Props {
  handleSubmit: (
    {
      username,
      email,
      password,
      confirmPassword,
      role,
    }: {
      email: string;
      password: string;
      username: string;
      confirmPassword: string;
      role: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      username: string;
      confirmPassword: string;
      role: string;
    }>,
  ) => void;
}

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const { form, caption, link, label, inputs, submit, circularProgress, roleButton } = useStyles();
  const [role, setRole] = useState(true);

  const handleRoleButton = (): string => {
    setRole(!role);
    return role ? 'owner' : 'sitter';
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
          confirmPassword: '',
          role: 'sitter',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required').max(40, 'Username is too long'),
          email: Yup.string().required('Email is required').email('Email is not valid'),
          password: Yup.string()
            .required('Password is required')
            .max(100, 'Password is too long')
            .min(6, 'Password too short'),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        })}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, touched, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={form} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="username" className={label}>
                  Username
                </InputLabel>
                <TextField
                  id="username"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    classes: { input: inputs },
                    disableUnderline: true,
                  }}
                  name="username"
                  autoComplete="username"
                  placeholder="Username"
                  autoFocus
                  helperText={touched.username ? errors.username : ''}
                  error={touched.username && Boolean(errors.username)}
                  value={values.username}
                  onChange={handleChange}
                />
                <InputLabel htmlFor="email" className={label}>
                  Email
                </InputLabel>
                <TextField
                  id="email"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    classes: { input: inputs },
                    disableUnderline: true,
                  }}
                  name="email"
                  autoComplete="email"
                  placeholder="email@domain.com"
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                  value={values.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="password" className={label}>
                  Password
                </InputLabel>
                <TextField
                  id="password"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    classes: { input: inputs },
                    disableUnderline: true,
                  }}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  helperText={touched.password ? errors.password : ''}
                  error={touched.password && Boolean(errors.password)}
                  value={values.password}
                  onChange={handleChange}
                />

                <InputLabel htmlFor="confirmPassword" className={label}>
                  confrim password
                </InputLabel>
                <TextField
                  id="confirmPassword"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    classes: { input: inputs },
                    disableUnderline: true,
                  }}
                  type="password"
                  placeholder="Confirm password"
                  helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Box alignItems="center" justifyContent="center" display="flex" width="100%">
                <ButtonGroup disableElevation variant="contained">
                  <Button
                    className={roleButton}
                    disabled={!role}
                    onClick={() => {
                      setFieldValue('role', handleRoleButton());
                    }}
                  >
                    Owner
                  </Button>
                  <Button
                    className={roleButton}
                    disabled={role}
                    onClick={() => {
                      setFieldValue('role', handleRoleButton());
                    }}
                  >
                    Sitter
                  </Button>
                </ButtonGroup>
                <input type="hidden" name="role" id="role" />
              </Box>
            </Grid>
            <Box textAlign="center">
              <Button type="submit" size="large" variant="contained" color="primary" className={submit}>
                {isSubmitting ? <CircularProgress className={circularProgress} /> : 'Sign up'}
              </Button>
            </Box>
            <Box textAlign="center">
              <Typography className={caption}>
                Already a member? &nbsp;
                <Link className={link} to="/signin">
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
      <DemoUser />
    </>
  );
};

export default SignUpForm;
