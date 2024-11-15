import { toast } from 'react-toastify';
import { removeFavorite } from '../../features/favorites/favoritesSlice';
import './popupDeletePhoto.css';
import { useDispatch } from 'react-redux';



export const PopupDeletePhoto = ({id, togglePopup}) => {

    const dispatch = useDispatch();

    const deleteFavorite = () => {
        dispatch(removeFavorite(id));

        togglePopup();

        toast.error('Eliminado de favoritos', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",});
    }

    return(
        <div type='button' className="popup">
            <div className='popup__message'>
                <h1 className='popup__message__title'>Eliminar de favoritos</h1>
                <p className='popup__message__text popup__message__text--subtitle'>
                    ¿Estas seguro de que quieres eliminar esta imagen de favoritos?
                </p>
                <p className='popup__message__text popup__message__text--warning'>
                    Los cambios no se pueden revertir
                </p>

                <button onClick={deleteFavorite} className='popup__message__button'>Eliminar</button>
                <button onClick={togglePopup} className='popup__message__button popup__message__button--cancel'>Cancelar</button>
            </div>
            <button onClick={togglePopup} className='popup__background-close-button' type='button'></button>
        </div>
    )
} 