import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Container, 
  Paper,
  Grid
} from '@mui/material';
import { toast } from 'react-toastify';
import { auth } from '../../../utils/firebase';
import { loginSchema } from '../schemas/loginSchema';
import projectProgress from '../../../assets/project-progress.png'; // Add your illustration here

interface LoginFormValues {
  emailOrPhone: string;
  password: string;
}

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, values.emailOrPhone, values.password);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Google login failed.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#4338ca', // Indigo background color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          borderRadius: 4,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 1000,
          minHeight: 600,
          bgcolor: 'white'
        }}
      >
        <Grid container>
          {/* Left side - Login Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ 
                  mb: 4,
                  fontWeight: 600
                }}
              >
                Login
              </Typography>

              <Formik
                initialValues={{ emailOrPhone: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form style={{ width: '100%' }}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="emailOrPhone"
                      label="Email or Phone Number"
                      error={touched.emailOrPhone && !!errors.emailOrPhone}
                      helperText={touched.emailOrPhone && errors.emailOrPhone}
                      sx={{ mb: 2 }}
                    />
                    
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ mb: 1 }}
                    />

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textAlign: 'right', 
                        mb: 3,
                        color: 'primary.main',
                        cursor: 'pointer'
                      }}
                    >
                      Forgot password?
                    </Typography>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isLoading}
                      sx={{
                        py: 1.5,
                        bgcolor: '#4338ca',
                        '&:hover': {
                          bgcolor: '#3730a3'
                        }
                      }}
                    >
                      Login
                    </Button>

                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        borderColor: '#4338ca',
                        color: '#4338ca',
                        '&:hover': {
                          borderColor: '#3730a3'
                        }
                      }}
                    >
                      Sign in with Google
                    </Button>

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 3,
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Don't have an account? 
                      <Typography
                        component="span"
                        sx={{
                          color: 'primary.main',
                          ml: 0.5,
                          cursor: 'pointer'
                        }}
                      >
                        Sign up
                      </Typography>
                    </Typography>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>

          {/* Right side - Illustration */}
          <Grid 
            item 
            xs={12} 
            md={6}
            sx={{
              bgcolor: '#f3f4f6',
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              textAlign: 'center'
            }}
          >
            <img
              src={projectProgress}
              alt="Project Progress"
              style={{
                maxWidth: '80%',
                height: 'auto',
                marginBottom: '2rem'
              }}
            />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Check Your Project Progress
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Lorem ipsum dolor sit amet tristique volutpat sed pellentesque
              diam augue sed netus.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}; 