import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setCredentials } from '../../store/auth/authSlice.js'
import { useGetNewsQuery } from '../../store/news/newsApi.js'
import NewsCard from '../../newsCard/index.js'
import { setCredentialsNews } from '../../store/news/newsSlice.js'
import Header from '../../component/header'
import { useRefreshMutation } from '../../store/auth/authApi.js'
import { Pagination } from 'antd'

const HomePage = () => {
  const [loading] = useState(false)
  const navigate = useNavigate()
  const [refresh] = useRefreshMutation()
  const { isAuthenticated, refresh_token } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const NewsData = () => {}
  const [correntPage, setCorrentPage] = useState(1)
  const handlePageChange = (e) => {
    setCorrentPage(e)
  }
  const { data, isLoading, error, total } = useGetNewsQuery({
    correntPage,
    limit: 5,
  })

  useEffect(() => {
    if (data) {
      dispatch(setCredentialsNews(data.data))
    }
  }, [data, dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  useEffect(() => {
    const initializeAuth = async () => {
      if (refresh_token) {
        try {
          const result = await refresh(refresh_token).unwrap()
          dispatch(setCredentials(result))
        } catch (error) {
          console.error('Error:', error)
          dispatch(logout())
        }
      }
    }
    initializeAuth()
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Лента новостей
        </h1>
        <span className="text-xs font-semibold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md">
          Всего: {data?.total}
        </span>
      </div>
      {isLoading ? (
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
                imageUrl={news.image ? news.image.url : null}
                createdAt={news.createdAt}
                comments={news.comments}
                author={news.author}
              />
            )
          })}
        </div>
      )}
      <div className="mt-3">
        <Pagination
          align="end"
          current={correntPage}
          pageSize={5}
          total={data?.total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </main>
  )
}

export default HomePage
