import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress, InputLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

export default function Login({ handleSubmit }: Props): JSX.Element {
  const { form, caption, link, label, inputs, submit, circularProgress } = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={form} noValidate>
          <InputLabel htmlFor="email" className={label}>
            Email
          </InputLabel>
          <TextField
            id="email"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: inputs },
              disableUnderline: true,
            }}
            name="email"
            autoComplete="email"
            placeholder="Email"
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
          />
          <InputLabel htmlFor="password" className={label}>
            Password
          </InputLabel>
          <TextField
            id="password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
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
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={submit}>
              {isSubmitting ? <CircularProgress className={circularProgress} /> : 'Login'}
            </Button>
          </Box>
          <Box textAlign="center">
            <Typography className={caption}>
              Don&apos;t have an account? &nbsp;
              <Link className={link} to="/signup">
                Signup
              </Link>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}
