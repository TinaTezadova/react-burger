import React from 'react';
import styles from './ingredient-icon.module.css';

interface IProps {
    imageUrl: string,
    count?: number | null,
}

export const IngredientIcon: React.FC<IProps> = ({ imageUrl, count }) => {

    return (
        <span className={styles.icon} style={{ backgroundImage: `url(${imageUrl})` }}>
            {count && <p className={`${styles.countInfo} text text_type_main-default`}>+{count}</p>}
        </span>
    )
}