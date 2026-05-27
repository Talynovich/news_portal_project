import React, { useState } from 'react';

export default function News() {
  const [newsList, setNewsList] = useState([
    {
      id: 1,
      title: 'Первая новость',
      text: 'Пример текста новости для демонстрации верстки на Tailwind CSS.',
      image: 'https://unsplash.com'
    }
  ]);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleUpload = (e) => {
    // Имитация отправки файла на POST /upload
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      // Имитация PATCH /news/{id}
      setNewsList(newsList.map(n => n.id === editingId ? { ...n, title, text, image: imageUrl } : n));
      setEditingId(null);
    } else {
      // Имитация POST /news
      const newPost = { id: Date.now(), title, text, image: imageUrl };
      setNewsList([newPost, ...newsList]);
    }
    setTitle('');
    setText('');
    setImageUrl('');
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setText(post.text);
    setImageUrl(post.image);
  };

  const handleDelete = (id) => {
    // Имитация DELETE /news/{id}
    setNewsList(newsList.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Форма создания и редактирования новости */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow-md border border-slate-100 space-y-4">
        <h3 className="text-xl font-bold text-slate-800">
          {editingId ? 'Редактировать публикацию' : 'Создать новость'}
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Заголовок</label>
          <input
            type="text"
            placeholder="Введите заголовок новости"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Текст новости</label>
          <textarea
            placeholder="Содержимое новости..."
            required
            rows="4"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md text-sm font-medium border border-slate-300 text-slate-700 transition-colors">
            Выбрать обложку
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
          {imageUrl && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-emerald-600 font-medium">✓ Изображение выбрано</span>
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="text-xs text-rose-500 hover:underline"
              >
                Удалить
              </button>
            </div>
          )}
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors"
          >
            {editingId ? 'Сохранить изменения' : 'Опубликовать'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setTitle(''); setText(''); setImageUrl(''); }}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-300 transition-colors"
            >
              Отмена
            </button>
          )}
        </div>
      </form>

      {/* Лента новостей */}
      <div className="space-y-6">
        {newsList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
            Нет опубликованных новостей
          </div>
        ) : (
          newsList.map((news) => (
            <article key={news.id} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden flex flex-col">
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                      {news.title}
                    </h2>
                    <div className="flex space-x-3 shrink-0 pt-1">
                      <button
                        onClick={() => handleEdit(news)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDelete(news.id)}
                        className="text-sm font-medium text-rose-600 hover:text-rose-800 transition-colors"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600 leading-relaxed whitespace-pre-line">
                    {news.text}
                  </p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
