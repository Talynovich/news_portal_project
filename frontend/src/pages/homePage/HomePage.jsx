import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((store) => store.auth)

  const isAuth = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (isAuthenticated) {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Шапка портала */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-extrabold text-emerald-600 tracking-tight hover:opacity-90"
          >
            📰 NEWS<span className="text-slate-800">PORTAL</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuth ? (
              <>
                <Link
                  to="/create-news"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm shadow-emerald-100"
                >
                  + Создать публикацию
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-600 text-sm font-medium transition-colors py-2 px-1"
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

      {/* Основная лента */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Лента новостей
          </h1>
          <span className="text-xs font-semibold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md">
            Всего: {newsList.length}
          </span>
        </div>

        {/* Индикатор загрузки */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-b-emerald-600"></div>
            <p className="text-sm text-slate-400 font-medium">
              Загрузка свежих событий...
            </p>
          </div>
        ) : newsList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 p-8">
            <p className="text-slate-500 font-medium mb-2">Здесь пока пусто</p>
            <p className="text-xs text-slate-400">
              Станьте первым, кто опубликует новость на портале!
            </p>
          </div>
        ) : (
          /* Список карточек */
          <div className="space-y-5">
            {/*{newsList.map((news) => (*/}
            {/*  <NewsCard*/}
            {/*    key={news.id || news._id}*/}
            {/*    id={news.id || news._id}*/}
            {/*    title={news.title}*/}
            {/*    content={news.content}*/}
            {/*    imageUrl={news.imageUrl}*/}
            {/*    createdAt={news.createdAt}*/}
            {/*    comments={news.comments} // Прокидываем комментарии (или их каунт) в карточку*/}
            {/*  />*/}
            {/*))}*/}
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage
