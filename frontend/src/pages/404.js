import Link from 'next/link'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Error404 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
        <BoxWrapper>
          <Typography variant='h3' sx={{ mb: 1.5 }}>خطأ 404</Typography>
          <Typography variant='h1' sx={{ mb: 6, color: 'text.secondary' }}>
            عذرًا، هذه الصفحة غير موجودة أو تم نقلها
          </Typography>
          <Button href='/' component={Link} variant='contained'>
            الرجوع الى الصفحة السابقة
          </Button>
        </BoxWrapper>
      </Box>
    </Box>
  )
}
Error404.getLayout = page => <BlankLayout>{page}</BlankLayout>
Error404.guestGuard = true

export default Error404
