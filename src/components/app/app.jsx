import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BASE_API } from './const';
import styles from './app.module.css'

const App = () => {

    const [state, setState] = useState({
        ingredientsData: [],
        isLoading: false,
        isError: false
    });

    const checkResponse = (response) => {
        return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
    };

    const getIngredientsData = async () => {
        setState({ ...state, isLoading: true });
        try {
            const response = await fetch(BASE_API).then(checkResponse);
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
                    state.ingredientsData.length > 0 && (
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