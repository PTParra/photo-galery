import { useState } from 'react';
import './photoBigDescription.css';
import FileSaver from 'file-saver';
import { useRef } from 'react';
import { editFavorite } from '../features/favorites/favoritesSlice';
import { useDispatch } from 'react-redux';
import { PopupDeletePhoto } from './popupDeletePhoto';

export const PhotoBigDescription = ({ width, height, likes, id, publishDate, imgURL, fileName, description }) => {


    const [descriptionValue, setDescriptionValue] = useState(description);

    const [popupIsShown, setPopupIsShown] = useState(false);

    const dispatch = useDispatch();

    const formRef = useRef(null);

    const descriptionRef = useRef(null);

    const modifyButtonRef = useRef(null);

    const handleChange = (event) => {
        setDescriptionValue(event.target.value);
    }

    const downloadPhoto = () => {
        FileSaver.saveAs(imgURL, fileName)
    }

    const handleForm = (event) => {
        event.preventDefault();

        dispatch(editFavorite({id: id, description: descriptionValue}));

        toggleFormEditDescription();
    }

    const toggleFormEditDescription = () => {
        formRef.current.classList.toggle('hideContainer');
        descriptionRef.current.classList.toggle('hideValueWithOpacity');
        modifyButtonRef.current.classList.toggle('disabledButton');
        modifyButtonRef.current.toggleAttribute('disabled');
    }
    
    const togglePopup = () => {
        setPopupIsShown(!popupIsShown);
    }

    return(
        <article className="big-photo-container">
            <div className="big-photo-container__attributes">
                <h3 className='big-photo-container__attributes__title'>Descripción:</h3>
                <p ref={descriptionRef} className='big-photo-container__attributes__value big-photo-container__attributes__value--description'>{description}</p>
                <form onSubmit={handleForm} ref={formRef} className='big-photo-container__attributes__edit-description-form hideContainer'>
                    <textarea maxLength='125' rows='4' className='big-photo-container__attributes__edit-description-form__text-area' 
                    onChange={handleChange} value={descriptionValue}></textarea>
                    <input className='big-photo-container__attributes__edit-description-form__button'
                    type="submit" value="Aplicar" />
                    <button type='button' onClick={toggleFormEditDescription} className='big-photo-container__attributes__edit-description-form__button big-photo-container__attributes__edit-description-form__button--cancel'>Cancelar</button>
                </form>
                <h3 className='big-photo-container__attributes__title'>Resolución:</h3>
                <p className='big-photo-container__attributes__value'>{width}x{height}</p>
                <h3 className='big-photo-container__attributes__title'>Me gusta:</h3>
                <p className='big-photo-container__attributes__value'>{likes}</p>
                <h3 className='big-photo-container__attributes__title'>Publicada el:</h3>
                <p className='big-photo-container__attributes__value'>{publishDate}</p>
                <div className='big-photo-container__attributes__buttons'>
                    <button onClick={downloadPhoto} className='attributes__buttons__button' type='button'>
                        Descargar
                    </button>
                    <button ref={modifyButtonRef} onClick={toggleFormEditDescription} className='attributes__buttons__button' type='button'>
                        Modificar Descripción
                    </button>
                    <button onClick={togglePopup} className='attributes__buttons__button attributes__buttons__button--delete' type='button'>
                        Eliminar
                    </button>
                </div>
            </div>
            <div className='big-photo-container__image-container'>
                <img className="big-photo-container__image-container__image" src={imgURL} alt="" />
            </div>
            {popupIsShown ? <PopupDeletePhoto id={id} togglePopup={togglePopup} /> : <></>}
        </article>
    )
}