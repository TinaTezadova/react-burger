import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { setIngredientsForConstructor, addIngredientCount, changeBun, addOrderPrice } from '../services/actions/constructor';
import { useDispatch, useSelector } from '../hooks/react-redux';
import { IIngredientItem } from '../types/type';

export const MainPage: React.FC = () => {
    const dispatch = useDispatch();
    const ingredientsData = useSelector(state => state.constructor.ingredientsData);

    const handleDrop = (item: IIngredientItem): void => {
        const isBun = item.type === 'bun';
        dispatch(addIngredientCount(item._id))
        if (isBun) {
            dispatch(changeBun(item._id))
        }
        else {
            dispatch(setIngredientsForConstructor(item._id))
            dispatch(addOrderPrice(item.price))
        }

    }

    return (
        <>
            {
                ingredientsData && (
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor onDropHandler={handleDrop} />
                    </DndProvider>
                )
            }
        </>
    )
}