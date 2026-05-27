import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import News from "./pages/news";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route  element={<App />} path={"/"}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/news" element={<News />} />
        {/*<Route path="/landing" element={<Landing />} />*/}
      </Route>
    </Routes>
  </BrowserRouter>
)
