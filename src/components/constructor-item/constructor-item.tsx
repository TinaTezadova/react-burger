import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { IIngredientItem, IFindItemResult } from '../../types/type';
import styles from './constructor-item.module.css';

interface IProps {
  item: IIngredientItem,
  handleDeleteIngredient(id: string, price: number):void,
  findItem(id: string):IFindItemResult,
  sortIngredients(id: string, index: number): void,
}


export const ConstructorItem: React.FC<IProps> = ({item, handleDeleteIngredient, findItem, sortIngredients}) => {
  const originalIndex: number = findItem(item._id).currentIndex
  const [, drag] = useDrag(
    () => ({
      type: 'constructor',
      item: { id: item._id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          sortIngredients(droppedId, originalIndex)
        }
      },
    }),
    [item._id, originalIndex, sortIngredients],
  )

const [, drop] = useDrop({
  accept: "constructor",
  hover({id}:any) {
    if (id !== item._id) {
      const { currentIndex } = findItem(item._id)
      sortIngredients(id, currentIndex)
    }
  },
});


    return (
        <li key={item.uuid} className={`${styles.item} pr-5 mt-4`} id={item._id}>
          <div ref={(node) => drag(drop(node))} className={styles.dragIconWrapper}>
          <DragIcon type={'secondary'} />
          </div>
            
            <ConstructorElement price={item.price} text={item.name} thumbnail={item.image} handleClose={() => handleDeleteIngredient(item._id, item.price)} />

        </li>
    )
}
