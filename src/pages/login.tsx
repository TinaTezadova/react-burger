import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { signIn } from '../services/actions/auth';
import useForm from '../hooks/use-form';
import styles from './login.module.css'

export const LoginPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(state => state.auth.user);
    const { values, handleChange } = useForm({
        email: '',
        password: ''
    });


    const submitForm = (event) => {
        event.preventDefault();
        dispatch(signIn(values));
    }

    if (user) {
        return (
            <Redirect to={location?.state?.from || '/'} />
        );
    }

    return (
        <div className={styles.container}>
            <Logo />
            <form className={styles.form} onSubmit={submitForm}>
                <h1 className='text text_type_main-medium mb-6'>Вход</h1>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <Input type='email' placeholder='E-mail' value={values.email} onChange={handleChange} icon={'EditIcon'} name='email' />
                </div>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <PasswordInput value={values.password} onChange={handleChange} name='password' />
                </div>

                <Button size='medium' type='primary' disabled={!values.email || !values.password}>Войти</Button>

                <p className="text text_type_main-default text_color_inactive mt-20 mb-4">Вы - новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить</Link>
                </p>


            </form>

        </div>
    )
}