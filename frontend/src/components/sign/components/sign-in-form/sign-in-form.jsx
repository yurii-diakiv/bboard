import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login as loginSchema } from 'validation-schemas';
import { TextInput, Link, Button, FormField } from 'components/common';
import { AuthActionCreator } from 'store/slices';

import styles from './signin.module.scss';

const SIGN_IN_DEFAULT_VALUES = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
        defaultValues: SIGN_IN_DEFAULT_VALUES,
    });
    const dispatch = useDispatch();

    const handleFormSubmit = formValues => {
        dispatch(AuthActionCreator.login(formValues));
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={styles.formSignIn}
        >
            <h2 className={styles.title}>Sign In</h2>

            <div className={styles.textBlock}>
                No account? <Link to='/sign-up'>Sign up</Link>
            </div>

            <div className={styles.inputBlock}>
                <FormField
                    component={TextInput}
                    name='email'
                    label="Email"
                    hasHiddenLabel={false}
                    placeholder="Email"
                    type='email'
                    color='gray-ligth'
                    control={control}
                    errors={errors}
                />
            </div>

            <div className={styles.inputBlock}>
                <FormField
                    component={TextInput}
                    name='password'
                    label="Password"
                    hasHiddenLabel={false}
                    placeholder="Password"
                    type='password'
                    color='gray-ligth'
                    control={control}
                    errors={errors}
                />
            </div>

            <div className={styles.submitBtn}>
                <Button
                    label="Sign In"
                    hasHiddenLabel={false}
                    type='submit'
                    color='primary-dark'
                    styleType='withput-border'
                />
            </div>
        </form>
    );
};
export default SignInForm;
