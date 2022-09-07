import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    const { pathname } = useLocation()

    return (
        <header className={`${styles.header} m-10`}>
            <nav className={`${styles.navigation} pt-4 pb-4`}>
                <ul className={styles.list_items}>
                    <li className={styles.item}>
                        <NavLink to='/' className={styles.link} exact={true} activeClassName={styles.link_active}>
                            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
                            <p className='text text_type_main-default pl-2'>Конструктор</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to='/lenta' className={styles.link} activeClassName={styles.link_active}>
                            <ListIcon type={pathname === '/lenta' ? 'primary' : 'secondary'} />
                            <p className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</p>
                        </NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink to='/' className={styles.link}>
                            <Logo />
                        </NavLink>

                    </li>
                    <li className={`${styles.item} pr-5`}>
                        <NavLink to='/profile' className={styles.link} activeClassName={styles.link_active}>
                            <ProfileIcon type={pathname.includes('/profile') ? 'primary' : 'secondary'} />
                            <p className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;