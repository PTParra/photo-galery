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


    const handleOrderChange = (order) => {
        setOrderBy(order);
    }

    const handleInputChange = (event) => {
        setDescriptionFilter(event.target.value);
    }

    const ordenarFiltrarValores = () => {

        let tempArrayFavorites = favoritesData;

        if (descriptionFilter !== "") {
            tempArrayFavorites = favoritesData.filter(favorite => favorite.description.toLowerCase().includes(descriptionFilter.toLowerCase()));
        }


        if (orderBy !== "") {
            tempArrayFavorites = [...tempArrayFavorites].sort((favoriteA, favoriteB) => {
                if (orderBy === 'date') {
                    return new Date(favoriteB.publishDate) - new Date(favoriteA.publishDate);
                }
                return favoriteB[orderBy] - favoriteA[orderBy];
            });
        }
        

        setFavoritesListData(tempArrayFavorites);
    }

    useEffect(() => {
        ordenarFiltrarValores();
    }, [favoritesData, orderBy, descriptionFilter]);


    return (
        <section className="my-photos">
            <h1 className="my-photos__title">Mis Fotos</h1>
            {favoritesData.length > 0 ?
                <>
                    <input placeholder='Filtrar por Descripcion' value={descriptionFilter} className='my-photos__description-input' type="text" onChange={handleInputChange} />
                    <BarraOrdenacion functionToUse={handleOrderChange} className={'my-photos__orderby-bar'} />

                    {favoritesListData.length > 0 ? favoritesListData.map((favorite) =>
                        <PhotoBigDescription key={favorite.id}
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