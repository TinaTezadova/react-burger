import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../services/actions/auth';
import styles from './login.module.css'

export const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const passwordRecoverySuccess = useSelector(state => state.auth.passwordRecoverySuccess);
    const resetPasswordSuccess = useSelector(state => state.auth.resetPasswordSuccess);
    const [formValues, setFormValues] = useState({
        password: '',
        token: ''
    })

    const handleInputChange = ({ target }) => {
        setFormValues({ ...formValues, [target.name]: target.value })
    }

    const handleSaveClick = (e) => {
        dispatch(resetPassword(formValues))
    }

    if (user || !passwordRecoverySuccess) {
        return (
            <Redirect to='/' />
        );
    }

    return (
        <div className={`${styles.container} ${styles.restPassword__container}`}>
            <Logo />
            <form className={styles.form}>
                <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <PasswordInput value={formValues.password} onChange={handleInputChange} name='password' />
                </div>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <Input type='text' placeholder='Введите код из письма' value={formValues.token} onChange={handleInputChange} name='token' />
                </div>

                <Button size='medium' type='primary' disabled={!formValues.password || !formValues.token} onClick={handleSaveClick} htmlType='button'>Сохранить</Button>
                {resetPasswordSuccess && (
                    <p className={`text text_type_main-default pt-2`}>Пароль успешно восстановлен</p>
                )}

                <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>


            </form>

        </div>
    )
}