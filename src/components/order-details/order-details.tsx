import React from 'react';
import { useSelector } from '../../hooks/react-redux';
import Modal from '../modal/modal';
import styles from './order-details.module.css';
import successIcon from '../../images/success-icon.svg';

interface IProps {
    handleCloseModal(event: KeyboardEvent | React.MouseEvent):void
}

const OrderDetails: React.FC<IProps> = ({ handleCloseModal }) => {
    const orderNum: number = useSelector(state => state.constructor.order?.number);
    const isLoading = useSelector(state => state.constructor.orderRequest);
    const isError = useSelector(state => state.constructor.orderRequestFailed);

    return (
        <Modal handleCloseModal={handleCloseModal}>
            <section className={`${styles.wrapper} pb-30 pt-30`}>
                {isLoading && <p className={'mt-30 mb-30'}>Идет загрузка данных</p>}
                {isError && <p className={'mt-30 mb-30'}>Ошибка!</p>}
                {(!isLoading && !isError) && (
                    <>
                        <p className='text text_type_digits-large mb-8'>{orderNum}</p>
                        <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                        <img className={`${styles.img} mb-15`} src={successIcon} alt='Заказ успешно принят' />
                        <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
                        <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
                    </>
                )}

            </section>

        </Modal>
    )
}

export default OrderDetails;