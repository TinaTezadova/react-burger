import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openWsConnection, closeWsConnection } from '../../services/actions/web-socket';
import getIngredientById from '../../utils/get-ingredient-by-id';
import { OrderCard } from '../order-card/order-card';
import styles from './user-orders-info.module.css'
import { getCookie } from '../../utils/cookie';

export const UserOrdersInfo = () => {
    const dispatch = useDispatch();
    const ingredientsData = useSelector(state => state.constructor.ingredientsData);
    const { errorInfo, ordersData } = useSelector((store) => store.orders);
    const orders = useMemo(() => {
        return ordersData?.orders?.map((order) => {
            const ingredientsInfoFull = getIngredientById(order.ingredients, ingredientsData);
            return {
                ...order,
                ingredients: ingredientsInfoFull
            }
        })

    }, [ingredientsData, ordersData]);

    useEffect(() => {
        dispatch(openWsConnection(`?token=${getCookie('accessToken')}`))
        return () => dispatch(closeWsConnection())

    }, [])

    if (errorInfo) {
        return <p className={`text text_type_main-default mt-2`}>Произошла ошибка</p>
    } else if (!ordersData || !orders) {
        return <p className={`text text_type_main-default mt-2`}>Идет загрузка данных</p>;
    }else if(!orders.length) {
        return <p className={`text text_type_main-default mt-2`}>Вы еще не сделали ни одного заказа</p>
        
    }

    return (
        <div className={styles.ordersBlock}>
            <ul className={`${styles.list} custom-scroll`}>
                {orders?.map((order) => {
                    return (
                        <li key={order._id}>
                            <OrderCard orderData={order} showStatus/>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}