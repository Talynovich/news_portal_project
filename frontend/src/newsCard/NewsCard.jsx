import React from 'react'
import { Link } from 'react-router'
import { Image } from 'antd'

const NewsCard = ({ id, title, description, imageUrl, createdAt, author }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('ru-RU')
  return (
    <article className="flex flex-col md:flex-row bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="md:w-64 h-48 md:h-full min-h-[180px] bg-gray-100 relative flex-shrink-0">
        {imageUrl ? (
          <Image width={300} alt={title} src={imageUrl} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
            <svg
              className="w-12 h-12 mb-2 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            ></svg>
            <span className="text-xs font-medium">Нет изображения</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between p-5 flex-grow">
        <div>
          <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
            {author && (
              <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                {author.username}
              </span>
            )}
            <span>•</span>
            <time dateTime={createdAt}>{formattedDate}</time>
          </div>

          <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
            <a href={`/news/${id}`}>{title}</a>
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm">
          <div className="flex items-center space-x-1.5 text-gray-500"></div>
          <Link
            to={`/news/${id}`}
            className="text-blue-600 hover:text-blue-700 font-semibold text-xs uppercase tracking-wider flex items-center space-x-1 transition-colors"
          >
            <span>Читать далее</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default NewsCard
