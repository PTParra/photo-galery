import { useState } from 'react'
import './imagesDisplayer.scss'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { searchList, searchListStatus } from '../features/search/searchSlice';
import { getSearchThunk } from '../features/search/searchThunk';
import { useEffect } from 'react';
import { PhotoSmallDescription } from '../components/photoSmallDescription';
import { favouriteList } from '../features/favorites/favoritesSlice';


export const HomePage = () => {

    const [photoListData, setPhotoListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const photoList = useSelector(searchList);
    const photoStatus = useSelector(searchListStatus);

    const favoriteListData = useSelector(favouriteList);

    const photoColumns = 4;

    useEffect(() => {
        if (photoStatus === "idle") {
            dispatch(getSearchThunk())
        }
        else if (photoStatus === "pending") {
            setIsLoading(true)
        }
        else if (photoStatus === "fulfilled") {
            setIsLoading(false)
            setPhotoListData(photoList)
            organizePhotosInGrid();
        }
    }, [photoList, photoStatus])


    const organizePhotosInGrid = () => {
        const columns = [];

        for (let index = 0; index < photoColumns; index++) {
            columns[index] = [];
        }

        let i = 0;
        let countOfPhotos = 0;
        const maxPhotosPerColumn = photoListData.length / columns.length;

        photoListData.forEach((photo, index) => {
            columns[i].push(<PhotoSmallDescription key={index} height={photo.height} width={photo.width}
                id={photo.id} likes={photo.likes} publishDate={photo.created_at} section={"home-photo"}
                imgURL={photo.urls.regular} fileName={photo.slug + ".jpg"} description={photo.description} />);

            countOfPhotos++;
            if (countOfPhotos >= maxPhotosPerColumn) {
                i++;
                countOfPhotos = 0;
            }
        })


        return columns;
    }

    const columns = organizePhotosInGrid();

    console.log(favoriteListData);

    return (
        <section className="home">
            <h1 className="home__title">¡Bienvenido!</h1>
            <div className='home__photo-grid'>
                {
                    isLoading ?
                        <div className='home__spinner-box'>
                            <span className="home__spinner-box__loader"></span>
                        </div> : columns.map((column, index) => (
                            <div key={index} className='home__photo-grid__column'>
                                {column}
                            </div>
                        ))
                }
            </div>
        </section>
    )
}
