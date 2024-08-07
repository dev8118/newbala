import { useState, useEffect } from 'react'
import { Box, Typography, Tab } from '@mui/material'
import UserLayout from 'src/layouts/UserLayout'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import PostListByCategory from 'src/components/section/PostListByCategory'
import Http from 'src/services/Http'

const Section = () => {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const { data } = await Http.get('/home/categories')
    setCategories(data)
    if (data.length) {
      setActiveCategory(data[0]._id)
    }
  }

  return (
    <Box>
      <Typography variant='h1' sx={{ fontSize: '4rem', textAlign: 'center' }}>
        نشاطات
      </Typography>
      <Typography variant='h2' sx={{ textAlign: 'center', mb: 6 }}>
        استكشف وشارك معنا في تنمية مجتمعنا وبناء مستقبل أفضل للجميع
      </Typography>
      <TabContext value={activeCategory}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-flexContainer': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          }}
          onChange={(ev, activeCategory) => setActiveCategory(activeCategory)}
        >
          {categories.map((category, idx) => (
            <Tab
              key={idx}
              label={category.name}
              value={category._id}
              sx={{
                p: 3,
                fontSize: 18,
                fontFamily: 'Readexpro, sans-serif !important',
                '&.Mui-selected': { fontWeight: 'bold' }
              }}
            />
          ))}
        </TabList>
        {categories.map((category, idx) => (
          <TabPanel key={idx} value={category._id}>
            <PostListByCategory category={category._id} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}

Section.getLayout = page => <UserLayout>{page}</UserLayout>
Section.guestGuard = true

export default Section
