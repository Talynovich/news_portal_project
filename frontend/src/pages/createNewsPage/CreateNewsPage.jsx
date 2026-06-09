import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useUploadImageMutation,
  useCreateNewsMutation,
} from '../../store/news/newsApi.js'

const CreateNewsPage = () => {
  const [uploadImage, { isLoading: isUploadingImage, error: uploadError }] =
    useUploadImageMutation()
  const [createNews, { isLoading: isCreatingNews, error: newsError }] =
    useCreateNewsMutation()
  const [imagePreview, setImagePreview] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const currentImageId = watch('id')
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
    setSuccessMessage(null)
    try {
      const response = await uploadImage(file).unwrap()
      setValue('imageUrl', response.id, { shouldValidate: true })
    } catch (err) {
      console.error('Ошибка загрузки картинки:', err)
      setImagePreview(null)
    }
  }
  const onSubmit = async (data) => {
    setSuccessMessage(null)
    try {
      await createNews(data).unwrap()
      setSuccessMessage('Новость успешно опубликована!')
      setImagePreview(null)
      reset()
    } catch (err) {
      console.error('Ошибка создания новости:', err)
    }
  }
  const serverError =
    uploadError?.data?.message ||
    newsError?.data?.message ||
    uploadError?.error ||
    newsError?.error

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Создать новость
        </h2>
        <p className="text-center text-slate-500 mb-6 text-sm">
          Заполните поля, чтобы опубликовать новую статью
        </p>
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {typeof serverError === 'string'
              ? serverError
              : 'Произошла ошибка на сервере'}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-lg border border-emerald-100 font-medium">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Заголовок новости
            </label>
            <input
              type="text"
              {...register('title', { required: 'Заголовок обязателен' })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
              placeholder="Введите яркий заголовок..."
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Текст новости
            </label>
            <textarea
              rows={5}
              {...register('description', {
                required: 'Текст новости обязателен',
              })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 resize-none"
              placeholder="Основное содержание новости..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Обложка новости
            </label>

            <input type="hidden" {...register('imageUrl')} />

            <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 hover:bg-slate-100 transition-colors relative">
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Превью"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <label className="cursor-pointer w-full py-6 flex flex-col items-center justify-center">
                  <svg
                    className="mx-auto h-12 w-12 text-slate-400 mb-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                    Загрузить файл
                  </span>
                  <span className="text-slate-400 text-xs mt-1">
                    PNG, JPG, GIF до 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isUploadingImage}
                  />
                </label>
              )}
            </div>
            {errors.imageId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.imageId.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 mt-2 flex justify-center items-center"
          >
            Опубликовать
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNewsPage
