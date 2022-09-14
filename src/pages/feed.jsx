import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderCard } from '../components/order-card/order-card';
import { openWsConnection, closeWsConnection } from '../services/actions/web-socket';
import getIngredientById from '../utils/get-ingredient-by-id';
import { orderStatuses } from '../utils/consts';
import styles from './feed.module.css'
import { WS_ENDPOINT_ALL } from '../utils/web-socket';

export const Feed = () => {
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
        dispatch(openWsConnection(WS_ENDPOINT_ALL))
        return () => dispatch(closeWsConnection())

    }, []);

    const orderStatusesList = useMemo(() => {
        const done = [];
        const inProgress = [];
        ordersData?.orders?.forEach((order) => {
            if (order.status === orderStatuses.done && done.length < 20) {
                done.push(order.number)
            }
            if (order.status === orderStatuses.pending && inProgress.length < 20) {
                inProgress.push(order.number)
            }
        })
        return { done, inProgress }


    }, [ordersData]);
    
    if (errorInfo) {
        return <p className={`text text_type_main-default mt-2`}>Произошла ошибка</p>
    } else if (!ordersData && !orders) {
        return <p className={`text text_type_main-default mt-2`}>Идет загрузка данных</p>;
    }

    return (
        <>
            {!ordersData ? (<div>Идет загрузка данных</div>) : (
                <div className={styles.ordersrapper}>
                    <h1 className={'text text_type_main-large mb-5'}>Лента заказов</h1>
                    <div className={styles.mainContent}>
                        <div className={styles.ordersBlock}>
                            <ul className={`${styles.list} custom-scroll`}>
                                {orders?.map((order) => {
                                    return (
                                        <li key={order._id}>
                                            <OrderCard orderData={order} />

                                        </li>
                                    )
                                })}
                            </ul>

                        </div>

                        <div className={styles.ordersInfoBlock}>
                            <div className={styles.ordersStatusBlock}>
                                <div className={styles.statusInfoBlock}>
                                    <h2 className={`${styles.statusTitle} text text_type_main-medium`}>Готовы:</h2>
                                    <ul className={styles.statusList}>
                                        {orderStatusesList.done.map((orderNum) => (
                                            <li key={orderNum}>
                                                <p className={`${styles.statsListText} text text_type_digits-default text_color_success`}>{orderNum}</p>
                                            </li>
                                        ))}

                                    </ul>
                                </div>

                                <div className={styles.statusInfoBlock}>
                                    <h2 className={`${styles.statusTitle} text text_type_main-medium`}>В работе:</h2>
                                    <ul className={styles.statusList}>
                                        {orderStatusesList.inProgress.map((orderNum) => (
                                            <li key={orderNum}>
                                                <p className={`${styles.statsListText} text text_type_digits-default`}>{orderNum}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.ordersCountInfoBlock}>
                                <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
                                <p className={`${styles.ordersCount} text text_type_digits-large`}>{ordersData?.total?.toLocaleString('ru-RU')}</p>

                            </div>

                            <div className={styles.ordersCountInfoBlock}>
                                <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
                                <p className={`${styles.ordersCount} text text_type_digits-large`}>{ordersData?.totalToday?.toLocaleString('ru-RU')}</p>

                            </div>

                        </div>

                    </div>


                </div>
            )}

        </>
    )

}