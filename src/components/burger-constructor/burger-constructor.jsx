import React, { useState, useEffect } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import {
    getIngredientsForConstructor,
    getOrderDetail,
    removeIngredientCount,
    removeIngredientsForConstructor,
    removeOrderPrice, sortConstructorIngredients
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
        dispatch(getIngredientsForConstructor())

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
        dispatch(removeIngredientCount(ingredientId));

        dispatch(removeIngredientsForConstructor(ingredientId));

        dispatch(removeOrderPrice(price))
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
                {bun.name && (
                    <ConstructorElement type='top' text={`${bun?.name} (верх)`}
                        price={bun?.price}
                        isLocked={true}
                        thumbnail={bun?.image} />
                )}

                {ingredienList.length > 0 && (
                    <ul className={`custom-scroll ${styles.list_items}`} ref={drop}>
                        {
                            ingredienList.map((item, index) => (item.type === 'sauce' || item.type === 'main') && (
                                <ConstructorItem item={item} handleDeleteIngredient={handleDeleteIngredient} findItem={findItem} sortIngredients={sortIngredients} key={item.uuid} />
                            ))
                        }

                    </ul>

                )}

                {bun.name && (
                    <ConstructorElement type='bottom' text={`${bun?.name} (низ)`}
                        price={bun?.price}
                        isLocked={true}
                        thumbnail={bun?.image} />
                )}
                {(!ingredienList.length && !bun.name) && (
                    <p className={`text text_type_main-default mt-2`}>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</p>
                )
                }


            </div>

            <div className={`${styles.order} mr-8 mt-10`}>
                <div className={`${styles.order_price} mr-10`}>
                    <p className='text text_type_digits-medium mr-2'>{orderPrice}</p>
                    <CurrencyIcon />
                </div>

                <Button size='large' type='primary' onClick={handleOrderClick} disabled={!bun.name}>Оформить заказ</Button>
                {orderDatailIsOpen && <OrderDetails handleCloseModal={handleCloseModal} />}


            </div>

        </section>

    )
}

export default BurgerConstructor;