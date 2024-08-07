import { useState } from 'react'
import { Box, Typography, Button, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import clsx from 'clsx'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { useKeenSlider } from 'keen-slider/react'
import PostSlideCard from './PostSlideCard'
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

const AdvertisementPostList = ({ posts }) => {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

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
      perView: 4,
      spacing: 20
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <Box sx={{ mt: 10 }}>
      <Typography
        variant='h1'
        sx={{
          fontSize: {
            sm: '4rem',
            xs: '3.2rem'
          }
        }}
      >
        إعلانات
      </Typography>
      <Box 
        sx={{ 
          px: { sm: '60px' },
          position: 'relative' 
      }} >
        <KeenSliderWrapper>
          <Box className='navigation-wrapper'>
            <Box ref={sliderRef} className='keen-slider' sx={{ py: 1 }}>
              {posts.map((post, idx) => (
                <PostSlideCard key={idx} post={post} />
              ))}
            </Box>
          </Box>
        </KeenSliderWrapper>
        {loaded && instanceRef.current && (
          <Box
            sx={{ 
              position: 'absolute',
              width: '100%',
              display: 'flex',
              left: 0,
              top: {
                sm: '50%',
                xs: '100%'
              },
              justifyContent: 'space-between'
            }}
          >
            <IconButton 
              sx={{
                  color: '#111112',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  borderRadius: '12px',
                  width: 50,
                  height: 50,
                  m: 1,
              }}
              disabled={currentSlide === 0}
              onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
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
                  m: 1,
              }}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
              onClick={e => e.stopPropagation() || instanceRef.current?.next()}
            >
              <WestIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AdvertisementPostList
