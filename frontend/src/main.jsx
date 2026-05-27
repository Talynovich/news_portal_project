import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/homePage/HomePage'
import LoginPage from './pages/loginPage/LoginPage'

import News from './pages/news'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/index'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path={'/'}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/news" element={<News />} />
          {/*<Route path="/landing" element={<Landing />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
