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

const OrderDetailsDialog = props => {
  const { open, request, onClose, fullScreen, onSuccess, openImage } = props
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState('')

  useEffect(() => {
    if (open) {
      setDetails(request.details ? request.details : '')
    }
  }, [open, request])

  const handleDetails = async () => {
    if (details.trim() === '') {
      toast.error('الرجاء ادخال البريد الالكتروني للمستلم')
    } else {
      try {
        setLoading(true)
        
        console.log(details)
        const { data } = await Http.put(`/admin/form/details/${request._id}`, {
          details
        })

        console.log(data)
        if (data.status) {
          toast.success(data.msg)
         onSuccess()
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
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      maxWidth='lg'
      open={open}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle sx={{ p: 4 }} dividers>
        <Grid>
          <Grid
            item
            md={12}
            sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: { sm: 'nowrap', xs: 'wrap' } }}
          >
            <Typography
              variant='h1'
              sx={{
                fontFamily: 'Pinar !important',
                color: '#313131',
                fontWeight: 'bold',
                fontSize: {
                  sm: '2rem',
                  xs: '1rem'
                }
              }}
            >
              مراجعة وتأكيد الطلب
            </Typography>
            <Button
              variant='contained'
              sx={{ color: '#212123', backgroundColor: '#F8F8F8', border: '1px solid #BCBCBC' }}
              onClick={onClose}
            >
              إغلاق
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Grid sx={{ mt: 5, p: 5 }}>
          <Grid container spacing={5}>
            <Grid container xs={12}>
              <Grid item md={7} xs={12} sx={{ pr: { md: 10, xs: 0 } }}>
                <Grid
                  container
                  sx={{
                    backgroundColor: '#F7F7F7',
                    border: '1px solid #B8B8B8',
                    borderRadius: '5px',
                    p: 5,
                    my: 5
                  }}
                >
                  <Grid item md={6} sx={{ color: '#1C3E57' }}>
                    <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>نوع الطلب</Typography>
                    <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>الأسم الثلاثي واللقب</Typography>
                    <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>القضاء</Typography>
                    <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>المنطقة</Typography>
                    <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>رقم الهاتف</Typography>
                    <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>التحصيل الدراسي</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography sx={{ color: '#1C3E57', p: 2 }}>{request?.requestType}</Typography>
                    <Typography sx={{ color: '#1C3E57', p: 2 }}>{request?.name}</Typography>
                    <Typography sx={{ color: '#1C3E57', p: 2 }}>{request?.judiciary}</Typography>
                    <Typography sx={{ color: '#1C3E57', p: 2 }}>{request?.region}</Typography>
                    <Typography sx={{ color: '#1C3E57', p: 2 }}>{request?.phone}</Typography>
                    <Typography sx={{ color: '#1C3E57', p: 2 }}>{request?.academicType}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={5} xs={12}>
                <Grid container xs={12} sx={{ display: 'flex' }}>
                  <Typography sx={{ color: '#C9563A' }}>*</Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DanaFaNum !important',
                      fontSize: 24,
                      color: '#1C3E57'
                    }}
                  >
                    الملفات المرفقة
                  </Typography>
                </Grid>
                <Grid container xs={12} sx={{ display: 'flex' }}>
                  {request?.image && (
                    <Box
                      component='img'
                      sx={{
                        maxWidth: '200px',
                        display: 'flex',
                        borderRadius: 1,
                        mt: 2
                      }}
                      src={`/uploads/posts/${request.image}`}
                      onClick={() => openImage(`/uploads/posts/${request.image}`)}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {request?.files && request?.files.length > 0 && (
                <Box sx={{ display: 'flex', gap: 3, mt: 5, flexWrap: 'wrap' }}>
                  {request.files.map((gallery, idx) => (
                    <Box key={idx} sx={{ position: 'relative', border: '1px solid #ccc', borderRadius: 1 }}>
                      <Box
                        component='img'
                        src={`/uploads/posts/${gallery}`}
                        alt='gallery'
                        sx={{ height: 100, width: 100, borderRadius: 1, objectFit: 'cover' }}
                        onClick={() => openImage(`/uploads/posts/${gallery}`)}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item md={7} xs={12} sx={{ pl: '0 !important' }}>
              <FormControl fullWidth>
                <TextField
                  label='التفاصيل'
                  size='small'
                  multiline
                  minRows={17}
                  value={details}
                  onChange={ev => setDetails(ev.target.value)}
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
                <Typography sx={{ mb: 5, color: '#fafafa' }}>{request?.content}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: '1rem !important' }}>
        <Button variant='contained' color='primary' disabled={loading} onClick={handleDetails}>
          {loading && <CircularProgress color='secondary' size={18} sx={{ mr: 2 }} />} ارسال
        </Button>
        <Button variant='contained' color='error' onClick={onClose}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderDetailsDialog
