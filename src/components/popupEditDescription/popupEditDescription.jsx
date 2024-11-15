import { toast } from 'react-toastify';
import './popupEditDescription.css'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { editFavorite } from '../../features/favorites/favoritesSlice';



export const PopupEditDescription = ({ id, photo, description, togglePopup }) => {

    const [newDescription, setNewDescription] = useState(description);

    const dispatch = useDispatch();

    const handleChange = (event) =>{
        setNewDescription(event.target.value);
    }

    const updateFavoriteDescription = (event) => {

        event.preventDefault();

        dispatch(editFavorite({id: id, description: newDescription}));

        togglePopup();

        toast.info('Descripción Actualizada', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",});
    }

    return (
        <div type='button' className='popup-edit'>
            <div className='popup-edit__container'>
                <h1 className='popup-edit__container__title'>Editar Descripción</h1>
                <img className='popup-edit__container__image' src={photo} alt="" />
                <form onSubmit={updateFavoriteDescription} className='popup-edit__container__edit-description-form'>
                    <textarea maxLength='125' rows='4' className='popup-edit__container__edit-description-form__text-area'
                        onChange={handleChange} value={newDescription}></textarea>
                    <input className='popup-edit__container__edit-description-form__button'
                        type="submit" value="Aplicar" />
                    <button type='button' onClick={togglePopup} className='popup-edit__container__edit-description-form__button popup-edit__container__edit-description-form__button--cancel'>Cancelar</button>
                </form>
            </div>
            <button onClick={togglePopup} className='popup-edit__background-close-button' type='button'></button>
        </div>
    )
} 