import React, { useEffect } from 'react';
import { OrderCardDetail } from '../components/order-card-detail/order-card-detail';
import { openWsConnection, closeWsConnection } from '../services/actions/web-socket';
import { WS_ENDPOINT_ALL } from '../utils/web-socket';
import styles from './order-detail.module.css';
import { getCookie } from '../utils/cookie';
import { useDispatch, useSelector } from '../hooks/react-redux';

interface IProps {
    wsConnectionEndpoint: string
}

export const OrderDetailPage: React.FC<IProps> = ({ wsConnectionEndpoint }) => {
    const dispatch = useDispatch();
    const { errorInfo, ordersData } = useSelector((store) => store.orders);
    useEffect((): ()=> void => {
        dispatch(openWsConnection(wsConnectionEndpoint === WS_ENDPOINT_ALL ? '/all' : `?token=${getCookie('accessToken')}`))
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