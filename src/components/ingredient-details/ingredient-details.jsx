import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NutritionValue from '../nutrition-value/nutrition-value';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
    const ingredientsData = useSelector(state => state.constructor.ingredientsData) || [];
    const { id } = useParams();
    const ingredient = ingredientsData.filter((item) => item._id === id)[0]

    return (
        <>
            <h1 className={`text text_type_main-large ${styles.tittle} pr-10 pt-10 pl-10`}>Детали ингридиента</h1>
            <div className={`${styles.wrapper} pb-15 pt-10 pl-10 pr-10`}>
                <img src={ingredient.image_large} alt={ingredient.name} />

                <h2 className={`${styles.name} text text_type_main-medium mb-8 mt-4`}>{ingredient.name}</h2>
                <ul className={`${styles.infoBlock} text_color_inactive text_type_main-default`}>
                    <NutritionValue title='Калории, ккал' value={ingredient.calories} />
                    <NutritionValue title='Белки, г' value={ingredient.proteins} />
                    <NutritionValue title='Жиры, г' value={ingredient.fat} />
                    <NutritionValue title='Углеводы' value={ingredient.carbohydrates} />
                </ul>

            </div>
        </>
    )
}

export default IngredientDetails;