import React from 'react'
import Loader from '../loader/index.js'
import NewsCard from '../../newsCard/index.js'
import { Pagination } from 'antd'

const NewsList = ({
  data,
  isLoading,
  correntPage,
  handlePageChange,
  title,
  authorId,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
        <span className="text-xs font-semibold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md">
          Всего: {data?.total}
        </span>
      </div>
      {isLoading ? (
        <Loader />
      ) : data?.data === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 p-8">
          <p className="text-slate-500 font-medium mb-2">Здесь пока пусто</p>
          <p className="text-xs text-slate-400">
            Станьте первым, кто опубликует новость на портале!
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {data?.data.map((news) => (
            <NewsCard
              key={news.id || news._id}
              id={news.id || news._id}
              title={news.title}
              description={news.description}
              imageUrl={news.imageUrl ? news.image.url : null}
              createdAt={news.createdAt}
              comments={news.comments}
              author={news.author}
              authorId={authorId}
            />
          ))}
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
    </div>
  )
}

export default NewsList
