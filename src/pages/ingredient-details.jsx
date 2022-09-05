import React from 'react';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css'

export const IngredientDetailsPage = () => {
    const ingredientsData = useSelector(state => state.constructor.ingredientsData) || [];


    return (
        <div className={styles.wrapper}>
            {ingredientsData.length > 0 && (
                <IngredientDetails />
            )}
        </div>

    )

}