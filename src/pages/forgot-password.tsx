import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { recoveryPassword } from '../services/actions/auth'
import styles from './login.module.css';


export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const passwordRecoverySuccess = useSelector(state => state.auth.passwordRecoverySuccess);
    const [email, setEmail] = useState('');
    const handleEmailChange = ({ target }) => {
        setEmail(target.value)
    }

    const submitForm = (event) => {
        event.preventDefault();
        dispatch(recoveryPassword({ email }))
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
                    <Input type='email' placeholder='Укажите e-mail' value={email} onChange={handleEmailChange} />
                </div>

                <Button size='medium' type='primary' disabled={!email}>Восстановить</Button>

                <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>


            </form>

        </div>
    )
}