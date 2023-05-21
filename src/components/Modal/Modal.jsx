import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children, image}) => {

    useEffect(() => {

        const handleKeydown = e => {  
            if(e.code === 'Escape') {
                onClose();
            };
        };

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown); 
        }
    }, [onClose]);

    const handleOverlayClick = e => {
        if(e.currentTarget === e.target) {
            onClose();
        };
    };

    const { largeImageURL } = image;

        return createPortal(
            <div className={css.overlay} onClick={handleOverlayClick}>
                <div className={css.modal}>{children}
                    <img className={css.image} src={largeImageURL} alt="tags"/>
                </div>
            </div>,
            modalRoot,
        );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
}
export default Modal;