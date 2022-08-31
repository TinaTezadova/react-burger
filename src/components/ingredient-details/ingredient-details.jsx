import React, { useEffect } from 'react';
import Modal from '../modal/modal';
import NutritionValue from '../nutrition-value/nutrition-value';
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientItem } from '../../utils/ingredient-item';

const IngredientDetails = ({ handleCloseModal, ingredient }) => {

    return (
        <Modal handleCloseModal={handleCloseModal}>
            <h1 className={`text text_type_main-large ${styles.tittle} pr-10 pt-10 pl-10`}>Детали ингридиента</h1>
            <div className={`${styles.wrapper} pb-15 pt-10 pl-10 pr-10`}>
                <img src={ingredient.image_large} alt={ingredient.name} />

                <h2 className={`${styles.name} text text_type_main-medium mb-8 mt-4`}>{ingredient.name}</h2>
                <ul className={`${styles.infoBlock} text_color_inactive text_type_main-default`}>
                    <NutritionValue title='Калории, ккал' value={ingredient.calories}/>
                    <NutritionValue title='Белки, г' value={ingredient.proteins}/>
                    <NutritionValue title='Жиры, г' value={ingredient.fat}/>
                    <NutritionValue title='Углеводы' value={ingredient.carbohydrates}/>
                </ul>

            </div>
            </Modal>
    )
}

IngredientDetails.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    ingredient: PropTypes.shape(ingredientItem).isRequired
}

export default IngredientDetails;