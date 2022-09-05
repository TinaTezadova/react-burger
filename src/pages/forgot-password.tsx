import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { recoveryPassword } from '../services/actions/auth';
import useForm from '../hooks/use-form';
import styles from './login.module.css';


export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const { values, handleChange } = useForm({email: ''});
    const passwordRecoverySuccess = useSelector(state => state.auth.passwordRecoverySuccess);

    const submitForm = (event) => {
        event.preventDefault();
        dispatch(recoveryPassword(values))
    }

    if (user) {
        return (
            <Redirect to='/' />
        );
    }

    if (passwordRecoverySuccess) {
        return (
            <Redirect to='/reset-password' />
        );
    }

    return (
        <div className={`${styles.container} ${styles.forgotPassword__container}`}>
            <Logo />
            <form className={styles.form} onSubmit={submitForm}>
                <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <Input type='email' placeholder='Укажите e-mail' value={values.email} onChange={handleChange} name='email'/>
                </div>

                <Button size='medium' type='primary' disabled={!values.email}>Восстановить</Button>

                <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>


            </form>

        </div>
    )
}