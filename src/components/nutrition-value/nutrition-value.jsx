import React from 'react';
import styles from './nutrition-value.module.css';
import PropTypes from 'prop-types';

const NutritionValue = ({ title, value }) => {

    return (
        <li className={styles.wrapper}>
            <p className='text mb-2'>{title}</p>
            <p className='text text_type_digits-default'>{value}</p>
        </li>

    )
}

NutritionValue.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default NutritionValue;