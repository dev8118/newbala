import { useState, useEffect } from 'react'
import { Box, Grid, Typography, Card, Divider } from '@mui/material'
import Link from 'next/link'
import Http from 'src/services/Http'

const FooterContent = () => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [telegramUrl, setTelegramUrl] = useState('')
  const [navigations, setNavigations] = useState([])

  useEffect(() => {
    fetchFooterNavigations()
  }, [])

  const fetchFooterNavigations = async () => {
    const { data } = await Http.get('/navigations/footer')
    setEmail(data.email)
    setPhone(data.phone)
    setFacebookUrl(data.facebookUrl)
    setInstagramUrl(data.instagramUrl)
    setTelegramUrl(data.telegramUrl)
    setNavigations(data.navigations)
  }

  const getLink = navigation => {
    if (navigation.type === 'static' && navigation.isExternal) {
      return `https://${navigation.url}/`
    } else if (navigation.type === 'static' && !navigation.isExternal) {
      return `/${navigation.page}/`
    } else if (navigation.type === 'category') {
      return `/categories/${navigation.category}/`
    } else {
      return '#'
    }
  }

  return (
    <Box sx={{ py: 5 }}>
      <Grid container spacing={6}>
        <Grid item md={12} sm={12} xs={12}>
          <Divider />
          <Box
            sx={{
              mb: 10,
              textAlign: {
                sm: 'inherit',
                xs: 'center'
              }
            }}
          >
            <Link href='/home'>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  mb: 20,
                }}
              >
                <Box component='img' src='/images/sign.png' sx={{ maxHeight: 272 }} alt='logo' />
                <Box component='img' src='/images/sign1.png' sx={{ 
                  height: 85,
                  position: 'absolute',
                  bottom: -50 
                }} alt='logo' />
              </Box>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              mb: 10,
            }}
          >
            {
              navigations.map((navigation) => {
                console.log(navigation.length)
                return (
                  <Typography
                    key={navigation.name}
                    component={Link}
                    href={getLink(navigation)}
                    sx={{
                      textDecoration: 'none', 
                      border: '0.5px solid #080A2F',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      fontSize: 17,
                      fontFamily: 'League Spartan !important',
                      py: 2,
                      px: 5,
                      m: 2, 
                      color: '#0E0E0E'
                    }}
                  >{navigation.name}
                  </Typography>
                )
              })
            }
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Link href={`https://${facebookUrl}`} target='_blank'>
                <Box component='img' src='/images/FacebookOutline.svg' sx={{ width: 36 }} />
              </Link>
              <Link href={`https://${instagramUrl}`} target='_blank'>
                <Box component='img' src='/images/TwitterOutline.svg' sx={{ width: 35 }} />
              </Link>
              <Link href={`https://${telegramUrl}`} target='_blank'>
                <Box component='img' src='/images/TelegramOutline.svg' sx={{ width: 36 }} />
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FooterContent
