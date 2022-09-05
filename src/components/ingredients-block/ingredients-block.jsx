import React, { useMemo } from "react";
import Ingredient from '../ingredient/ingredient'
import styles from './ingredients-block.module.css';
import PropTypes from 'prop-types';
import { ingredientItem } from '../../utils/ingredient-item';

const IngredientsBlock = ({ category, ingredientsData, elRef }) => {
    const ingredients = useMemo(() => {
        return ingredientsData.filter((item) => item.type === category.name)

    }, [category.name, ingredientsData]);

    return (
        <li ref={elRef} id={category.name}>
            <p className='text text_type_main-medium mt-10 mb-6'>{category.description}</p>

            <ul className={styles.list_items}>
                {ingredients.map((item) => <Ingredient ingredient={item} key={item._id} />)}
            </ul>

        </li>
    )
}

IngredientsBlock.propTypes = {
    category: PropTypes.object.isRequired,
    ingredientsData: PropTypes.arrayOf(PropTypes.shape(ingredientItem)).isRequired,
    elRef: PropTypes.any
}

export default IngredientsBlock;