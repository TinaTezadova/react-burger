import React from 'react';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './order-ingredient-info.module.css'

export const OrderIngredientInfo = ({ ingredient }) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <IngredientIcon imageUrl={ingredient.image} />
                <p className={'text text_type_main-default'}>{ingredient.name}</p>
            </div>

            <div className={styles.priceInfoBlock}>
                <p className={'text text_type_digits-default'}>{`${ingredient.count} x ${ingredient.price.toLocaleString('ru-RU')}`}</p>
                <CurrencyIcon type='primary' />
            </div>
        </div>

    )
}

OrderIngredientInfo.propTypes = {
    ingredient: PropTypes.object.isRequired
}