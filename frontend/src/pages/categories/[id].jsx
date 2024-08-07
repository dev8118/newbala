import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserLayout from 'src/layouts/UserLayout'
import { Box, Typography, Grid, Button } from '@mui/material'
import Http from 'src/services/Http'
import PostCard from 'src/components/home/PostCard'
import HorizontalPostCard from 'src/components/categories/HorizontalPostCard'
import AdvertisementPostList from 'src/components/home/AdvertisementPostList'
import RequestForm from 'src/components/home/RequestForm'
import { emojiSequenceWithComponentsToString } from '@iconify/utils/lib/emoji/test/components'

const Category = () => {
  const router = useRouter()
  const [category, setCategory] = useState({})
  const [primaryPost, setPrimaryPost] = useState({})
  const [secondaryPosts, setSecondaryPosts] = useState([])
  const [posts, setPosts] = useState([])
  const [advertisementPosts, setAdvertisementPosts] = useState([])
  const [more, setMore] = useState(0)

  useEffect(() => {
    if (router.query.id) {
      init()
    }
  }, [router.query])

  const init = async () => {
    const { id } = router.query
    const { data } = await Http.get(`/categories/${id}`)
    setCategory(data.category)
    const home = await Http.get('/home')
    setAdvertisementPosts(home.data.advertisementPosts)
    setPrimaryPost(data.primaryPost)
    setSecondaryPosts(data.secondaryPosts)
    setPosts(data.posts)
  }

  const loadMore = () => {
    setMore(more + 6)
  }

  return (
    <Box container sx={{ backgroundColor: '#FFFFFF' }}>
      <Box sx={{ py: 10, px: { md: 20, sm: '5' } }}>
        <Typography variant='h1' sx={{ fontSize: { md: 50, sm: 40, xs: 35 } }}>
          {category.name}
        </Typography>
        <Grid container spacing={6} sx={{ mb: 6 }}>
          <Grid item xs={12}>
            {posts.slice(0, 3 + more).map((post, idx) => (
              <HorizontalPostCard key={idx} post={post} />
            ))}
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            variant='contained'
            size='large'
            sx={{
              color: '#1426DE',
              borderRadius: '4px',
              backgroundColor: 'rgba(62, 77, 230, 0.07)',
              border: '1px solid #3E4DE6'
            }}
            onClick={loadMore}
            disabled={more + 3 > posts?.length}
          >
            تحميل المزيد
          </Button>
        </Box>
      </Box>
      <RequestForm />
      {advertisementPosts?.length > 0 && <AdvertisementPostList posts={advertisementPosts} />}
    </Box>
  )
}

Category.getLayout = page => <UserLayout category={true}>{page}</UserLayout>
Category.guestGuard = true

export default Category
