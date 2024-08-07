import { useState, useEffect, Fragment } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import Http from 'src/services/Http'
import PostCard from '../home/PostCard'

const PostListByCategory = ({ category }) => {
  const [posts, setPosts] = useState([])

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

  return (
    <Grid container spacing={{ md: 10, sm: 6, xs: 3 }}>
      {posts.length > 0 ? (
        <Fragment>
          {posts.map((post, idx) => (
            <Grid key={idx} item md={4} sm={6} xs={12}>
              <PostCard post={post}/>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant='contained' size='large' sx={{ borderRadius: 0 }}>
                المزيد
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
