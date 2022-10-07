import React from 'react';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientItemWithQuantity } from '../../types/type';
import styles from './order-ingredient-info.module.css';

interface IProps {
    ingredient: IIngredientItemWithQuantity
}

export const OrderIngredientInfo: React.FC<IProps> = ({ ingredient }) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <IngredientIcon imageUrl={ingredient.image} />
                <p className={'text text_type_main-default'}>{ingredient.name}</p>
            </div>

            <div className={styles.priceInfoBlock}>
                <p className={'text text_type_digits-default'}>{`${ingredient?.quantity} x ${ingredient.price.toLocaleString('ru-RU')}`}</p>
                <CurrencyIcon type='primary' />
            </div>
        </div>

    )
}