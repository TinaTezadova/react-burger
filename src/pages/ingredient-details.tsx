import React from 'react';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useSelector } from '../hooks/react-redux';
import styles from './ingredient-details.module.css'

export const IngredientDetailsPage: React.FC = () => {
    const ingredientsData = useSelector(state => state.constructor.ingredientsData) || [];

    return (
        <div className={styles.wrapper}>
            {ingredientsData.length > 0 && (
                <IngredientDetails />
            )}
        </div>

    )

}