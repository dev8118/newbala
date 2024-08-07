import { useState, useEffect, Fragment } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import PostCard from 'src/components/home/PostCard'
import Http from 'src/services/Http'
import { useRouter } from 'next/router'

const PostListByCategory = ({ category }) => {
  const [posts, setPosts] = useState([])
  const [more, setMore] = useState(0)
  const router = useRouter()
  useEffect(() => {
    fetchPostsByCategoryId(category)
  }, [category])

  const fetchPostsByCategoryId = async id => {
    const { data } = await Http.get('/home/posts', {
      params: {
        category: id
      }
    })

    setPosts(data)
  }

  const loadMore = () => {
    setMore(more + 6)
  }

  const goToCategory = () => {
    console.log(category)
    router.push(`/categories/${category}`)
  }

  return (
    <Grid container spacing={{ md: 10, sm: 6, xs: 3 }}>
      {posts.length > 0 ? (
        <Fragment>
          {posts.slice(0, 6 + more).map((post, idx) => (
            <Grid key={idx} md={4} item sm={6} xs={12}>
              <PostCard post={post}/>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant='contained' size='large' 
                sx={{ 
                  color: '#1426DE', 
                  borderRadius: '4px', 
                  backgroundColor: 'rgba(62, 77, 230, 0.07)', 
                  border: '1px solid #3E4DE6'
                }}
                onClick={loadMore}
                >
                تحميل المزيد
              </Button>
            </Box>
          </Grid>
        </Fragment>
      ) : (
        <Grid item xs={12}>
          <Box sx={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color='error'>لا يوجد مشاركة</Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default PostListByCategory
