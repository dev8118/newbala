// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const AppBarContent = props => {
  const { appBarContent: userAppBarContent, appBarBranding: userAppBarBranding } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {userAppBarBranding ? (
        userAppBarBranding(props)
      ) : (
        <LinkStyled href='/' >
          <Box component='img' src='/images/logo.png' 
            sx={{ 
              maxHeight: 237,
              display: {
                lg: 'block',
                md: 'none'
              }
            }} />
          <Box sx={{ position: 'relative' }}>
            <Box component='img' src='/images/sign1.png' 
              sx={{ 
                maxHeight: 75, position: 'absolute',
                top: '60px',
                rigth: '20px' 
              }} 
            />
            <Box component='img' src='/images/sign.png' sx={{ maxHeight: 106 }} />
          </Box>
        </LinkStyled>
      )}
      {userAppBarContent ? userAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
