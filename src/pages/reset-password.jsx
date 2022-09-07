import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../services/actions/auth';
import useForm from '../hooks/use-form';
import styles from './login.module.css'

export const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const passwordRecoverySuccess = useSelector(state => state.auth.passwordRecoverySuccess);
    const resetPasswordSuccess = useSelector(state => state.auth.resetPasswordSuccess);
    const { values, handleChange } = useForm({
        password: '',
        token: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(values))
    }

    if (user || !passwordRecoverySuccess) {
        return (
            <Redirect to='/' />
        );
    }

    return (
        <div className={`${styles.container} ${styles.restPassword__container}`}>
            <Logo />
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <PasswordInput value={values.password} onChange={handleChange} name='password' />
                </div>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <Input type='text' placeholder='Введите код из письма' value={values.token} onChange={handleChange} name='token' />
                </div>

                <Button size='medium' type='primary' disabled={!values.password || !values.token}>Сохранить</Button>
                {resetPasswordSuccess && (
                    <p className={`text text_type_main-default pt-2`}>Пароль успешно восстановлен</p>
                )}

                <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>


            </form>

        </div>
    )
}