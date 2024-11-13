import { FaDownload } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import './photoSmallDescription.css';
import { useDispatch } from "react-redux";
import { addFavorite, favouriteList, removeFavorite } from "../features/favorites/favoritesSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import FileSaver from "file-saver";



export const PhotoSmallDescription = ({ width, height, likes, id, publishDate, imgURL, fileName, description }) => {

    const dispatch = useDispatch();
    
    const favorites = useSelector(favouriteList);

    const [isFavorite, setIsFavorite] = useState(favorites.some(favorite => favorite.id === id));

    const toggleFavorite = () => {
        if(isFavorite){
            removeFromFavorites();
        }else{
            addToFavorites();
        }
    }

    const addToFavorites = () => {
        const date = new Date(publishDate);
        const formattedDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        const newFavorite = {
            id: id,
            width: width,
            height: height,
            likes: likes,
            imgURL: imgURL,
            publishDate: formattedDate,
            fileName: fileName,
            description: description === null ? "No se ha proporcionado una descripción" : description
        }
        setIsFavorite(true);
        dispatch(addFavorite(newFavorite));
        toast.success('¡Añadido a favoritos!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",});
    }

    const removeFromFavorites = () => {
        setIsFavorite(false);
        dispatch(removeFavorite(id));
        toast.info('Eliminado de favoritos!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",});
    }

    const downloadPhoto = () => {
        FileSaver.saveAs(imgURL, fileName)
    }

    return (
        <article className="photo-container">
            <img className="photo-container__image" src={imgURL} alt="" />
            <div className="photo-container__description">
                <div className="photo-container__description__buttons">
                    <button onClick={toggleFavorite} className="description__button description__button--like">
                        {isFavorite ? <MdFavorite className="description__button__icon" /> 
                        : <MdFavoriteBorder className="description__button__icon" />}
                    </button>
                    <button onClick={downloadPhoto} className="description__button description__button--download">
                        <FaDownload className="description__button__icon" />
                    </button>
                </div>
                <div className="photo-container__description__data">
                    <p
                        className="description__data__text description__data__text--total-likes">
                        Me gusta: <span className="description__data__text__number">{likes}</span>
                    </p>
                    <p
                        className="description__data__text description__data__text--resolution">
                        Resolución: <span className="description__data__text__number">{width}x{height}</span>
                    </p>
                </div>
            </div>
        </article>
    )
}