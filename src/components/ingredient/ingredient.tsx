import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import { useDrag } from "react-dnd";
import { setIngredientDetail, resetIngredientDetail } from '../../services/actions/constructor';
import { useDispatch } from '../../hooks/react-redux';
import { IIngredientItem } from '../../types/type';

interface IProps {
    ingredient: IIngredientItem,
}

const Ingredient: React.FC<IProps> = ({ ingredient }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    useEffect(() => {

        dispatch(setIngredientDetail(ingredient))

        return () => {
            dispatch(resetIngredientDetail())
        }

    }, [dispatch, ingredient])

    const handleIngredientClick = (): void => {
        history.push({
            pathname: `/ingredients/${ingredient._id}`,
            state: { background: history.location },
        });
    }

    return (
        <>
            {!isDrag &&
                <li className={`mb-8 ${styles.ingredient}`} onClick={handleIngredientClick} ref={dragRef}>
                    <img src={ingredient.image} alt={ingredient.name} />

                    <div className={`mt-2 ${styles.price}`}>
                        <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
                        <CurrencyIcon type='primary' />
                    </div>

                    <p className={`text text_type_main-default mt-2 ${styles.name}`}>{ingredient.name}</p>
                    {ingredient.count > 0 && <Counter count={ingredient.count} size="default" />}

                </li>
            }
        </>
    )
}

export default Ingredient;