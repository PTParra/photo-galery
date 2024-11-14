import { useParams } from "react-router-dom"
import './resultsPage.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSearchThunk } from "../features/search/searchThunk";
import { searchList, searchListStatus } from "../features/search/searchSlice";
import { useEffect } from "react";
import { PhotoSmallDescription } from "../components/photoSmallDescription";
import { BarraOrdenacion } from "../components/barraOrdenacion";



export const ResultsPage = () => {

    const { searchTerm } = useParams();


    const [photoListData, setPhotoListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const photoList = useSelector(searchList);
    const photoStatus = useSelector(searchListStatus);

    const maxPhotoColumns = 4;

    let actualColumns;

    useEffect(() => {
        switch (photoStatus) {
            case "idle":
                let searchQuery = searchTerm !== "aleatorio" ? searchTerm : "";
                dispatch(getSearchThunk(searchQuery));
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
        let searchQuery = searchTerm !== "aleatorio" ? searchTerm : "";
        dispatch(getSearchThunk(searchQuery));
    }, [searchTerm])


    const organizePhotosInGrid = () => {
        const columns = [];

        for (let index = 0; index < maxPhotoColumns; index++) {
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

        actualColumns = columns.filter(column => column.length > 0).length;

        return columns;
    }

    const orderPhotos = (order) => {
        let tempArray = [...photoListData];

        const columns = [];

        for (let index = 0; index < actualColumns; index++) {
            columns[index] = [];
        }

        let i = 0;

        switch (order) {
            case "width":
            case "height":
            case "likes":
                tempArray = tempArray.sort((photoA, photoB) => photoB[order] - photoA[order]);
                break;
            case "date":
                tempArray = tempArray.sort((photoA, photoB) =>
                    new Date(photoA.created_at).getTime() - new Date(photoB.created_at).getTime()
                );
                break;
            default:
                setPhotoListData(photoList);
                return;
        }

        tempArray.forEach(photo => {
            columns[i].push(photo);
            i++;
            if (i >= columns.length)
                i = 0;
        })

        let output = [];

        for (let index = 0; index < columns.length; index++) {
            output = output.concat(columns[index]);
        }


        setPhotoListData(output);
    }

    const columns = organizePhotosInGrid();


    return (
        <section className="results">
            <h1 className="results__title">{searchTerm === "aleatorio" ? "Fotos aleatorias" : "Resultados de: " + searchTerm}</h1>
            <div className='results__photos'>
                {
                    isLoading ?
                        <div className='results__photos__spinner-box'>
                            <span className="results__photos__spinner-box__loader"></span>
                        </div> : 
                        photoListData.length > 0 ? <>
                            <BarraOrdenacion functionToUse={orderPhotos} className={"results__photos__orderBy-select"} />
                            <div className="results__photos__grid">
                                {columns.map((column, index) => (
                                    <div key={index} className='results__photos__grid__column'>
                                        {column}
                                    </div>
                                ))}
                            </div>
                        </> : <p className="results__photos__no-photos">No hay resultados para esta busqueda</p>
                }
            </div>
        </section>
    )
}