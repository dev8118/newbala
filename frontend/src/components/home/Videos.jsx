import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Button, Card, IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import WestIcon from '@mui/icons-material/West'
import EastIcon from '@mui/icons-material/East'
import Link from 'next/link'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { useKeenSlider } from 'keen-slider/react'
import ReactPlayer from 'react-player'
import moment from 'moment'

const Videos = ({ posts }) => {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  console.log(posts)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    rtl: true,
    breakpoints: {
      '(min-width: 30px)': {
        slides: { perView: 1, spacing: 5 }
      },
      '(min-width: 560px)': {
        slides: { perView: 2, spacing: 20 }
      },
      '(min-width: 768px)': {
        slides: { perView: 3, spacing: 20 }
      },
      '(min-width: 968px)': {
        slides: {
          perView: 4,
          spacing: 20
        }
      }
    },
    slides: {
      origin: 'auto',
      perView: 'auto',
      spacing: 10
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  useEffect(() => {
    console.log(loaded,  instanceRef.current.track.details?.slides?.length)
  }, [loaded])

  return (
    <Box sx={{ mt: 15 }}>
      {loaded && instanceRef.current.track.details && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <IconButton
            sx={{
              color: '#111112',
              border: '1px solid #111112',
              borderRadius: '100%',
              width: 40,
              height: 40,
              m: 1
            }}
          >
            <PlayArrowIcon />
          </IconButton>
          <Typography
            sx={{
              fontFamily: '29LT Zarid Slab',
              fontSize: {
                sm: '3rem',
                xs: '1.5rem'
              },
              m: 1,
              fontWeight: '900'
            }}
          >
            تطوير البنية التحتية
          </Typography>
          <IconButton
            sx={{
              color: '#111112',
              border: '1px solid rgba(0, 0, 0, 0.15)',
              borderRadius: '12px',
              width: 50,
              height: 50,
              m: 1
            }}
            disabled={currentSlide === instanceRef.current.track.details?.slides?.length - 1}
            onClick={e => e.stopPropagation() || instanceRef.current?.next()}
          >
            <EastIcon />
          </IconButton>
          <IconButton
            sx={{
              color: '#111112',
              border: '1px solid rgba(0, 0, 0, 0.15)',
              borderRadius: '12px',
              width: '50px',
              height: '50px',
              m: 1
            }}
            disabled={currentSlide === 0}
            onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
          >
            <WestIcon />
          </IconButton>
        </Box>
      )}
      <KeenSliderWrapper>
        <Box className='navigation-wrapper'>
          <Box ref={sliderRef} className='keen-slider'>
            {posts.map((post, idx) => {
              return (
                <Box
                  key={post.title}
                  className='keen-slider__slide'
                  sx={{
                    maxWidth: '260px',
                    mt: {
                      md: 10,
                      xs: 5
                    }
                  }}
                >
                  <Box>
                    <Box sx={{ height: '100px' }}>
                    <Typography
                      sx={{
                        fontFamily: 'IRANYekanFN',
                        fontWeight: '700',
                        mb: 1,
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Readex Pro',
                        mb: 3
                      }}
                    >
                      {moment(post.createdAt).format('ll')}
                    </Typography>
                    </Box>
                    <Card
                      sx={{
                        border: '1px solid #8D8D8D',
                        borderRadius: '10px',
                        backgroundColor: '#D9D9D9',
                        position: 'relative'
                      }}
                    >
                      <ReactPlayer url={post.description} width='100%' />
                      {/* <IconButton
                        sx={{
                          color: '#111112',
                          border: '1px solid #111112',
                          borderRadius: '100%',
                          width: 54,
                          height: 54,
                          position: 'absolute',
                          bottom: 25,
                          left: 17,
                          backgroundColor: '#F5F2F0'
                        }}
                      >
                        <PlayArrowIcon />
                      </IconButton> */}
                    </Card>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </KeenSliderWrapper>
    </Box>
  )
}

export default Videos
