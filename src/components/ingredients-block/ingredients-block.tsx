import React, { useMemo } from "react";
import Ingredient from '../ingredient/ingredient'
import styles from './ingredients-block.module.css';
import { ICategory, IIngredientItem } from '../../types/type';

interface IProps {
    category: ICategory,
    ingredientsData: Array<IIngredientItem>,
    elRef: React.RefObject<HTMLLIElement>
}

const IngredientsBlock: React.FC<IProps> = ({ category, ingredientsData, elRef }) => {
    const ingredients = useMemo((): Array<IIngredientItem> => {
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

export default IngredientsBlock;