import { Outlet } from "react-router-dom"
import logoPagina from '/Logo.svg'
import { Link } from "react-router-dom"
import imagenAbrirMenu from '../../assets/menu.svg';
import imagenCerrarMenu from '../../assets/closeMenu.svg';
import { NavLink } from "react-router-dom";
import './layoutComponent.css'
import { useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


export const LayoutComponent = () => {

    const linkListRef = useRef(null);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const location = useLocation();

    const checkActiveLink = (path) => {
        return location.pathname.startsWith(path) ? 'active' : '';
    }

    const alternarMenuHamburguesa = () => {

        setMenuIsOpen(!menuIsOpen);

        linkListRef.current.classList.toggle('mostrar_menu');
    }

    useEffect(() => {
        setMenuIsOpen(false);

        linkListRef.current.classList.remove('mostrar_menu')
    
    }, [location.pathname])


    return (
        <>
            <header className="header">
                <nav className="header__navbar">
                    <Link to='/' className="header__navbar__page-logo">
                        <img className="header__navbar__page-logo__image" src={logoPagina} alt="Logo de la pagina" />
                    </Link>
                    <button onClick={alternarMenuHamburguesa} className="header__navbar__button-hamburger">
                        <img className="button-hamburger__image" src={menuIsOpen ? imagenCerrarMenu : imagenAbrirMenu} alt="" />
                    </button>
                    <ul ref={linkListRef} className="header__navbar__link-list">
                        <li className="link-list__link">
                            <NavLink className='link-list__link__text' to='/'>Inicio</NavLink>
                        </li>
                        <li className="link-list__link">
                            <Link className={'link-list__link__text ' + checkActiveLink('/bus')} to='/buscar'>Buscar</Link>
                        </li>
                        <li className="link-list__link">
                            <Link className={'link-list__link__text ' + checkActiveLink('/mis-fotos')} to='/mis-fotos'>Mis Fotos</Link>
                        </li>
                    </ul>
                </nav>

            </header>

            <main className="main">
                <Outlet />
            </main>

            <footer className="footer">
                <p className="footer__text">© Patricio Tristante Parra</p>
            </footer>
        </>
    )
}