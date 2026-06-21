import { useState } from 'react'
import { useParams } from 'react-router'
import { Button, Input, message } from 'antd'
import { useAddCommentsNewsMutation } from '../../store/news/newsApi'

const { TextArea } = Input

const CommentComponent = ({ comments, isLoading, isAuthenticated }) => {
  const { id: newsId } = useParams()
  const [commentText, setCommentText] = useState('')
  const [addCommentsNews] = useAddCommentsNewsMutation()

  const handleSendComment = async () => {
    try {
      await addCommentsNews({ newsId, text: commentText.trim() })
      setCommentText('')
      message.success('Комментарий успешно добавлен')
    } catch (error) {
      console.error(error)
      message.error(`Не удалось отправить комментарий: ${error}`)
    }
  }

  return (
    <div>
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          Комментарии ({comments.length})
        </h3>
        {isAuthenticated ? (
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <div className="text-sm font-medium text-slate-700"></div>
            <div className="mb-5">
              <TextArea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Напишите, что вы думаете..."
                maxLength={500}
                showCount
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="primary"
                disabled={!commentText.trim()}
                onClick={handleSendComment}
                className="rounded-lg font-medium"
              >
                Отправить
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100 text-center p-4 rounded-xl border border-dashed border-gray-300 text-sm text-gray-600">
            Чтобы оставлять комментарии, пожалуйста,{' '}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              войдите в аккаунт
            </a>
            .
          </div>
        )}

        <div className="space-y-4 mt-6">
          {isLoading ? (
            <div className="text-gray-400 text-sm py-4">
              Загрузка комментариев...
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col space-y-1.5"
              >
                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-bold text-slate-800">
                    {comment.author?.username || 'Пользователь'}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {comment.text}
                </p>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm text-center py-6">
              Комментариев пока нет. Станьте первым!
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default CommentComponent
