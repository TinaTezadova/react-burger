import React from 'react';
import styles from './modal-overlay.module.css';

interface IProps {
    handleModalOverlayClick(event: React.MouseEvent):void,
}


const ModalOverlay: React.FC<IProps> = ({ handleModalOverlayClick }) => {

    return (
        <div onClick={handleModalOverlayClick} className={styles.overlayBlock}/>
    )
}

export default ModalOverlay;