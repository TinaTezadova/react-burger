import React, { useEffect, useState } from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { SET_INGREDIENT_DETAIL, RESET_INGREDIENT_DETAIL } from '../../services/actions/constructor'

const Ingredient = ({ ingredient }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();

    const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    useEffect(() => {
        if(modalIsOpen) {
            dispatch({
                type: SET_INGREDIENT_DETAIL,
                payload: ingredient
            })
        }
        else {
            dispatch({
                type: RESET_INGREDIENT_DETAIL,
            })
        }
        
    }, [dispatch, ingredient, modalIsOpen])

    const handleIngredientClick = () => {
        setModalIsOpen(true)
    }

    const handleCloseModal = (event) => {
        event.stopPropagation();
        setModalIsOpen(false)
    }

    return (!isDrag &&
        <li className={`mb-8 ${styles.ingredient}`} onClick={handleIngredientClick} ref={dragRef}>
            <img src={ingredient.image} alt={ingredient.name} />

            <div className={`mt-2 ${styles.price}`}>
                <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
                <CurrencyIcon type='primary' />
            </div>

            <p className={`text text_type_main-default mt-2 ${styles.name}`}>{ingredient.name}</p>
            {ingredient.count > 0 && <Counter count={ingredient.count} size="default" />}
            
            {modalIsOpen && <IngredientDetails handleCloseModal={handleCloseModal} ingredient={ingredient}/>}

        </li>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.object.isRequired
}

export default Ingredient;