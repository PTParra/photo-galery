import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './main.css'
import { HomePage } from './pages/homePage/homePage.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SearchPage } from './pages/searchPage/searchPage.jsx'
import { ResultsPage } from './pages/resultsPage/resultsPage.jsx'
import { MyPhotosPage } from './pages/myPhotosPage/myPhotosPage.jsx'
import { LayoutComponent } from './components/layoutComponent/layoutComponent.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutComponent />}>
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
