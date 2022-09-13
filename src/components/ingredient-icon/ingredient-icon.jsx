import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-icon.module.css'

export const IngredientIcon = ({ imageUrl, count }) => {

    return (
        <span className={styles.icon} style={{ backgroundImage: `url(${imageUrl})` }}>
            {count && <p className={`${styles.countInfo} text text_type_main-default`}>+{count}</p>}
        </span>
    )
}

IngredientIcon.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
}