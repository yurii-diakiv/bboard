import * as yup from 'yup';

const login = yup.object().shape({
    email: yup
        .string()
        .email('Email is incorrect')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must have at least 6 characters')
        .required('Password is required')
});

export { login };
