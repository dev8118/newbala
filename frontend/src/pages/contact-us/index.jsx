import { useState } from 'react'
import UserLayout from 'src/layouts/UserLayout'
import { Grid, Box, Typography, FormControl, TextField, Button, CircularProgress } from '@mui/material'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Http from 'src/services/Http'

const API_KEY = 'AIzaSyBUHocQbkRKfQxD7ebzrgoogjEm2Z_wifw'

const ContactUs = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSendMessage = async () => {
    if (name.trim() === '') {
      toast.error('لطفا یک نام وارد کنید')
    } else if (email.trim() === '') {
      toast.error('لطفا یک آدرس ایمیل وارد کنید.')
    } else if (phone.trim() === '') {
      toast.error('لطفا یک شماره تلفن وارد کنید')
    } else {
      try {
        setLoading(true)

        const { data } = await Http.post('/contact', {
          name,
          email,
          phone,
          message
        })

        if (data.status) {
          setName('')
          setEmail('')
          setPhone('')
          setMessage('')
          router.push('/contact-us/confirmation')
        } else {
          toast.error(data.msg)
        }
      } catch (err) {
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Grid container spacing={{ md: 10, sm: 6, xs: 3 }} sx={{ mb: 4 }}>
      <Grid item md={6} xs={12}>
        <APIProvider apiKey={API_KEY}>
          <Box sx={{ height: { sm: 640, xs: 320 } }}>
            <Map
              style={{ width: '100%', height: '100%' }}
              defaultCenter={{ lat: 32.50935206575089, lng: 45.8169977963598 }}
              defaultZoom={15}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              <Marker position={{ lat: 32.50935206575089, lng: 45.8169977963598 }} />
            </Map>
          </Box>
        </APIProvider>
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography variant='h2' sx={{ fontSize: '1.5rem' }}>
          لا تتردد في إرسال استفسارك!
        </Typography>
        <Typography variant='h1' sx={{ fontSize: '3rem', mb: 5 }}>
          إتصل بنا
        </Typography>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Typography variant='h4'>الأسم</Typography>
          <TextField
            size='small'
            value={name}
            onChange={ev => setName(ev.target.value)}
            sx={{ '& .MuiInputBase-root': { borderRadius: '0px !important' } }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Typography variant='h4'>البريد الإلكتروني</Typography>
          <TextField
            size='small'
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            sx={{ '& .MuiInputBase-root': { borderRadius: '0px !important' } }}
          />
        </FormControl>
        <FormControl fullWidth dir='ltr' sx={{ mb: 5 }}>
          <Typography variant='h4' dir='rtl'>
            رقم الهاتف
          </Typography>
          <PhoneInput
            country='iq'
            value={phone}
            onChange={phone => setPhone(phone)}
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
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Typography variant='h4'>الرسالة</Typography>
          <TextField
            size='small'
            placeholder='يرجى ادخال نص الرسالة هنا...'
            value={message}
            onChange={ev => setMessage(ev.target.value)}
            multiline
            minRows={6}
            sx={{ '& .MuiInputBase-root': { borderRadius: '0px !important' } }}
          />
        </FormControl>
        <Button
          variant='contained'
          size='large'
          disabled={loading}
          startIcon={loading && <CircularProgress color='inherit' size={16} />}
          sx={{ borderRadius: 0 }}
          onClick={handleSendMessage}
        >
          ارسال
        </Button>
      </Grid>
    </Grid>
  )
}

ContactUs.getLayout = page => <UserLayout>{page}</UserLayout>
ContactUs.guestGuard = true

export default ContactUs
