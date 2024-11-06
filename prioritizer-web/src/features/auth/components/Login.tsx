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
        width: '100vw',
        height: '100vh',
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 4 }
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: 'flex',
          borderRadius: 3,
          overflow: 'hidden',
          width: '100%',
          maxWidth: '1000px',
          minHeight: { xs: 'auto', md: '600px' },
          bgcolor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
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
                  fontWeight: 700,
                  color: 'text.primary',
                  fontSize: { xs: '1.75rem', md: '2rem' }
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
                      sx={{ 
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          }
                        }
                      }}
                    />
                    
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ 
                        mb: 1,
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          }
                        }
                      }}
                    />

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textAlign: 'right', 
                        mb: 3,
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.dark'
                        }
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
                        bgcolor: 'primary.main',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          bgcolor: 'primary.dark'
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
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          borderColor: 'primary.dark',
                          bgcolor: 'background.default'
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
                          cursor: 'pointer',
                          fontWeight: 600,
                          '&:hover': {
                            color: 'primary.dark'
                          }
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
              bgcolor: 'background.default',
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
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              Check Your Project Progress
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: 'text.secondary',
                maxWidth: '80%',
                lineHeight: 1.6
              }}
            >
              Lorem ipsum dolor sit amet tristique volutpat sed pellentesque
              diam augue sed netus.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};