import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (auth.user === null && !window.localStorage.getItem('user')) {
      if (router.asPath !== '/99-ew9c8') {
        router.replace({
          pathname: '/99-ew9c8/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/99-ew9c8/login')
      }
    }
  }, [router])
  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
