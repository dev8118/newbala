import { useState, useEffect } from 'react'
import UserLayout from 'src/layouts/UserLayout'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Http from 'src/services/Http'
import PostGallery from 'src/components/posts/PostGallery'

const Post = () => {
  const router = useRouter()
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (router.query.id) {
      fetchPost(router.query.id)
    }
  }, [router.query])

  const fetchPost = async id => {
    const { data } = await Http.get(`/posts/${id}`)
    setPost(data)
  }

  return (
    <Box>
      {post ? (
        <Box>
          <Typography sx={{ fontSize: 20, mb: 5 }}>{post.category.name}</Typography>
          <Typography variant='h1' sx={{ fontSize: { sm: '3rem', xs: '2rem' }, textAlign: 'center', mb: 5 }}>
            {post.title}
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Box
              component='img'
              sx={{ width: { md: '80%', xs: '100%' }, border: theme => `1px solid ${theme.palette.divider}` }}
              src={`/uploads/posts/${post.image}`}
              alt={post.title}
            />
          </Box>
          <Box dangerouslySetInnerHTML={{ __html: post.content }} />

          {post.gallery.length > 0 && <PostGallery galleries={post.gallery} />}
        </Box>
      ) : (
        <Box sx={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h4' color='error'>
            لا توجد مشاركة متاحة
          </Typography>
        </Box>
      )}
    </Box>
  )
}

Post.getLayout = page => <UserLayout>{page}</UserLayout>
Post.guestGuard = true

export default Post
