import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderCardDetail } from '../components/order-card-detail/order-card-detail';
import { openWsConnection, closeWsConnection } from '../services/actions/web-socket';
import styles from './order-detail.module.css';

export const OrderDetailPage = () => {
    const dispatch = useDispatch();
    const { errorInfo, ordersData } = useSelector((store) => store.orders);
    useEffect(() => {
        dispatch(openWsConnection('/all'))
        return () => dispatch(closeWsConnection())

    }, []);

    if (errorInfo) {
        return <p className={`text text_type_main-default mt-2`}>Произошла ошибка</p>
    } else if (!ordersData) {
        return <p className={`text text_type_main-default mt-2`}>Идет загрузка данных</p>;
    }

    return (
        <div className={styles.wrapper}>
            <OrderCardDetail />
        </div>
    )
}