import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { registration } from '../services/actions/auth';
import useForm from '../hooks/use-form';
import styles from './login.module.css'
import { getCookie } from '../utils/cookie';

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const { values, handleChange } = useForm({
        email: '',
        name: '',
        password: ''
    });

    const submitForm = (event) => {
        event.preventDefault();
        dispatch(registration(values))
    }

    if (user || getCookie('accessToken')) {
        return (
            <Redirect to='/' />
        );
    }

    return (
        <div className={`${styles.container} ${styles.register__container}`}>
            <Logo />
            <form className={styles.form} onSubmit={submitForm}>
                <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <Input type='text' placeholder='Имя' value={values.name} onChange={handleChange} name='name' />
                </div>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <Input type='email' placeholder='E-mail' value={values.email} onChange={handleChange} name='email' />
                </div>
                <div className={`${styles.inputWrapper} mb-6`}>
                    <PasswordInput value={values.password} onChange={handleChange} name='password' />
                </div>

                <Button size='medium' type='primary'>Зарегистрироваться</Button>

                <p className="text text_type_main-default text_color_inactive mt-20">Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></p>


            </form>

        </div>
    )
}