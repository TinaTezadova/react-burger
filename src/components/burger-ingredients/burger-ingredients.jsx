import React, { useState, useRef, useEffect } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsBlock from '../ingredients-block/ingredients-block';
import { ingredienstCategories } from '../../utils/ingredienst-categories';
import styles from './burger-ingredients.module.css';
import { useSelector} from 'react-redux';

const BurgerIngredients = () => {
    const ingredientsData = useSelector(state => state.constructor.ingredientsData);
    const [activeTab, setActiveTab] = useState('bun');
    const breadRef = useRef(null);
    const saucesRef = useRef(null);
    const toppingsRef = useRef(null);
    const listItemsBlockRef = useRef(null)

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
        if(name === 'bun') {
            scrollCategoriesBlock(breadRef.current)
        }
        else if(name === 'sauce') {
            scrollCategoriesBlock(saucesRef.current)
        }
        else {
            scrollCategoriesBlock(toppingsRef.current)
        }

    }

      useEffect(() => {
          const block = listItemsBlockRef.current
          block.addEventListener('scroll', () => {
            let scrollDistance = block.scrollTop;
            const allSections = [breadRef.current, saucesRef.current, toppingsRef.current];
            allSections.forEach((el, i) => {
                if((el.offsetTop - block.offsetTop) <= scrollDistance) {
                    setActiveTab(allSections[i].id)
                }
            })
        })
          
      }, [])

    return (
        <section className={styles.block}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>


            <div className={styles.tabs}>
                <Tab value="bun" active={activeTab === 'bun'} onClick={handleTabClick}>Булки</Tab>
                <Tab value="sauce" active={activeTab === 'sauce'} onClick={handleTabClick}>Соусы</Tab>
                <Tab value="main" active={activeTab === 'main'} onClick={handleTabClick}>Начинки</Tab>
            </div>

            <ul className={`custom-scroll ${styles.list_items}`} ref={listItemsBlockRef}>

                {ingredienstCategories.map(item => <IngridientsBlock key={item.name} category={item} ingredientsData={ingredientsData} elRef={setRef(item.name)}/>)}

            </ul>
        </section>
    )
}

export default BurgerIngredients;