import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthActionCreator } from 'store/slices';
import { userRegister as validationUserSchema } from 'validation-schemas';
import { TextInput, Link, Button, FormField } from 'components/common';

import styles from './styles.module.scss';

const DEFAULT_VALUES = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
};

const SignUpForm = () => {
    const x  = useForm({
        resolver: yupResolver(validationUserSchema),
        defaultValues: DEFAULT_VALUES,
        mode: 'onChange',
    });

    const { handleSubmit, formState: { errors }, control }  = x;

    const dispatch = useDispatch();

    const onSubmit = formData => {
        dispatch(AuthActionCreator.registration(formData));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formSignUp}>
            <h2 className={styles.title}>Sign Up</h2>

            <div className={styles.textBlock}>
                Have account? <Link to='/sign-in'>Sign In</Link>
            </div>

            <div className={styles.inputBlock}>
                <FormField
                    component={TextInput}
                    name='name'
                    label="Name"
                    hasHiddenLabel={false}
                    placeholder="Name"
                    type='text'
                    color='gray-light'
                    control={control}
                    errors={errors}
                />

            </div>

            <div className={styles.inputBlock}>
                <FormField
                    component={TextInput}
                    name='surname'
                    label="Surname"
                    hasHiddenLabel={false}
                    placeholder="Surname"
                    type='text'
                    color='gray-light'
                    control={control}
                    errors={errors}
                />
            </div>

            <div className={styles.inputBlock}>
                <FormField
                    component={TextInput}
                    name='email'
                    label="Email"
                    hasHiddenLabel={false}
                    placeholder="Email"
                    type='email'
                    color='gray-light'
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

            <div className={styles.inputBlock}>
                <FormField
                    component={TextInput}
                    name='phone'
                    label="Phone"
                    hasHiddenLabel={false}
                    placeholder="Phone"
                    type='phone'
                    color='gray-light'
                    control={control}
                    errors={errors}
                />
            </div>

            <div className={styles.submitBtn}>
                <Button
                    label="Sign Up"
                    hasHiddenLabel={false}
                    type='submit'
                    color='primary-dark'
                    styleType='wothout-border'
                />
            </div>
        </form>
    );
};

export default SignUpForm;
