import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth/authSlice.js'
import { useGetNewsQuery } from '../../store/news/newsApi.js'
import NewsCard from '../../newsCard/index.js'
import { setCredentialsNews } from '../../store/news/newsSlice.js'
import Header from '../../component/header'

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const { data, isLoading, error } = useGetNewsQuery()
  const NewsData = () => {
    const dispatch = useDispatch()
    const { data, isLoading, error } = useGetNewsQuery()
  }

  useEffect(() => {
    if (data) {
      dispatch(setCredentialsNews(data.data))
    }
  }, [data, dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!isAuthenticated) {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Лента новостей
          </h1>
          <span className="text-xs font-semibold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md">
            Всего: {data?.data.length}
          </span>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-b-emerald-600"></div>
            <p className="text-sm text-slate-400 font-medium">
              Загрузка свежих событий...
            </p>
          </div>
        ) : data?.data === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 p-8">
            <p className="text-slate-500 font-medium mb-2">Здесь пока пусто</p>
            <p className="text-xs text-slate-400">
              Станьте первым, кто опубликует новость на портале!
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {data?.data.map((news) => {
              return (
                <NewsCard
                  key={news.id || news._id}
                  id={news.id || news._id}
                  title={news.title}
                  description={news.description}
                  createdAt={news.createdAt}
                  comments={news.comments}
                  author={news.author}
                />
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage
