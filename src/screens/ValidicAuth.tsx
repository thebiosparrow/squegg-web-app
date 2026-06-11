import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_URL } from '../constant/api';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

interface LoginParams {
  email: string;
  password: string;
}

interface ResponsePayload {
  redirectUrl: string;
  status: string;
  message?: string
}

const EmailForm = (
  {
    onSubmit,
    loading
  }: {
    onSubmit: ({email, password}: LoginParams) => Promise<void>,
    loading: boolean
  }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={(values) => onSubmit({email: values.email, password: values.password})}
    validationSchema={loginValidationSchema}
  >
    {({ handleChange, handleSubmit, errors, values, touched, handleBlur }) => (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          Squegg Login
        </Typography>

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          variant="outlined"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 2, backgroundColor: "#6420AA" }}
        >
          {loading ? <CircularProgress size={24} style={{color: '#6420AA'}}/> : 'Login'}
        </Button>
      </Box>
    )}
  </Formik>
);

const App = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionToken = urlParams.get('session_token');
  const organization = urlParams.get('organization');
  const redirectUrl = urlParams.get('redirect_url');

  const [loading, setLoading] = useState(false);

  const login = async ({email, password}: LoginParams) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login-for-validic`, {
        username: email,
        password,
        sessionToken,
        organization,
        redirectUrl
      });
      const responseData: ResponsePayload = response.data.data;
      const {
        redirectUrl: responseRedirectUrl,
        status,
        message
      } = responseData;
      let errorMessage = '';

      if (status == 'failure') {
        errorMessage = `&error=${message}`
      }
      window.location.replace(`${responseRedirectUrl}?status=${status}${errorMessage}`)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 2
      }}
      >
      <EmailForm
        onSubmit={login}
        loading={loading}
      />
      <ToastContainer />
    </Container>
  );
};

export default App;
