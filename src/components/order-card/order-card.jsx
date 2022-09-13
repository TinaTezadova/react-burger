import React, { useCallback } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientIcon } from '../../components/ingredient-icon/ingredient-icon';
import { Link, useRouteMatch } from 'react-router-dom';
import { useOrderInfo } from '../../hooks/use-order-info';
import { orderStatuses } from '../../utils/consts';
import PropTypes from 'prop-types';
import { orderItem } from '../../utils/ingredient-item';
import styles from './order-card.module.css'

export const OrderCard = ({ orderData, showStatus = false }) => {
  const { url } = useRouteMatch();
  const { statusText, orderDate, totalAmout } = useOrderInfo(orderData.status, orderData.createdAt, orderData.ingredients)
  

  const renderIngredientIcons = useCallback(() => {
    const ingredients = orderData.ingredients.slice(0, 6).reverse();
    const moreIngredientsCount = orderData.ingredients.length - 6;

    return (
      <ul className={`${styles.iconslList}`}>
        {ingredients.map(({ _id, image }, index) => {
          return (
            <li className={styles.icon} key={_id + index}>
              <IngredientIcon imageUrl={image} count={(index === 0 && orderData.ingredients.length > 6) ? moreIngredientsCount : null} />
            </li>
          );
        })}
      </ul>
    );

  }, [orderData.ingredients]);

  return (
    <Link className={styles.link} to={(location) => ({ pathname: `${url}/${orderData._id}`, state: { background: location } })}>
      <div className={styles.wrapper}>
        <div className={`${styles.headerBlock}`}>
          <p className={'text text_type_digits-default'}>#{orderData.number}</p>
          <p className={'text text_type_main-default text_color_inactive'}>{orderDate}</p>
        </div>
        <div>
          <p className={'text text_type_main-medium'}>{orderData.name}</p>
          {showStatus && (
            <p className={`text text_type_main-default mt-2 ${orderData.status === orderStatuses.done ? 'text_color_success' : null}`}>{statusText}</p>
          )}
        </div>

        <div className={styles.footerBlock}>
          {renderIngredientIcons()}
          <div className={styles.amountBlock}>
            <p className={'text text_type_digits-default'}>{totalAmout.toLocaleString('ru-Ru')}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>

      </div>
    </Link>
  )
}

OrderCard.propTypes = {
  orderData: PropTypes.arrayOf(PropTypes.shape(orderItem)).isRequired,
  showStatus: PropTypes.bool,
}