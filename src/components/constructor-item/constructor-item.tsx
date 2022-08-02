import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import styles from './constructor-item.module.css';


export const ConstructorItem = ({item, handleDeleteIngredient, findItem, sortIngredients}: any) => {
  const originalIndex = findItem(item._id).currentIndex
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
        <li key={item._id} className={`${styles.item} pr-5 mt-4`} id={item._id}>
          <div ref={(node) => drag(drop(node))} className={styles.dragIconWrapper}>
          <DragIcon type={'secondary'} />
          </div>
            
            <ConstructorElement price={item.price} text={item.name} thumbnail={item.image} handleClose={() => handleDeleteIngredient(item._id, item.price)} />

        </li>
    )
}

ConstructorItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleDeleteIngredient: PropTypes.func.isRequired,
  findItem: PropTypes.func.isRequired,
  sortIngredients: PropTypes.func.isRequired,
  
}
