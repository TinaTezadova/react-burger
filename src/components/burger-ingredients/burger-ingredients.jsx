import React, { useState, useContext, useRef } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsBlock from '../ingredients-block/ingredients-block';
import { ingredienstCategories } from '../../utils/ingredienst-categories';
import styles from './burger-ingredients.module.css';
import { MainContext } from '../../services/MainContext'

const BurgerIngredients = () => {
    const ingredientsData = useContext(MainContext);
    const [activeTab, setActiveTab] = useState('bread');
    const breadRef = useRef(null);
    const saucesRef = useRef(null);
    const toppingsRef = useRef(null);

    const setRef = (categoryName) => {
        if(categoryName === 'bun') {
            return breadRef
        }
        else if(categoryName === 'sauce') {
            return saucesRef
        }
        else {
            return toppingsRef
        }
    }

    const scrollCategoriesBlock = (element) => {
        element.scrollIntoView(true, {behavior: 'smooth'})
    }

    const handleTabClick = (name) => {
        setActiveTab(name);
        if(name === 'bread') {
            scrollCategoriesBlock(breadRef.current)
        }
        else if(name === 'sauces') {
            scrollCategoriesBlock(saucesRef.current)
        }
        else {
            scrollCategoriesBlock(toppingsRef.current)
        }

    }

    return (
        <section className={styles.block}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>


            <div className={styles.tabs}>
                <Tab value="bread" active={activeTab === 'bread'} onClick={handleTabClick}>Булки</Tab>
                <Tab value="sauces" active={activeTab === 'sauces'} onClick={handleTabClick}>Соусы</Tab>
                <Tab value="toppings" active={activeTab === 'toppings'} onClick={handleTabClick}>Начинки</Tab>
            </div>

            <ul className={`custom-scroll ${styles.list_items}`}>

                {ingredienstCategories.map(item => <IngridientsBlock key={item.name} category={item} ingredientsData={ingredientsData} elRef={setRef(item.name)}/>)}

            </ul>
        </section>
    )
}

export default BurgerIngredients;