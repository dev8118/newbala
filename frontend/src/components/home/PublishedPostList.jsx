import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import clsx from 'clsx'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { useKeenSlider } from 'keen-slider/react'
import PostSlideCard from './PostSlideCard'

const PublishedPostList = ({ posts }) => {
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
      }
    },
    slides: {
      perView: 3,
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
    <Box sx={{ mb: 8 }}>
      <Typography
        variant='h1'
        sx={{
          textAlign: 'center',
          mx: 'auto',
          fontSize: {
            sm: '4rem',
            xs: '3.2rem'
          },
          mb: 2
        }}
      >
        إصدارات
      </Typography>
      <KeenSliderWrapper>
        <Box className='navigation-wrapper'>
          <Box ref={sliderRef} className='keen-slider' sx={{ py: 1 }}>
            {posts.map((post, idx) => (
              <PostSlideCard key={idx} post={post} />
            ))}
          </Box>
          {loaded && instanceRef.current && (
            <Box>
              <Icon
                icon='gg:arrow-left-o'
                color='#222829'
                className={clsx('arrow arrow-left', {
                  'arrow-disabled': currentSlide === 0
                })}
                onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
              />

              <Icon
                icon='gg:arrow-right-o'
                color='#222829'
                className={clsx('arrow arrow-right', {
                  'arrow-disabled': currentSlide === instanceRef.current.track.details.slides.length - 1
                })}
                onClick={e => e.stopPropagation() || instanceRef.current?.next()}
              />
            </Box>
          )}
        </Box>
      </KeenSliderWrapper>
    </Box>
  )
}

export default PublishedPostList
