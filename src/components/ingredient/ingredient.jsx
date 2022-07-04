import React, { useState } from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';

const Ingredient = ({ ingredient }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleIngredientClick = () => {
        setModalIsOpen(true)
    }

    const handleCloseModal = () => {
        setModalIsOpen(false)
    }

    return (
        <li className={`mb-8 ${styles.ingredient}`} onClick={handleIngredientClick}>
            <img src={ingredient.image} alt={ingredient.name} />

            <div className={`mt-2 ${styles.price}`}>
                <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
                <CurrencyIcon type='primary' />
            </div>

            <p className={`text text_type_main-default mt-2 ${styles.name}`}>{ingredient.name}</p>
            <Counter count={1} size="default" />

            {modalIsOpen && <IngredientDetails handleCloseModal={handleCloseModal} ingredient={ingredient}/>}

        </li>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.object.isRequired
}

export default Ingredient;