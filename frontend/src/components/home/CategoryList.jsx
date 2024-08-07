import { useState, useEffect } from 'react'
import { Box, Tab, Typography, IconButton } from '@mui/material'
import PostListByCategory from 'src/components/home/PostListByCategory'
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

const CategoryList = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [index, setIndex] = useState(0)

  const next = () => setIndex(index + 1)
  const prev = () => setIndex(index - 1)

  useEffect(() => {
    if(categories.length > 0) {
      setActiveCategory(categories[index])
      console.log(categories.length)
    }
  }, [index, categories])

  if(activeCategory ) {
    console.log(activeCategory)
    return (
      <Box sx={{ mt: 15 }}>
        <Box sx={{mb: 10}}>
          <Typography variant='h1' 
            sx={{ 
              textAlign: 'center',
              fontSize: {
                sm: '4rem',
                xs: '2rem'
              },
              pb: '5px' 
            }}>{activeCategory.name}</Typography>
          <Typography variant='h4'
            sx={{ 
              textAlign: 'center',
              pb: 2,
              m: 'auto', 
              maxWidth: '630px',
            }}
          >{activeCategory.description}</Typography>
          <Box>
            <IconButton 
              sx={{
                  color: '#111112',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  borderRadius: '12px',
                  width: 50,
                  height: 50,
                  m: 1,
              }}
              disabled={index === 0}
              onClick={e => e.stopPropagation() || prev()}
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
              disabled={index === categories.length - 1}
              onClick={e => e.stopPropagation() || next()}
            >
              <WestIcon />
            </IconButton>
          </Box>
        </Box>
        <PostListByCategory category={activeCategory._id} />
      </Box>
    )
  }
}

export default CategoryList
