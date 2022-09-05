import React, { useEffect, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory } from 'react-router-dom';
import { logout, getUser, updateUser } from '../services/actions/auth';
import styles from './profile.module.css'

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoading = useSelector((state) => state.auth.getUserRequest);
    const isError = useSelector((state) => state.auth.getUserFailed);
    const user = useSelector((state) => state.auth.userData);
    const [formValues, setFormValues] = useState({ name: '', email: '', password: '' });

    const handleLogOutClick = async () => {
        await dispatch(logout());
        history.replace({ pathname: '/login' });
    }

    useEffect(() => {
        dispatch(getUser());
    }, []);

    useEffect(() => {
        if (user.name) {
            setFormValues({ name: user.name, email: user.email, password: '' })
        }
    }, [user])

    const handleInputChange = ({ target }) => {
        setFormValues({ ...formValues, [target.name]: target.value })
    }

    const handleCancleClick = () => {
        setFormValues({ ...user, password: '' })
    }

    const onProfileInfoSave = (event) => {
        event.preventDefault();
        dispatch(updateUser(formValues));
    }



    return (
        <>
            {isLoading && <p>Идет загрузка данных</p>}
            {isError && <p>Ошибка!</p>}
            {!isLoading && !isError && (
                <div className={`${styles.wrapper} m-10`}>
                    <div className={styles.mainContent}>
                        <div>
                            <nav className={styles.navigation}>
                                <ul className={styles.list_items}>

                                    <li className={styles.item} >
                                        <NavLink to={'/profile'} className={`${styles.link} text text_type_main-medium text_color_inactive`} activeClassName={styles.active_link} exact={true}>Профиль</NavLink>
                                    </li>

                                    <li className={styles.item} >
                                        <NavLink to={'/profile/orders'} className={`${styles.link} text text_type_main-medium text_color_inactive`} activeClassName={styles.active_link} exact={true}>История заказов</NavLink>
                                    </li>

                                    <li className={styles.item} >
                                        <button className={`${styles.button} text text_type_main-medium text_color_inactive`} onClick={handleLogOutClick}>Выход</button>
                                    </li>

                                </ul>
                            </nav>
                            <div className={styles.caption}>
                                <p className="text text_type_main-default text_color_inactive">
                                    В этом разделе вы можете изменить свои персональные данные
                                </p>

                            </div>
                        </div>

                        <Switch>
                            <Route path='/profile' exact={true}>
                                <form className={styles.form} onSubmit={onProfileInfoSave}>
                                    <div className={`${styles.inputWrapper} mb-6`}>
                                        <Input type='text' placeholder='Имя' value={formValues.name} onChange={handleInputChange} name='name' icon='EditIcon' />
                                    </div>

                                    <div className={`${styles.inputWrapper} mb-6`}>
                                        <Input type='email' placeholder='Логин' value={formValues.email} onChange={handleInputChange} name='email' icon='EditIcon' />
                                    </div>

                                    <div className={`${styles.inputWrapper} mb-6`}>
                                        <Input type='password' placeholder='Пароль' value={formValues.password} onChange={handleInputChange} name='password' icon='EditIcon' />
                                    </div>

                                    <div className={styles.buttons_wrapper}>
                                        <Button type='secondary' onClick={handleCancleClick} htmlType='button'>Отмена</Button>
                                        <Button type="primary" size="medium" >Сохранить</Button>
                                    </div>

                                </form>

                            </Route>

                            <Route path='/profile/orders' exact={true}>
                                <div>История заказов</div>
                            </Route>
                        </Switch>


                    </div>
                </div>
            )}

        </>

    )

}