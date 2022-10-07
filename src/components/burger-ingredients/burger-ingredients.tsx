import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from '../../hooks/react-redux';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsBlock from '../ingredients-block/ingredients-block';
import { ingredienstCategories } from '../../utils/ingredienst-categories';
import styles from './burger-ingredients.module.css';

const BurgerIngredients: React.FC = () => {
    const ingredientsData = useSelector(state => state.constructor.ingredientsData);
    const [activeTab, setActiveTab] = useState<string>('bun');
    const breadRef = useRef<HTMLLIElement>(null);
    const saucesRef = useRef<HTMLLIElement>(null);
    const toppingsRef = useRef<HTMLLIElement>(null);
    const listItemsBlockRef = useRef<HTMLUListElement>(null)

    const setRef = (categoryName: string): React.RefObject<HTMLLIElement> => {
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

    const scrollCategoriesBlock = (element: HTMLLIElement): void => {
        element.scrollIntoView({behavior: 'smooth'})
    }

    const handleTabClick = (name: string): void => {
        setActiveTab(name);
        if(breadRef.current && saucesRef.current && toppingsRef.current) {
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
    }

      useEffect(() => {
          if(listItemsBlockRef.current && breadRef.current && saucesRef.current && toppingsRef.current) {
            const block = listItemsBlockRef.current;
            const breadEl = breadRef.current;
            const saucesEl = saucesRef.current;
            const toppingsEl = toppingsRef.current;
            block.addEventListener('scroll', () => {
                let scrollDistance = block.scrollTop;
                const allSections: Array<HTMLLIElement> = [breadEl, saucesEl, toppingsEl];
                allSections.forEach((el: HTMLLIElement, i: number): void => {
                    if((el.offsetTop - block.offsetTop) <= scrollDistance) {
                        setActiveTab(allSections[i].id)
                    }
                })
            })
          }
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