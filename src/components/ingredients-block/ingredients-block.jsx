import React from "react";
import { data } from "../../utils/data";
import Ingredient from '../ingredient/ingredient'
import styles from './ingredients-block.module.css';
import PropTypes from 'prop-types';

const IngredientsBlock = ({ category }) => {
    const ingredients = data.filter((item) => item.type === category.name);


    return (
        <li>
            <p className='text text_type_main-medium mt-10 mb-6'>{category.description}</p>

            <ul className={styles.list_items}>
                {ingredients.map((item) => <Ingredient ingredient={item} key={item._id} />)}
            </ul>

        </li>
    )
}

IngredientsBlock.propTypes = {
    category: PropTypes.object.isRequired
}

export default IngredientsBlock;