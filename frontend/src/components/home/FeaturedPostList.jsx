import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Button, Pagination, PaginationItem } from '@mui/material'
import Link from 'next/link'
import Icon from 'src/@core/components/icon'
import clsx from 'clsx'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { useKeenSlider } from 'keen-slider/react'
import moment from 'moment'

const FeaturedPostList = ({ posts }) => {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [post,setPost] = useState(null)
  const [index, setIndex] = useState(1)
  const [content, setContent] = useState('')

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    rtl: true,
    slides: {
      perView: 1,
      spacing: 20
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  const handleIndex = (e, idx) => {
    setIndex(idx)
  }
  
  const extractContent = htmlContent => {
    const span = document.createElement('span')
    span.innerHTML = htmlContent
    
    return span.innerText.split(' ').slice(0, 70) + '...'
  }

  useEffect(() => {
    setPost(posts[index - 1])
    setContent(extractContent(posts[index-1].content))
  }, [index, posts])

  if(post) {
    return (
      <Box sx={{ mb: { sm: 2, xs: 0 } }}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Box sx={{ 
                py: { sm: 10, xs: 5 }, 
                pb: { sm: 2, xs: 2}, 
                px: 5,
                backgroundColor: '#FFF'}}>
              <Link href={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
                <Typography
                  variant='h1'
                  sx={{
                    fontSize: {
                      sm: '3rem',
                      xs: '1.5rem'
                    },
                    fontFamily: '29LT Zarid Slab !important',
                    textDecoration: 'none',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: {
                      sm: 'inherit',
                      xs: 'center'
                    },
                    mb: 3
                  }}
                >
                  {post.title}
                </Typography>
              </Link>
              <Typography
                sx={{
                  fontFamily: 'Readex Pro !important',
                }}
              >
                {moment(post.createdAt).format('ll')}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'IRANYekanFN !important',
                  m: 0,
                  wordBreak: 'break-all',
                }}
              >
                { content }
              </Typography>
              <Box sx={{ 
                  textAlign: 'left', 
                  mt: { sm: 5, xs: 2 } 
              }}>
                <Button
                  variant='contained'
                  sx={{ borderRadius: 0, py: 4, px: 6, backgroundColor: '#432EEC' }}
                  component={Link}
                  href={`/posts/${post._id}`}
                >
                  اقرأ المزيد
                </Button>
              </Box>
              <Box
                sx={{
                  mt: 10,
                  borderBottom: '4px solid #432EEC',
                  pb: 3
                }}>
                <Pagination 
                  boundaryCount={10}
                  count={posts.length} 
                  variant="outlined" 
                  color="primary"
                  page={index} 
                  onChange={handleIndex}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} xs={12} sx={{ position: 'relative ', backgroundColor: '#FFF'}}>
            <Link href={`/posts/${post._id}`}>
              <Box
                component='img'
                src={`/uploads/posts/${post.image}`}
                alt={post.title}
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 2,
                  objectFit: 'cover',
                  bottom: 0,
                  position: {
                    sm: 'relative',
                    md: 'absolute',
                  },
                  height: '110% !important',
                  width: '100%',
                  zIndex: 9999,
                }}
              />
            </Link>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default FeaturedPostList
