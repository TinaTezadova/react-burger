import React, { useState, useEffect } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import {
    GET_INGREDIENTS_FOR_CONSTRUCTOR,
    getOrderDetail,
    REMOVE_INGREDIENT_COUNT,
    REMOVE_INGREDIENTS_FOR_CONSTRUCTOR,
    REMOVE_ORDER_PRICE, sortConstructorIngredients
} from '../../services/actions/constructor'
import { ConstructorItem } from '../constructor-item/constructor-item'
const BurgerConstructor = ({ onDropHandler }) => {
    const dispatch = useDispatch();
    const ingredienList = useSelector(state => state.constructor.constructorIngredients) || [];
    const bun = useSelector(state => state.constructor.bun);
    const orderPrice = useSelector(state => state.constructor.orderPrice);


    const [orderDatailIsOpen, setOrderDatailIsOpen] = useState(false);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
    });

    const [, drop] = useDrop(() => ({ accept: 'constructor' }))

    useEffect(() => {
        dispatch({
            type: GET_INGREDIENTS_FOR_CONSTRUCTOR
        })

    }, []);



    const handleOrderClick = () => {
        const ingredientsId = { ingredients: [...ingredienList.map((item) => item._id), bun, bun] }
        dispatch(getOrderDetail(ingredientsId))
        setOrderDatailIsOpen(true)

    }

    const handleCloseModal = (event) => {
        event.stopPropagation();
        setOrderDatailIsOpen(false)
    }

    const handleDeleteIngredient = (ingredientId, price) => {
        dispatch({
            type: REMOVE_INGREDIENT_COUNT,
            payload: ingredientId
        });

        dispatch({
            type: REMOVE_INGREDIENTS_FOR_CONSTRUCTOR,
            payload: ingredientId
        });

        dispatch({
            type: REMOVE_ORDER_PRICE,
            payload: price
        })
    }

    const findItem = (id) => {
        const el = ingredienList.filter((item) => item._id === id)[0]
        return {
            el,
            currentIndex: ingredienList.indexOf(el),
        }
    }

    const sortIngredients = (id, atIndex) => {
        const { el, currentIndex } = findItem(id);
        dispatch(sortConstructorIngredients(ingredienList, currentIndex, atIndex, el))
    }


    return (
        <section className={`${styles.block} mt-20 ml-10`} ref={dropTarget}>
            <div className={styles.container}>
                <ConstructorElement type='top' text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    isLocked={true}
                    thumbnail={bun?.image} />

                <ul className={`custom-scroll ${styles.list_items}`} ref={drop}>
                    {
                        ingredienList.map((item, index) => (item.type === 'sauce' || item.type === 'main') && (
                            <ConstructorItem item={item} handleDeleteIngredient={handleDeleteIngredient} findItem={findItem} sortIngredients={sortIngredients} />
                        ))
                    }

                </ul>

                <ConstructorElement type='bottom' text={`${bun?.name} (низ)`}
                    price={bun?.price}
                    isLocked={true}
                    thumbnail={bun?.image} />

            </div>

            <div className={`${styles.order} mr-8 mt-10`}>
                <div className={`${styles.order_price} mr-10`}>
                    <p className='text text_type_digits-medium mr-2'>{orderPrice}</p>
                    <CurrencyIcon />
                </div>

                <Button size='large' type='primary' onClick={handleOrderClick}>Оформить заказ</Button>
                {orderDatailIsOpen && <OrderDetails handleCloseModal={handleCloseModal} />}


            </div>

        </section>

    )
}

export default BurgerConstructor;