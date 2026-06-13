import React, { useState } from 'react'
import { useGetNewsQuery } from '../../store/news/newsApi.js'
import { jwtDecode } from 'jwt-decode'
import NewsList from '../../component/newsList/index.js'
import { useSelector } from 'react-redux'

const AuthorNews = () => {
  const [correntPage, setCorrentPage] = useState(1)
  const handlePageChange = (e) => {
    setCorrentPage(e)
  }
  let authorId = null
  const token = useSelector((store) => store.auth.access_token)

  if (token) {
    const decoded = jwtDecode(token)
    authorId = decoded.sub
  }
  const { data, isLoading } = useGetNewsQuery({
    correntPage,
    limit: 5,
    authorId,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <NewsList
        data={data}
        isLoading={isLoading}
        correntPage={correntPage}
        handlePageChange={handlePageChange}
        title={'Мои новости'}
        authorId={authorId}
      />
    </div>
  )
}

export default AuthorNews
