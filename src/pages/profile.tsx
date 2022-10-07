import React, { useEffect, useMemo } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { logout, getUser, updateUser, updateToken } from '../services/actions/auth';
import useForm from '../hooks/use-form';
import { UserOrdersInfo } from '../components/user-orders-info/user-orders-info';
import { useDispatch, useSelector } from '../hooks/react-redux';
import styles from './profile.module.css';

export const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<{pathname: string}>();
    const isLoading = useSelector((state) => state.auth.getUserRequest);
    const isError = useSelector((state) => state.auth.getUserFailed);
    const user = useSelector((state) => state.auth.userData);
    const getUserFailed = useSelector((state) => state.auth.getUserFailed);
    const updateTokenSuccess = useSelector((state) => state.auth.updateTokenSuccess);
    const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });

    const handleLogOutClick = async (): Promise<any> => {
        await dispatch(logout());
        history.replace({ pathname: '/login' });
    };

    useEffect((): void => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect((): void => {
        if(getUserFailed) {
            dispatch(updateToken())
        }

    }, [dispatch, getUserFailed])
    
    useEffect((): void => {
        if(updateTokenSuccess) {
            dispatch(getUser());
        }
    }, [dispatch, updateTokenSuccess])

    useEffect((): void => {
        if (user.name) {
            setValues({ name: user.name, email: user.email, password: '' })
        }
    }, [setValues, user]);


    const handleCancleClick = (): void => {
        setValues({ ...user, password: '' })
    };

    const onProfileInfoSave = (event: React.FormEvent): void => {
        event.preventDefault();
        dispatch(updateUser(values));
    };

    const captionText = useMemo((): string => {
        if(location.pathname === '/profile') {
            return 'В этом разделе вы можете изменить свои персональные данные'
        }
        else {
            return 'В этом разделе вы можете посмотреть историю заказов'
        }

    },[location])


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
                                <p className="text text_type_main-default text_color_inactive">{captionText}</p>

                            </div>
                        </div>

                        <Switch>
                            <Route path='/profile' exact={true}>
                                <form className={styles.form} onSubmit={onProfileInfoSave}>
                                    <div className={`${styles.inputWrapper} mb-6`}>
                                        <Input type='text' placeholder='Имя' value={values.name} onChange={handleChange} name='name' icon='EditIcon' />
                                    </div>

                                    <div className={`${styles.inputWrapper} mb-6`}>
                                        <Input type='email' placeholder='Логин' value={values.email} onChange={handleChange} name='email' icon='EditIcon' />
                                    </div>

                                    <div className={`${styles.inputWrapper} mb-6`}>
                                        <Input type='password' placeholder='Пароль' value={values.password} onChange={handleChange} name='password' icon='EditIcon' />
                                    </div>

                                    <div className={styles.buttons_wrapper}>
                                        <Button type='secondary' onClick={handleCancleClick} htmlType='button'>Отмена</Button>
                                        <Button type="primary" size="medium" htmlType='submit'>Сохранить</Button>
                                    </div>

                                </form>

                            </Route>

                            <Route path='/profile/orders' exact={true}>
                               <UserOrdersInfo />
                            </Route>
                        </Switch>


                    </div>
                </div>
            )}

        </>

    )

}