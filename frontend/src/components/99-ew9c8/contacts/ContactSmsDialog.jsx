import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Box
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import PhoneInput from 'react-phone-input-2'
import { toast } from 'react-toastify'
import Http from 'src/services/Http'
import 'react-phone-input-2/lib/material.css'

const ContactSmsDialog = props => {
  const { open, contact, onClose } = props
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (open) {
      setPhone(contact.phone)
      setContent('')
    }
  }, [open])

  const handleSendSms = async () => {
    if (phone.trim() === '') {
      toast.error('الرجاء ادخال البريد الالكتروني للمستلم')
    } else {
      try {
        setLoading(true)

        const { data } = await Http.post(`/admin/contacts/${contact._id}/send-sms`, {
          phone,
          content
        })

        if (data.status) {
          toast.success(data.msg)
          onClose()
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
    <Dialog fullWidth maxWidth='md' open={open} sx={{ '& .MuiDialog-paper': { maxWidth: 700, overflow: 'visible' } }}>
      <DialogTitle sx={{ p: 4 }}>
        <Typography variant='h5' component='span'>
          ارسل رسالة قصيرة SMS
        </Typography>
        <IconButton sx={{ position: 'absolute', top: 9, right: 9 }} onClick={onClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={5}>
          <Grid item md={7} xs={12}>
            <FormControl fullWidth dir='ltr' sx={{ mb: 5 }}>
              <PhoneInput
                specialLabel=''
                country='gb'
                value={phone}
                onChange={phone => setPhone(phone)}
                inputStyle={{ width: '100%', height: 46 }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label='الرسالة'
                size='small'
                multiline
                minRows={17}
                value={content}
                onChange={ev => setContent(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={5} xs={12}>
            <Box
              sx={{
                border: theme => `1px solid ${theme.palette.divider}`,
                height: '100%',
                borderRadius: 3,
                background: theme => theme.palette.success.dark,
                p: 4,
                color: theme => theme.palette.text.primary
              }}
            >
              <Typography sx={{ mb: 5, color: '#fafafa' }}>السلام عليكم</Typography>
              <Typography sx={{ mb: 5, color: '#fafafa' }}>عزيزي المرسل {contact.name}</Typography>
              <Typography sx={{ whiteSpace: 'pre', color: '#fafafa', mb: 5 }}>{content}</Typography>
              <Typography sx={{ color: '#fafafa' }}>شكرا لتواصلكم</Typography>
              <Typography sx={{ color: '#fafafa', mb: 5 }}>قسم الدعم</Typography>
              <Typography sx={{ color: '#fafafa' }}>مديرية بلدية الكوت</Typography>
              <Typography sx={{ color: '#fafafa' }}>محافظة واسط</Typography>
              <Typography sx={{ color: '#fafafa' }}>جمهورية العراق</Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: '1rem !important' }}>
        <Button variant='contained' color='primary' disabled={loading} onClick={handleSendSms}>
          {loading && <CircularProgress color='secondary' size={18} sx={{ mr: 2 }} />} ارسال
        </Button>
        <Button variant='contained' color='error' onClick={onClose}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ContactSmsDialog
