import { useState } from "react";
import './searchPage.scss';
import { useNavigate } from "react-router-dom";


export const SearchPage = () => {

    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");

    const handleValueChange = (event) => {
        setSearchValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const route = searchValue !== "" ? '/busqueda/' + searchValue : '/busqueda/aleatorio'

        navigate(route);
    }

    return (
        <section className="search">
            <h1 className="search__title">Buscador de imagenes</h1>
            <p className="search__subtitle">(¿No sabes que buscar? ¡Pulsa buscar sin escribir nada!)</p>
            <form onSubmit={handleSubmit} className="search__search-form">
                <input placeholder='"Buscar Imagenes" 'className="search__search-form__input-text" type="text"
                value={searchValue} onChange={handleValueChange}/>
                <input className="search__search-form__submit-button" type="submit" value="Buscar" />
            </form>
        </section>
    )
}