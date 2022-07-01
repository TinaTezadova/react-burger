import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {

    return (
        <header className={`${styles.header} m-10`}>
            <nav className={`${styles.navigation} pt-4 pb-4`}>
                <ul className={styles.list_items}>
                    <li className={styles.item}>
                        <a href="" className={styles.link}>
                            <BurgerIcon type='primary'/>
                            <p className='text text_type_main-default pl-2'>Конструктор</p>
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a href="" className={styles.link}>
                            <ListIcon type='secondary'/>
                            <p className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</p>
                        </a>
                    </li>

                    <li className={styles.item}>
                        <Logo />

                    </li>
                    <li className={`${styles.item} pr-5`}>
                        <a href="" className={styles.link}>
                            <ProfileIcon type='secondary' />
                            <p className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;