import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/homePage/HomePage'
import LoginPage from './pages/loginPage/LoginPage'
import DetailNewPage from './pages/detailNewPage'

import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/index'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import CreateNewsPage from './pages/createNewsPage'
import MyNews from './pages/myNews'
import Layout from './pages/layout'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path={'/'}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-news" element={<CreateNewsPage />} />
          <Route path="/my-news" element={<MyNews />} />
          <Route path="/news/:id" element={<DetailNewPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
