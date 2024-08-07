import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'
import Http from 'src/services/Http'

const NavLink = styled(Button)(({ theme }) => ({
  paddingTop: '1rem',
  paddingBottom: '1rem',
  borderRadius: 0,
  fontFamily: 'Ltzaridslab, sans-serif !important',
  fontSize: 20,
  '&.active': {
    color: '#793cfb'
  },
  '&:hover': {
    color: '#793cfb'
  }
}))

const AppBarContent = props => {
  const router = useRouter();
  const [navigations, setNavigations] = useState([])

  useEffect(() => {
    fetchNavigations()
  }, [])

  const fetchNavigations = async () => {
    const { data } = await Http.get('/navigations/header')

    setNavigations(data)
  }

  const getLink = navigation => {
    console.log(navigation)
    if (navigation.type === 'static' && navigation.isExternal) {
      return `https://${navigation.url}/`
    } else if (navigation.type === 'static' && !navigation.isExternal) {
      return `/${navigation.page}/`
    } else if (navigation.type === 'category') {
      return `/categories/${navigation.category}/`
    }
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'stretch', 
        justifyContent: 'stretch'
      }}
    >
      {navigations.map((navigation, idx) => (
        <NavLink 
          component={Link} 
          key={idx} variant='link' 
          href={getLink(navigation)} 
          sx={{
            color: '#0E0E0E !important',
            backgroundColor: '#FFFFFF !important',
            m: 1,
            fontSize: 14, 
            borderLeft: getLink(navigation) === router.asPath ? '6px solid #432EEC' : '0px',
            p: 1,
            px: 2,
          }}
        >
          {navigation.name}
        </NavLink>
      ))}
      <NavLink 
        component={Link} 
        variant='outlined' 
        href="/contact-us" 
        startIcon={<Icon icon='tabler:mail' />} 
        sx={{ 
          py: 3.6,
          color: '#FFFFFF',
          fontFamily: 'IRANYekanFN !important',
          backgroundColor: '#432EEC',
          border: '0.5px solid #080A2F',
          ml: 5, 
        }}>
        إتصل بنا
      </NavLink>
    </Box>
  )
}

export default AppBarContent
