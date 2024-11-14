import { useSelector } from 'react-redux';
import { PhotoBigDescription } from '../components/photoBigDescription'
import './myPhotosPage.css'
import { favouriteList } from '../features/favorites/favoritesSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { BarraOrdenacion } from '../components/barraOrdenacion';


export const MyPhotosPage = () => {

    const favoritesData = useSelector(favouriteList);

    const [orderBy, setOrderBy] = useState("");

    const [descriptionFilter, setDescriptionFilter] = useState("");

    const [favoritesListData, setFavoritesListData] = useState(favoritesData);

    const [warningText, setWarningText] = useState("");

    useEffect(() => {
        setFavoritesListData(favoritesData);
        ordenarValores();
        filtarPorDescripcion()
    }, [favoritesData]);

    useEffect(() => ordenarValores(), [orderBy]);

    useEffect(() => filtarPorDescripcion(), [descriptionFilter]);

    useEffect(() => {
        if (favoritesData.length === 0) {
            setWarningText("No tienes fotos en favoritos");
        } else if (favoritesListData.length === 0) {
            setWarningText("No hay fotos que cumplan el parametro propocionado: " + descriptionFilter);
        }
    }, [favoritesListData]);

    const handleOrderChange = (order) => {
        setOrderBy(order);
        ordenarValores();
    }

    const handleInputChange = (event) => {
        setDescriptionFilter(event.target.value);
        filtarPorDescripcion();
    }

    const filtarPorDescripcion = () => {
        if (descriptionFilter !== "")
            setFavoritesListData(favoritesData.filter(favorite => favorite.description.toLowerCase().includes(descriptionFilter.toLowerCase())));
        else
            setFavoritesListData(favoritesData);
    }



    const ordenarValores = () => {

        let tempArray = [...favoritesListData];

        switch (orderBy) {
            case "width":
            case "height":
            case "likes":
                tempArray = tempArray.sort((photoA, photoB) => photoB[orderBy] - photoA[orderBy]);
                break;
            case "date":
                tempArray = tempArray.sort((photoA, photoB) => {
                    const [dayB, monthB, yearB] = photoB.publishDate.split('/').map(Number);
                    const dateB = new Date(yearB, monthB - 1, dayB).getTime();
                    const [dayA, monthA, yearA] = photoA.publishDate.split('/').map(Number);
                    const dateA = new Date(yearA, monthA - 1, dayA).getTime();
                    return dateB - dateA;
                }

                );
                break;
            default:
                return;
        }
        setFavoritesListData(tempArray);
    }


    return (
        <section className="my-photos">
            <h1 className="my-photos__title">Mis Fotos</h1>
            {favoritesData.length > 0 ?
                <>
                    <input placeholder='Filtrar por Descripcion' value={descriptionFilter} className='my-photos__description-input' type="text" onChange={handleInputChange} />
                    <BarraOrdenacion functionToUse={handleOrderChange} className={'my-photos__orderby-bar'} />

                    {favoritesListData.length > 0 ? favoritesListData.map((favorite, index) => 
                        <PhotoBigDescription key={index}
                            description={favorite.description}
                            fileName={favorite.fileName}
                            width={favorite.width}
                            height={favorite.height}
                            id={favorite.id}
                            imgURL={favorite.imgURL}
                            likes={favorite.likes}
                            publishDate={favorite.publishDate}
                        />) : 
                        <p className='my-photos__subtitle'>No hay fotos que cumplan el parametro propocionado: {descriptionFilter}</p>
                    }
                </>
                : <p className='my-photos__subtitle'>No tienes fotos en favoritos</p>
            }
        </section>
    )
}