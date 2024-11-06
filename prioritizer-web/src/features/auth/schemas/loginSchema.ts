import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
    .required('Email or phone number is required')
    .test('emailOrPhone', 'Invalid email or phone number', (value) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
}); 