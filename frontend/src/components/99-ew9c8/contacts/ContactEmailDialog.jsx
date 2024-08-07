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
import { toast } from 'react-toastify'
import Http from 'src/services/Http'

const ContactEmailDialog = props => {
  const { open, contact, onClose } = props
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (open) {
      setEmail(contact.email)
      setContent('')
    }
  }, [open])

  const handleSendEmail = async () => {
    if (email.trim() === '') {
      toast.error('الرجاء إدخال عنوان البريد الإلكتروني.')
    } else {
      try {
        setLoading(true)

        const { data } = await Http.post(`/admin/contacts/${contact._id}/send-email`, {
          email,
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
    <Dialog fullWidth maxWidth='md' open={open} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogTitle sx={{ p: 4 }}>
        <Typography variant='h5' component='span'>
          ارسل ايميل
        </Typography>
        <IconButton sx={{ position: 'absolute', top: 9, right: 9 }} onClick={onClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={5}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth sx={{ mb: 5 }}>
              <TextField label='البريد الالكتروني' size='small' value={email} onChange={ev => setEmail(ev.target.value)} />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label='المحتوى'
                size='small'
                multiline
                minRows={15}
                value={content}
                onChange={ev => setContent(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box
              sx={{
                border: theme => `1px solid ${theme.palette.divider}`,
                height: '100%',
                borderRadius: 1,
                p: 4
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box component='img' src='/images/logo-email.png' sx={{ height: 80 }} />
              </Box>
              <Typography variant='h5' sx={{ mb: 4 }}>
                السلام عليكم
              </Typography>
              <Typography sx={{ mb: 3 }}>عزيزي المرسل {contact.name}</Typography>
              <Typography sx={{ whiteSpace: 'pre', mb: 3 }}>{content}</Typography>
              <Typography>شكرا لتواصلكم</Typography>
              <Typography sx={{ mb: 3 }}>قسم الدعم</Typography>
              <Typography>مديرية بلدية الكوت</Typography>
              <Typography>محافظة واسط</Typography>
              <Typography>جمهورية العراق</Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: '1rem !important' }}>
        <Button variant='contained' color='primary' disabled={loading} onClick={handleSendEmail}>
          {loading && <CircularProgress color='secondary' size={18} sx={{ mr: 2 }} />} إرسال الآن
        </Button>
        <Button variant='contained' color='error' onClick={onClose}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ContactEmailDialog
