import React, { Component } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    };

    handleKeydown = e => {  
        if(e.code === 'Escape') {
            this.props.onClose();
        };
    };

    handleOverlayClick = e => {
        if(e.currentTarget === e.target) {
            this.props.onClose();
        };
    };

    render() {
        const { largeImageURL } = this.props.image;
        return createPortal(
            <div className={css.overlay} onClick={this.handleOverlayClick}>
                <div className={css.modal}>{this.props.children}
                    <img className={css.image} src={largeImageURL} alt="tags"/>
                </div>
            </div>,
            modalRoot,
        );
};
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
}