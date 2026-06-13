import React from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth/authSlice.js'

const Header = () => {
  const { isAuthenticated, role } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-extrabold text-emerald-600 tracking-tight hover:opacity-90"
        >
          📰 NEWS<span className="text-slate-800">PORTAL</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {role === 'admin' && (
                <Link
                  to="/admin"
                  className=" bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm shadow-emerald-100"
                >
                  Пользователи
                </Link>
              )}
              <Link
                to="/my-news"
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                Мои новости
              </Link>
              <Link
                to="/create-news"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm shadow-emerald-100"
              >
                + Создать публикацию
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer text-slate-500 hover:text-red-600 text-sm font-medium transition-colors py-2 px-1"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
