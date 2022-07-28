import React, { useState, useContext, useMemo, useReducer, useEffect } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import { MainContext } from '../../services/MainContext';
import { BurgerContext } from '../../services/BurgerContext';

const BurgerConstructor = () => {
    const ingredientsData = useContext(MainContext);
    const {getOrderDetails, orderData} = useContext(BurgerContext);
    const [orderDatailIsOpen, setOrderDatailIsOpen] = useState(false);
    const initialState = { orderPrice: 0 };

    const reducer = (state, action) => {
        switch (action.type) {
          case "addIngridient":
            return { orderPrice: state.orderPrice + action.price};
          case "removeIngridient":
            return { orderPrice: state.orderPrice - action.price };
          default:
            return initialState
        }
      }

    const [state, dispatch] = useReducer(reducer, initialState);

    const bun = useMemo(() => {
        const buns = ingredientsData.filter((item) => item.type === "bun");
        return buns[0]

    }, [ingredientsData])

    const ingredienList = useMemo(() => {
        if(ingredientsData.length) {
            const filtredIngredients = ingredientsData.filter((item) => item.type !== 'bun');
            filtredIngredients.forEach(element => {
                dispatch({
                    type: 'addIngridient',
                    price: element.price
                })
            });
    
            dispatch({
                type: 'addIngridient',
                price: bun.price * 2
            });
    
            return filtredIngredients;
        }
        else{
            return []
        }
        

    }, []);


    const handleOrderClick = () => {
        const ingredientsId = {ingredients: ingredienList.map((item) => item._id)}
        getOrderDetails(ingredientsId)
        setOrderDatailIsOpen(true)

    }

    const handleCloseModal = (event) => {
        event.stopPropagation();
        setOrderDatailIsOpen(false)
    }

    return (
        <section className={`${styles.block} mt-20 ml-10`}>
            <div className={styles.container}>
                <ConstructorElement type='top' text={`${bun.name} (верх)`}
                    price={bun.price}
                    isLocked={true}
                    thumbnail={bun.image} />

                <ul className={`custom-scroll ${styles.list_items}`}>
                    {
                        ingredienList.map((item) => (item.type === 'sauce' || item.type === 'main') && (
                            <li key={item._id} className={`${styles.item} pr-5 mt-4`}>
                                <DragIcon />
                                <ConstructorElement price={item.price} text={item.name} thumbnail={item.image} />

                            </li>
                        ))
                    }

                </ul>

                <ConstructorElement type='bottom' text={`${bun.name} (низ)`}
                    price={bun.price}
                    isLocked={true}
                    thumbnail={bun.image} />

            </div>

            <div className={`${styles.order} mr-8 mt-10`}>
                <div className={`${styles.order_price} mr-10`}>
                    <p className='text text_type_digits-medium mr-2'>{state.orderPrice}</p>
                    <CurrencyIcon />
                </div>

                <Button size='large' type='primary' onClick={handleOrderClick}>Оформить заказ</Button>
                {orderDatailIsOpen && <OrderDetails handleCloseModal={handleCloseModal} orderNum={orderData.orderNum}/>}


            </div>

        </section>

    )
}

export default BurgerConstructor;