import { useState } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image }) {
    const [shownModal, setShownModal] = useState(false);

    const toggleModal = () => {
        setShownModal(shownModal => !shownModal);
      }
        const { webformatURL } = image;

        return (
            <li className={css.imageGalleryItem}>
                <img className={css.imageGalleryItem__image} src={webformatURL} alt="tags" onClick={toggleModal}/>
                {shownModal && <Modal onClose={toggleModal} image={image}/>}
            </li>
        )
    } 

ImageGalleryItem.propTypes = {
    image: PropTypes.object,
}