import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Box,
  FormControl,
  TextField,
  Typography,
  Button,
  CircularProgress,
  InputAdornment
} from '@mui/material'
import AdminLayout from 'src/layouts/AdminLayout'
import PhoneInput from 'react-phone-input-2'
import Http from 'src/services/Http'
import { toast } from 'react-toastify'
import 'react-phone-input-2/lib/style.css'

const Setting = () => {
  const [loading, setLoading] = useState(false)
  const [EMAIL, setEMAIL] = useState('')
  const [PHONE, setPHONE] = useState('')
  const [FACEBOOK_URL, setFACEBOOK_URL] = useState('')
  const [INSTAGRAM_URL, setINSTAGRAM_URL] = useState('')
  const [TELEGRAM_URL, setTELEGRAM_URL] = useState('')
  const [SENDGRID_API_KEY, setSENDGRID_API_KEY] = useState('')
  const [SENDGRID_USER, setSENDGRID_USER] = useState('')
  const [TWILIO_API_KEY, setTWILIO_API_KEY] = useState('')
  const [TWILIO_PHONE, setTWILIO_PHONE] = useState('')
  const [TWILIO_SECRET_KEY, setTWILIO_SECRET_KEY] = useState('')

  useEffect(() => {
    fetchSetting()
  }, [])

  const fetchSetting = async () => {
    const { data } = await Http.get('/admin/setting')
    if(data) {
      setEMAIL(data.EMAIL)
      setPHONE(data.PHONE)
      setFACEBOOK_URL(data.FACEBOOK_URL)
      setINSTAGRAM_URL(data.INSTAGRAM_URL)
      setTELEGRAM_URL(data.TELEGRAM_URL)
      setSENDGRID_API_KEY(data.SENDGRID_API_KEY)
      setSENDGRID_USER(data.SENDGRID_USER)
      setTWILIO_API_KEY(data.TWILIO_API_KEY)
      setTWILIO_PHONE(data.TWILIO_PHONE)
      setTWILIO_SECRET_KEY(data.TWILIO_SECRET_KEY)
    }
  }

  const handleUpdateSetting = async () => {
    try {
      setLoading(true)

      const { data } = await Http.post('/admin/setting', {
        EMAIL,
        PHONE,
        FACEBOOK_URL,
        INSTAGRAM_URL,
        TELEGRAM_URL,
        SENDGRID_API_KEY,
        SENDGRID_USER,
        TWILIO_API_KEY,
        TWILIO_PHONE,
        TWILIO_SECRET_KEY
      })

      if (data.status) {
        toast.success(data.msg)
      } else {
        toast.error(data.msg)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }

  return (
    <Card>
      <CardHeader title={<Typography variant='h4'>الاعدادات</Typography>} />
      <Divider />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label='البريد الإلكتروني'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                value={EMAIL}
                onChange={ev => setEMAIL(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth dir='ltr'>
              <PhoneInput
                country='gb'
                value={PHONE}
                onChange={phone => setPHONE(phone)}
                inputStyle={{
                  width: '100%',
                  borderRadius: 0,
                  paddingTop: 5,
                  paddingBottom: 5,
                  height: 40,
                  backgroundColor: 'transparent'
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FormControl fullWidth dir='ltr'>
              <TextField
                label='رابط Facebook'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>https://</InputAdornment>
                }}
                value={FACEBOOK_URL}
                onChange={ev => setFACEBOOK_URL(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FormControl fullWidth dir='ltr'>
              <TextField
                label='رابط Instagram'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>https://</InputAdornment>
                }}
                value={INSTAGRAM_URL}
                onChange={ev => setINSTAGRAM_URL(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FormControl fullWidth dir='ltr'>
              <TextField
                label='رابط Telegram'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>https://</InputAdornment>
                }}
                value={TELEGRAM_URL}
                onChange={ev => setTELEGRAM_URL(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label='Sendgrid API key'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                value={SENDGRID_API_KEY}
                onChange={ev => setSENDGRID_API_KEY(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label='Sendgrid user'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                value={SENDGRID_USER}
                onChange={ev => setSENDGRID_USER(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label='Twilio API key'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                value={TWILIO_API_KEY}
                onChange={ev => setTWILIO_API_KEY(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label='Twilio secret key'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                value={TWILIO_SECRET_KEY}
                onChange={ev => setTWILIO_SECRET_KEY(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label='Twilio phone'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                value={TWILIO_PHONE}
                onChange={ev => setTWILIO_PHONE(ev.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
          <Button
            variant='contained'
            disabled={loading}
            startIcon={loading && <CircularProgress color='inherit' size={16} />}
            onClick={handleUpdateSetting}
          >
            تحديث
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

Setting.getLayout = page => <AdminLayout>{page}</AdminLayout>
Setting.authGuard = true

export default Setting
