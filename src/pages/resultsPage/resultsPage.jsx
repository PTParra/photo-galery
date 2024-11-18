import { useParams } from "react-router-dom"
import './resultsPage.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSearchThunk } from "../../features/search/searchThunk";
import { searchList, searchListStatus } from "../../features/search/searchSlice";
import { useEffect } from "react";
import { PhotoSmallDescription } from "../../components/photoSmallDescription/photoSmallDescription";



export const ResultsPage = () => {

    const { searchTerm } = useParams();


    const [photoListData, setPhotoListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const photoList = useSelector(searchList);
    const photoStatus = useSelector(searchListStatus);

    const maxPhotoColumns = 4;

    let realColumns;

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


    const organizePhotosInGridDesktop = () => {
        const columns = [];

        let i = maxPhotoColumns;

        while (i > 1) {
            if(photoListData.length % i === 0){
                realColumns = i;
                break;
            }
            i--;
        }
        
        for (let index = 0; index < realColumns; index++) {
            columns[index] = [];
        }

        i = 0;
        //let countOfPhotos = 0;
        //const maxPhotosPerColumn = Math.ceil(photoListData.length / columns.length);

        photoListData.forEach((photo, index) => {
            columns[i].push(<PhotoSmallDescription key={index} height={photo.height} width={photo.width}
                id={photo.id} likes={photo.likes} publishDate={photo.created_at} section={"home-photo"}
                imgURL={photo.urls.regular} fileName={photo.slug + ".jpg"} description={photo.description} />);
            i++;
            if (i >= columns.length){
                i = 0;
            }
                
        })

        return columns;
    }

    const organizePhotosInGridMobile = () => {
        const columns = [];

        let i = maxPhotoColumns;
        
        
        for (let index = 0; index < realColumns; index++) {
            columns[index] = [];
        }

        i = 0;
        let countOfPhotos = 0;
        const maxPhotosPerColumn = Math.ceil(photoListData.length / columns.length);

        photoListData.forEach((photo, index) => {
            columns[i].push(<PhotoSmallDescription key={index} height={photo.height} width={photo.width}
                id={photo.id} likes={photo.likes} publishDate={photo.created_at} section={"home-photo"}
                imgURL={photo.urls.regular} fileName={photo.slug + ".jpg"} description={photo.description} />);
            countOfPhotos++;
            if (countOfPhotos === maxPhotosPerColumn){
                i++;
                countOfPhotos = 0;
            }
                
        })

        return columns;
    }

    const orderPhotos = (order) => {
        let tempArray = [...photoListData];

        if(order !== ''){
            if (order === 'date') {
            tempArray = tempArray.sort((photoA, photoB) =>
                new Date(photoA.created_at).getTime() - new Date(photoB.created_at).getTime()
            );
            }else{
                tempArray = tempArray.sort((photoA, photoB) => photoB[order] - photoA[order]);
            }
        }

        setPhotoListData(tempArray);
    }

    const columns = organizePhotosInGridDesktop();
    const columnsMobile = organizePhotosInGridMobile();


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
                            <select onChange={(event) => orderPhotos(event.target.value)} className="results__photos__orderBy-select">
                                <option value="">Ordenar Por:</option>
                                <option value="width">Anchura</option>
                                <option value="height">Altura</option>
                                <option value="date">Fecha</option>
                                <option value="likes">Me gusta</option>
                            </select>
                            <div className="results__photos__grid">
                                {columns.map((column, index) => (
                                    <div key={index} className='results__photos__grid__column desktop'>
                                        {column}
                                    </div>
                                ))}
                                {columnsMobile.map((column, index) => (
                                    <div key={index} className='results__photos__grid__column mobile'>
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