import { useState } from 'react'
import './homePage.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { searchList, searchListStatus } from '../features/search/searchSlice';
import { getSearchThunk } from '../features/search/searchThunk';
import { useEffect } from 'react';
import { PhotoSmallDescription } from '../components/photoSmallDescription';


export const HomePage = () => {

    const [photoListData, setPhotoListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const photoList = useSelector(searchList);
    const photoStatus = useSelector(searchListStatus);

    const photoColumns = 4;

    useEffect(() => {
        switch (photoStatus) {
            case "idle":
                dispatch(getSearchThunk());
                break;
            case "pending":
                setIsLoading(true);
                break;
            case "fulfilled":
                setIsLoading(false);
                setPhotoListData(photoList);
                break;
            default:
                break;
        }
    }, [photoList, photoStatus])

    useEffect(() => {
        if(photoList.length === 0)
            dispatch(getSearchThunk());
    }, [photoListData])


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
