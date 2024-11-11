import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { LayoutComponent } from './components/layoutComponent.jsx'
import './main.css'

createRoot(document.getElementById('root')).render(
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutComponent />}>
          <Route path='' element={<h1>BIENVENIDO</h1>} />
          <Route path='buscar' element={<h1>¿Que quieres buscar?</h1>} />
          <Route path='busqueda/:input' element={<h1>Resultados de:</h1>} />
          <Route path='mis-fotos' element={<h1>Mis Fotos</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
)
