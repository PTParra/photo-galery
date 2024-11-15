import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { LayoutComponent } from './components/layoutComponent.jsx'
import './main.css'
import { HomePage } from './pages/homePage.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SearchPage } from './pages/searchPage.jsx'
import { ResultsPage } from './pages/resultsPage.jsx'
import { MyPhotosPage } from './pages/myPhotosPage.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename='/photo-galery'>
      <Routes>
        <Route path='/' element={<LayoutComponent />}>
          <Route path='' element={<HomePage />} />
          <Route path='buscar' element={<SearchPage />} />
          <Route path='busqueda/:searchTerm' element={<ResultsPage />} />
          <Route path='mis-fotos' element={<MyPhotosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition: Bounce
      />
  </Provider>
)
