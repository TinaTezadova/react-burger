import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';

const Ingredient = ({ ingredient }) => {

    return (
        <li className={`mb-8 ${styles.ingredient}`}>
            <img src={ingredient.image} alt={ingredient.name} />

            <div className={`mt-2 ${styles.price}`}>
                <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
                <CurrencyIcon type='primary' />
            </div>

            <p className={`text text_type_main-default mt-2 ${styles.name}`}>{ingredient.name}</p>
            <Counter count={1} size="default" />
        </li>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.object.isRequired
}

export default Ingredient;