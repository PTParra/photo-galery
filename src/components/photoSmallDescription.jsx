import { FaDownload } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import './photoSmallDescription.scss';




export const PhotoSmallDescription = ({ section, width, height, likes, id, pulishDate, imgURL }) => {

    return (
        <article className={section + " photo-container"}>
            <img className="photo-container__image" src={imgURL} alt="" />
            <div className="photo-container__description">
                <div className="photo-container__description__buttons">
                    <button className="description__button description__button--like">
                        <MdFavoriteBorder className="description__button__icon" />
                    </button>
                    <button className="description__button description__button--download">
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