import { useState } from 'react';
import './photoBigDescription.css';
import FileSaver from 'file-saver';
import { useRef } from 'react';
import { editFavorite } from '../../features/favorites/favoritesSlice';
import { useDispatch } from 'react-redux';
import { PopupDeletePhoto } from '../popupDeletePhoto/popupDeletePhoto';
import { PopupEditDescription } from '../popupEditDescription/popupEditDescription';

export const PhotoBigDescription = ({ width, height, likes, id, publishDate, imgURL, fileName, description }) => {

    const [popupDeleteIsShown, setPopupDeleteIsShown] = useState(false);
    
    const [popupEditIsShown, setPopupEditIsShown] = useState(false);

    const dispatch = useDispatch();

    const date = new Date(publishDate);

    const formattedDate = ((date.getDate()).toString().padStart(2, "0")) + "/" + ((date.getMonth() + 1).toString().padStart(2, "0")) + "/" + date.getFullYear();

    const downloadPhoto = () => {
        FileSaver.saveAs(imgURL, fileName)
    }

    
    const togglePopupDelete = () => {
        setPopupDeleteIsShown(!popupDeleteIsShown);
    }
    
    const togglePopupEdit = () => {
        setPopupEditIsShown(!popupEditIsShown);
    }

    return(
        <article className="big-photo-container">
            <div className="big-photo-container__attributes">
                <h3 className='big-photo-container__attributes__title'>Descripción:</h3>
                <p className='big-photo-container__attributes__value big-photo-container__attributes__value--description'>{description}</p>
                
                <h3 className='big-photo-container__attributes__title'>Resolución:</h3>
                <p className='big-photo-container__attributes__value'>{width}x{height}</p>
                <h3 className='big-photo-container__attributes__title'>Me gusta:</h3>
                <p className='big-photo-container__attributes__value'>{likes}</p>
                <h3 className='big-photo-container__attributes__title'>Publicada el:</h3>
                <p className='big-photo-container__attributes__value'>{formattedDate}</p>
                <div className='big-photo-container__attributes__buttons'>
                    <button onClick={downloadPhoto} className='attributes__buttons__button' type='button'>
                        Descargar
                    </button>
                    <button onClick={togglePopupEdit} className='attributes__buttons__button' type='button'>
                        Modificar Descripción
                    </button>
                    <button onClick={togglePopupDelete} className='attributes__buttons__button attributes__buttons__button--delete' type='button'>
                        Eliminar
                    </button>
                </div>
            </div>
            <div className='big-photo-container__image-container'>
                <img className="big-photo-container__image-container__image" src={imgURL} alt="" />
            </div>
            {popupDeleteIsShown ? <PopupDeletePhoto id={id} togglePopup={togglePopupDelete} /> : <></>}
            {popupEditIsShown ? <PopupEditDescription description={description} id={id} photo={imgURL} togglePopup={togglePopupEdit} /> : <></>}
        </article>
    )
}