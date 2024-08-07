import { useEffect } from 'react'
import { useRouter } from 'next/router'
import UserLayout from 'src/layouts/UserLayout'

const Index = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [])
}

Index.getLayout = page => <UserLayout>{page}</UserLayout>
Index.guestGuard = false
Index.authGuard = false

export default Index