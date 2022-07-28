import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients, getOrder } from '../../utils/burger-api';
import { MainContext } from '../../services/MainContext';
import { BurgerContext } from '../../services/BurgerContext';
import styles from './app.module.css'

const App = () => {

    const [state, setState] = useState({
        ingredientsData: [],
        isLoading: false,
        isError: false
    });

    const [orderData, setOrderData] = useState({
        name: '',
        orderNum: 0,
        success: false,
        isLoading: false,
        isError: false 
    })

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

    const getOrderDetails = async (ingredientsId) => {
        setOrderData({...orderData, isLoading: true})

        try {
            const response = await getOrder(ingredientsId);
            setOrderData({
                ...orderData,
                orderNum: response.order.number,
                success: response.success,
                name: response.name,
                isLoading: false,
                isError: false
            })

        }
        catch(e) {
            setOrderData({...orderData, isLoading: false, isError: true})
            console.log(e)
        }

    }

    useEffect(() => {
        getIngredientsData()
    }, []);

    return (
        <div className={`${styles.pageContainer} pb-10`}>
            <AppHeader />
            <main className={styles.mainContent}>
                {(state.isLoading || orderData.isLoading) && <p>Идет загрузка данных</p>}
                {(state.isError || orderData.isError) && <p>Ошибка!</p>}
                {
                    state.ingredientsData.length && (
                        <MainContext.Provider value={state.ingredientsData}>
                            <BurgerIngredients />
                            <BurgerContext.Provider value={{getOrderDetails, orderData}}>
                            <BurgerConstructor />
                            </BurgerContext.Provider>
                        </MainContext.Provider>
                    )
                }

            </main>

        </div>
    )
}

export default App