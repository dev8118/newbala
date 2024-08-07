import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Http from 'src/services/Http'
import authConfig from 'src/configs/auth'
import { toast } from 'react-toastify'

const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  const router = useRouter()

  useEffect(() => {
    const initAuth = () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken && router.asPath.includes('/99-ew9c8')) {
        setLoading(true)
        Http
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.user })
          })
          .catch(() => {
            localStorage.removeItem('user')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('token')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/99-ew9c8/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const handleLogin = (params, errorCallback) => {
    Http
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        if (response.data.status) {
          params.rememberMe
            ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token)
            : null
          const returnUrl = router.query.returnUrl
          setUser({ ...response.data.user })
          params.rememberMe ? window.localStorage.setItem('user', JSON.stringify(response.data.user)) : null
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/99-ew9c8/posts'
          toast.success(response.data.msg);
          router.replace(redirectURL)
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/99-ew9c8/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
