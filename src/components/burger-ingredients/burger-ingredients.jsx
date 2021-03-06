import React, { useState } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsBlock from '../ingredients-block/ingredients-block';
import { ingredienstCategories } from '../../utils/ingredienst-categories';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { ingredientItem } from '../../utils/ingredient-item';

const BurgerIngredients = ({ ingredientsData }) => {
    const [activeTab, setActiveTab] = useState('bread');

    return (
        <section className={styles.block}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>


            <div className={styles.tabs}>
                <Tab value="bread" active={activeTab === 'bread'} onClick={setActiveTab}>Булки</Tab>
                <Tab value="sauces" active={activeTab === 'sauces'} onClick={setActiveTab}>Соусы</Tab>
                <Tab value="toppings" active={activeTab === 'toppings'} onClick={setActiveTab}>Начинки</Tab>
            </div>

            <ul className={`custom-scroll ${styles.list_items}`}>

                {ingredienstCategories.map(item => <IngridientsBlock key={item.name} category={item} ingredientsData={ingredientsData} />)}

            </ul>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredientsData: PropTypes.arrayOf(PropTypes.shape(ingredientItem)).isRequired
}

export default BurgerIngredients;