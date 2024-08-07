import { useState, useEffect } from 'react'
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { useAuth } from 'src/hooks/useAuth'
import Http from 'src/services/Http'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AppBarContent = props => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [navItems, setNavItems] = useState([])
  const { hidden, settings, toggleNavVisibility } = props
  const open = Boolean(anchorEl)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    fetchHeaderNavigations()
  }, [])

  const handleClick = ev => {
    if (user) {
      toggleNavVisibility()
    } else {
      setAnchorEl(ev.currentTarget)
    }
  }

  const handleClose = (path = '') => {
    if (path) {
      router.push(path)
    }
    setAnchorEl(null)
  }

  const fetchHeaderNavigations = async () => {
    const { data } = await Http.get('/navigations/header')
    const navItems = data.map((item, idx) => {
      let path = ''
      if (item.type === 'static' && item.isExternal) {
        path = `https://${item.url}`
      } else if (item.type === 'static' && !item.isExternal) {
        path = `/${item.page}/`
      } else if (item.type === 'category') {
        path = `/categories/${item.category}/`
      }

      return {
        title: item.name,
        path: path,
        icon: 'pepicons-pop:circle'
      }
    })

    setNavItems(navItems)
  }

  return (
    <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <Box>
            <IconButton color='inherit' id='basic-button' sx={{ ml: -2.75 }} onClick={handleClick}>
              <Icon fontSize='1.5rem' icon='tabler:menu-2' />
            </IconButton>
            <Menu
              open={open}
              id='basic-menu'
              anchorEl={anchorEl}
              onClose={handleClose}
              MuiListProps={{ 'aria-labelledby': 'basic-button' }}
              sx={{ '& .MuiPaper-root': { borderRadius: 0, width: 'calc(100% - 50px)', mt: '1.5rem' } }}
            >
              {navItems.map((item, idx) => (
                <MenuItem
                  key={idx}
                  className={item.path === router.asPath ? 'active' : ''}
                  sx={{ 
                    fontFamily: 'IRANYekanFN !important', 
                    color: '#0E0E0E',
                    '&.active': { color: '#793cfb' } 
                  }}
                  onClick={() => handleClose(item.path)}
                >
                  {item.title}
                </MenuItem>
              ))}
              <Button
                onClick={() => handleClose('/contact-us')}
                endIcon={<Icon icon='mdi:envelope' />}
                sx={{ 
                  mx: 5, 
                  mb: 2, 
                  width: 'calc(100% - 2.5rem)', 
                  borderRadius: 0,
                  color: '#FFFFFF',
                  backgroundColor: '#432EEC',
                  border: '0.5px solid #080A2F' 
                }}
              >
                إتصل بنا
              </Button>
            </Menu>
          </Box>
        ) : null}
      </Box>
      <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Link href={user ? '/99-ew9c8' : '/home'}>
          <img src='/images/sign1.png' maxHeight='237' />
        </Link>
      </Box>
      {user && (
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          <UserDropdown settings={settings} />
        </Box>
      )}
    </Box>
  )
}

export default AppBarContent
