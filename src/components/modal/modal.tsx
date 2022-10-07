import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css';

interface IProps {
    handleCloseModal(event: KeyboardEvent | React.MouseEvent):void,
    children: React.ReactNode
}

const Modal = ({ handleCloseModal, children }: IProps) => {
    const [modalContainer, setModalContainer] = useState<any>();

    const createModalContainer = (): HTMLElement => {
        const container = document.createElement('div')
        container.setAttribute('id', 'modalWrapper')
        document.body.appendChild(container);
        return container;
    }

    
    const handleCloseOnEsc = (evn: KeyboardEvent): void => {
        if(evn.key === 'Escape') {
            handleCloseModal(evn)
        }

    }

    useEffect(() => {
        document.addEventListener('keydown', handleCloseOnEsc);
        let modalContainerEl = document.getElementById('modalWrapper');
        if(!modalContainer) {
            modalContainerEl = createModalContainer();
        }
        setModalContainer(modalContainer);

        return () => {
            modalContainer?.parentNode.removeChild(modalContainer);
            document.removeEventListener('keydown', handleCloseOnEsc);
        }

    }, [])


    return modalContainer && ReactDOM.createPortal(
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

export default Modal