import { useState, useEffect } from 'react'
import AdminLayout from 'src/layouts/AdminLayout'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  Typography,
  FormControl,
  TextField,
  CircularProgress,
  Button
} from '@mui/material'
import PhoneInput from 'react-phone-input-2'
import { useAuth } from 'src/hooks/useAuth'
import Http from 'src/services/Http'
import { toast } from 'react-toastify'
import 'react-phone-input-2/lib/style.css'

const Profile = () => {
  const [profileLoading, setProfileLoading] = useState(false)
  const { user } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  useEffect(() => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setPhone(user.phone)
    setAddress(user.address)
  }, [])

  const handleUpdateProfile = async () => {
    if (firstName.trim() === '') {
      toast.error('يرجى ادخال الاسم')
    } else if (lastName.trim() === '') {
      toast.error('يرجى ادخال اللقب')
    } else if (email.trim() === '') {
      toast.error('.يرجى ادخال البريد الالكتروني')
    } else if (phone.trim() === '') {
      toast.error('يرجى ادخال رقم الهاتف')
    } else {
      try {
        setProfileLoading(true)

        const { data } = await Http.put(`/admin/profile/update-profile/${user._id}`, {
          firstName,
          lastName,
          email,
          phone,
          address
        })
        if (data.status) {
          toast.success(data.msg)
        } else {
          toast.error(data.msg)
        }
      } catch (err) {
        toast.error(err.message)
      } finally {
        setProfileLoading(false)
      }
    }
  }

  const handleUpdatePassword = async () => {
    if (currentPassword.trim() === '') {
        toast.error('الرجاء إدخال كلمة المرور الحالية.')
    } else if (password.trim() === '') {
        toast.error('الرجاء إدخال كلمة مرور جديدة.')
    } else if (password.trim() !== passwordConfirmation.trim()) {
        toast.error('كلمة المرور غير متطابقة.')
    } else {
      try {
        setPasswordLoading(true)

        const { data } = await Http.put(`/admin/profile/update-password/${user._id}`, {
          currentPassword,
          password
        })
        if (data.status) {
          toast.success(data.msg)
          setCurrentPassword('')
          setPassword('')
          setPasswordConfirmation('')
        } else {
          toast.error(data.msg)
        }
      } catch (err) {
        toast.error(err.message)
      } finally {
        setPasswordLoading(false)
      }
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item sm={6} xs={12}>
        <Card>
          <CardHeader title={<Typography variant='h4'>الملف الشخصي</Typography>} />
          <Divider />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    size='small'
                    label='الاسم'
                    value={firstName}
                    onChange={ev => setFirstName(ev.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    size='small'
                    label='اللقب'
                    value={lastName}
                    onChange={ev => setLastName(ev.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    size='small'
                    type='emal'
                    label='البريد الإلكتروني'
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth dir='ltr'>
                  <PhoneInput
                    country='gb'
                    value={phone}
                    onChange={phone => setPhone(phone)}
                    inputStyle={{ width: '100%', height: 38.5 }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    size='small'
                    label='العنوان'
                    value={address}
                    onChange={ev => setAddress(ev.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant='contained'
                    disabled={profileLoading}
                    startIcon={profileLoading && <CircularProgress color='inherit' size={16} />}
                    onClick={handleUpdateProfile}
                  >
                    تحديث
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Card>
          <CardHeader title={<Typography variant='h4'>تغيير كلمة المرور</Typography>} />
          <Divider />
          <CardContent>
            <FormControl fullWidth sx={{ mb: 5 }}>
              <TextField
                type='password'
                autoComplete='new-password'
                size='small'
                label='كلمة المرور الحالية'
                value={currentPassword}
                onChange={ev => setCurrentPassword(ev.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 5 }}>
              <TextField
                type='password'
                autoComplete='new-password'
                size='small'
                label='كلمة المرور'
                value={password}
                onChange={ev => setPassword(ev.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 5 }}>
              <TextField
                type='password'
                autoComplete='new-password'
                size='small'
                label='تأكيد كلمة المرور'
                value={passwordConfirmation}
                onChange={ev => setPasswordConfirmation(ev.target.value)}
              />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant='contained'
                disabled={passwordLoading}
                startIcon={passwordLoading && <CircularProgress color='inherit' size={16} />}
                onClick={handleUpdatePassword}
              >
                تحديث
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

Profile.getLayout = page => <AdminLayout>{page}</AdminLayout>
Profile.authGuard = true

export default Profile
