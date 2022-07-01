import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from '../../utils/data';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {

    return (
        <section className={`${styles.block} mt-20 ml-10`}>
            <div className={styles.container}>
                <ConstructorElement type='top' text='Краторная булка N-200i (верх)'
                    price={200}
                    isLocked={true}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />

                <ul className={`custom-scroll ${styles.list_items}`}>
                    {
                        data.map((item) => (item.type === 'sauce' || item.type === 'main') && (
                            <li key={item._id} className={`${styles.item} pr-5 mt-4`}>
                                <DragIcon />
                                <ConstructorElement price={item.price} text={item.name} thumbnail={item.image} />

                            </li>
                        ))
                    }

                </ul>

                <ConstructorElement type='bottom' text='Краторная булка N-200i (низ)'
                    price={200}
                    isLocked={true}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />

            </div>

            <div className={`${styles.order} mr-8 mt-10`}>
                <div className={`${styles.order_price} mr-10`}>
                    <p className='text text_type_digits-medium mr-2'>610</p>
                    <CurrencyIcon />
                </div>

                <Button size='large' type='primary'>Оформить заказ</Button>

            </div>

        </section>

    )
}
export default BurgerConstructor;