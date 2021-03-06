import React from 'react';
import Modal from '../modal/modal';
import styles from './order-details.module.css';
import successIcon from '../../images/success-icon.svg';
import PropTypes from 'prop-types';

const OrderDetails = ({ handleCloseModal }) => {
    
    return (
        <Modal handleCloseModal={handleCloseModal}>
            <section className={`${styles.wrapper} pb-30 pt-30`}>

                <p className='text text_type_digits-large mb-8'>034563</p>

                <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>

                <img className={`${styles.img} mb-15`} src={successIcon} alt='Заказ успешно принят'/>

                <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>

                <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>

            </section>
        </Modal>
    )
}

OrderDetails.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}
export default OrderDetails;