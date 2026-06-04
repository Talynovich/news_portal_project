import React from 'react';
import {useNavigate, useParams} from "react-router";
import { useGetDetailNewsQuery} from "../../store/news/newsApi.js";
import Loader from "../../component/loader/index.js";

const DetailNewPage = () => {
  const {id} = useParams()
  const { data, isLoading } = useGetDetailNewsQuery(id);
  const navigate = useNavigate()
  const formattedDate = new Date(data?.createdAt).toLocaleDateString('ru-RU');
  if (isLoading) return <Loader />

return (
  <article className="max-w-4xl mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
    <button
      onClick={() => navigate('/')}
      className="cursor-pointer mb-6 flex items-center space-x-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
    >
      <span>← Назад</span>
    </button>
    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
      {data?.title}
    </h1>
    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
      {formattedDate && (
        <time dateTime={data.createdAt} className="font-medium">
          {formattedDate}
        </time>
      )}
      {data.author?.username && (
        <>
          <span className="mx-2">•</span>
          <span>Автор: {data.author.username}</span>
        </>
      )}
    </div>
    {data.imageId && (
      <div className="w-full overflow-hidden rounded-2xl mb-8 shadow-md">
        <img
          src={data.imageId}
          alt={data.title}
          className="w-full h-auto max-h-[500px] object-cover"
        />
      </div>
    )}
    <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-line">
      {data.description}
    </div>
  </article>
);
};

export default DetailNewPage;