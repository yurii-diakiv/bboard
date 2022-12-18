import * as yup from 'yup';

const phone = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const userRegister = yup.object().shape({
    name: yup
        .string()
        .required('Name is required'),
    surname: yup
        .string()
        .required('Surname is required'),
    email: yup
        .string()
        .required('Email is required')
        .email('Email is incorrect'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must have at least 6 characters'),
    phone: yup
        .string()
        .required('Phone is required')
        .matches(phone, 'Phone is incorrect')
});

export { userRegister };
