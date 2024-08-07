import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from 'src/layouts/AdminLayout'

const Index = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/99-ew9c8/posts')
  }, [])
}

Index.getLayout = page => <AdminLayout>{page}</AdminLayout>
Index.guestGuard = false
Index.authGuard = false

export default Index
