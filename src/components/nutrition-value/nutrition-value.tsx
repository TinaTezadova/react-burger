import React from 'react';
import styles from './nutrition-value.module.css';

interface IProps {
    title: string,
    value: number
}

const NutritionValue: React.FC<IProps> = ({ title, value }) => {

    return (
        <li className={styles.wrapper}>
            <p className='text mb-2'>{title}</p>
            <p className='text text_type_digits-default'>{value}</p>
        </li>

    )
}

export default NutritionValue;