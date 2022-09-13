import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OrderIngredientInfo } from '../order-ingredient-info/order-ingredient-info';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import getIngredientById from '../../utils/get-ingredient-by-id';
import styles from './order-card-detail.module.css';
import { useOrderInfo } from '../../hooks/use-order-info';
import { orderStatuses } from '../../utils/consts';

export const OrderCardDetail = () => {
    const { id } = useParams();
    const { ordersData } = useSelector((store) => store.orders);
    const ingredientsData = useSelector(state => state.constructor.ingredientsData);
    const order = useMemo(() => {
        return ordersData?.orders?.find((order) => order._id === id)

    }, [id, ordersData]);
    const orderData = useMemo(() => {
        if(order) {
            const ingredientsInfoFull = getIngredientById(order.ingredients, ingredientsData);
            return {
                ...order,
                ingredients: ingredientsInfoFull
            }
        }

    }, [ingredientsData, order]);
    const { statusText, orderDate, totalAmout } = useOrderInfo(orderData.status, orderData.createdAt, orderData.ingredients)

    if (!orderData) {
        return <div>Идет загрузка данных</div>
    }

    return (
        <div style={{padding: '40px'}}>
        <div className={styles.wrapper}>
            <p className={`text text_type_digits-default ${styles.number}`}>#{orderData.number}</p>
            <h1 className={'text text_type_main-medium mt-10 mb-3'}>{orderData.name}</h1>
            <p className={`text text_type_main-default mb-15 ${orderData.status === orderStatuses.done ? 'text_color_success' : null}`}>{statusText}</p>
            <h2 className={'text text_type_main-medium mb-6'}>Состав:</h2>
            <ul className={`${styles.listBlock} pr-6 mb-10 custom-scroll`}>
                {orderData.ingredients.map((item, index) => {
                    return (
                        <li key={item._id + index}>
                            <OrderIngredientInfo ingredient={item} />
                        </li>
                    );
                })}
            </ul>
            <div className={styles.priceAndDateInfoBlock}>
                <p className={'text text_type_main-default text_color_inactive'}>{orderDate}</p>
                <div className={styles.priceInfo}>
                    <p className={'text text_type_digits-default mr-2'}>{totalAmout.toLocaleString('ru-RU')}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>

        </div>
        </div>
    )
}