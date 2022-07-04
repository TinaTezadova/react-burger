import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/burger-api'
import styles from './app.module.css'

const App = () => {

    const [state, setState] = useState({
        ingredientsData: [],
        isLoading: false,
        isError: false
    });

    const getIngredientsData = async () => {
        setState({ ...state, isLoading: true });
        try {
            const response = await getIngredients();
            setState({ ...state, isLoading: false, ingredientsData: response.data });
        }
        catch {
            setState({ ...state, isLoading: false, isError: true });
        }

    };

    useEffect(() => {
        getIngredientsData()
    }, []);

    return (
        <div className={`${styles.pageContainer} pb-10`}>
            <AppHeader />
            <main className={styles.mainContent}>
                {state.isLoading && <p>Идет загрузка данных</p>}
                {state.isError && <p>Ошибка!</p>}
                {
                    state.ingredientsData.length && (
                        <>
                            <BurgerIngredients ingredientsData={state.ingredientsData}/>
                            <BurgerConstructor ingredientsData={state.ingredientsData}/>
                        </>
                    )
                }

            </main>

        </div>
    )
}

export default App