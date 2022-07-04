import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ handleCloseModal, children }) => {
    const [modalContainer, setModalContainer] = useState();

    const createModalContainer = () => {
        const container = document.createElement('div')
        container.setAttribute('id', 'modalWrapper')
        document.body.appendChild(container);
        return container;
    }

    
    const handleCloseOnEsc = (evn) => {
        if(evn.key === 'Escape') {
            handleCloseModal()
        }

    }

    useEffect(() => {
        document.addEventListener('keydown', handleCloseOnEsc);
        let modalContainer = document.getElementById('modalWrapper');
        if(!modalContainer) {
            modalContainer = createModalContainer();
        }
        setModalContainer(modalContainer);

        return () => {
            modalContainer.parentNode.removeChild(modalContainer);
            document.removeEventListener('keydown', handleCloseOnEsc);
        }

    }, [])


    return !modalContainer ? null : ReactDOM.createPortal(
        (
            <>
                <ModalOverlay handleModalOverlayClick={handleCloseModal} />
                <div className={styles.wrapper} >
                    <button className={`${styles.closeButton} mr-10 mt-10`} onClick={handleCloseModal}>
                        <CloseIcon type='primary' />
                    </button>
                    {children}
                </div>
            </>
        ), modalContainer);
}

Modal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal