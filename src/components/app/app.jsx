import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsData, setIngredientsForConstructor, addIngredientCount, changeBun, addOrderPrice } from '../../services/actions/constructor'
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
        dispatch(addIngredientCount(item._id))
        if(isBun) {
            dispatch(changeBun(item._id))
        }
        else {
            dispatch(setIngredientsForConstructor(item._id))
            dispatch(addOrderPrice(item.price))
        }

        
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