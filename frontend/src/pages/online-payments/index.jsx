import UserLayout from 'src/layouts/UserLayout'
import { Box, Typography } from '@mui/material'

const OnlinePayments = () => {
  return (
    <Box sx={{ minHeight: 350 }}>
      <Typography variant='h1' sx={{ fontSize: 45, textAlign: 'center' }}>
        قريبا - الدفع الالكتروني
      </Typography>
    </Box>
  )
}

OnlinePayments.getLayout = page => <UserLayout>{page}</UserLayout>
OnlinePayments.guestGuard = true

export default OnlinePayments
