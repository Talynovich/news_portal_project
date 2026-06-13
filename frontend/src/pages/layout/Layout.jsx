import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Header from '../../component/header'
import { logout, setCredentials } from '../../store/auth/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useRefreshMutation } from '../../store/auth/authApi.js'

const Layout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [refresh, { isLoading }] = useRefreshMutation()
  const { isAuthenticated, refresh_token } = useSelector((store) => store.auth)

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
    <>
      <Header />
      <main>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
