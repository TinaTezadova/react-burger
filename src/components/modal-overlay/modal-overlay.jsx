import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ handleModalOverlayClick }) => {

    return (
        <div onClick={handleModalOverlayClick} className={styles.overlayBlock}/>
    )
}

ModalOverlay.propTypes = {
    handleModalOverlayClick: PropTypes.func.isRequired,
}

export default ModalOverlay;