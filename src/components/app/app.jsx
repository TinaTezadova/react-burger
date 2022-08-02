import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsData, SET_INGREDIENTS_FOR_CONSTRUCTOR, ADD_INGREDIENT_COUNT, CHANGE_BUN, ADD_ORDER_PRICE } from '../../services/actions/constructor'
import styles from './app.module.css'

const App = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.constructor.ingredientsRequest);
    const isError = useSelector(state => state.constructor.ingredientsRequestFailed);
    const ingredientsData = useSelector(state => state.constructor.ingredientsData);

    useEffect(() => {
        dispatch(getIngredientsData())
    }, []);

    const handleDrop = (item) => {
        const isBun = item.type === 'bun';
        dispatch({
            type: ADD_INGREDIENT_COUNT,
            payload: item._id
        })

        dispatch({
            type: isBun ? CHANGE_BUN : SET_INGREDIENTS_FOR_CONSTRUCTOR,
            payload: item._id
        });

        dispatch({
            type: !isBun && ADD_ORDER_PRICE,
            payload: item.price
        })

        
    }
    return (
        <div className={`${styles.pageContainer} pb-10`}>
            <AppHeader />
            <main className={styles.mainContent}>
                {isLoading  && <p>Идет загрузка данных</p>}
                {isError  && <p>Ошибка!</p>}
                {
                    ingredientsData && (
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor onDropHandler={handleDrop}/>
                        </DndProvider>
                    )
                }

            </main>

        </div>
    )
}

export default App