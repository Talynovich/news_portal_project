import React from 'react'

const NewsCard = ({
  id,
  title,
  description,
  imageUrl,
  createdAt,
  author,
  comments,
}) => {

  const commentsCount = Array.isArray(comments)
    ? comments.length
    : comments || 0
  return (
    <article className="flex flex-col md:flex-row bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Блок с изображением */}
      <div className="md:w-64 h-48 md:h-full min-h-[180px] bg-gray-100 relative flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Красивая заглушка, если картинки нет */
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
            <svg
              className="w-12 h-12 mb-2 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-medium">Нет изображения</span>
          </div>
        )}
      </div>

      {/* Контентная часть */}
      <div className="flex flex-col justify-between p-5 flex-grow">
        <div>
          {/* Мета-данные верхние */}
          <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
            {author && (
              <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                @{author.username}
              </span>
            )}
            <span>•</span>
            <time dateTime={createdAt}>{}</time>
          </div>

          {/* Заголовок */}
          <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
            <a href={`/news/${id}`}>{title}</a>
          </h2>

          {/* Текст новости */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Подвал карточки */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm">
          {/* Иконка комментариев */}
          <div className="flex items-center space-x-1.5 text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-medium">{commentsCount}</span>
          </div>

          {/* Кнопка "Читать" */}
          <a
            href={`/news/${id}`}
            className="text-blue-600 hover:text-blue-700 font-semibold text-xs uppercase tracking-wider flex items-center space-x-1 transition-colors"
          >
            <span>Читать далее</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

export default NewsCard