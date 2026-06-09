import { React, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../../store/auth/authApi.js'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../store/auth/authSlice.js'

const LoginPage = () => {
  const navigate = useNavigate()
  const [loginTrigger, { isLoading, error }] = useLoginMutation()
  const { isAuthenticated } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: { email: 'user@test.ru', password: 'user1234' },
  })

  const handleLogin = async (data) => {
    try {
      const result = await loginTrigger(data).unwrap()
      dispatch(setCredentials(result))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  if (isAuthenticated) return null
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
        <p className="text-center text-slate-500 mb-6 text-sm">
          Войдите в свой аккаунт для управления новостями
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Пароль
            </label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Ещё нет аккаунта?{' '}
          <Link
            to="/register"
            className="text-emerald-600 hover:underline font-medium"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
