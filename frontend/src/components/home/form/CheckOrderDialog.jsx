import React, { useState, useEffect, useRef } from 'react'
import Checkbox from '@mui/material/Checkbox'
import moment from 'moment'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Button,
  CircularProgress
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import Http from 'src/services/Http'

const CheckOrderDialog = props => {
  const { open, onSuccess, onClose, fullScreen, onNewOrder } = props
  const [loading, setLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState('1722765097640')
  const [request, setRequest] = useState(null)
  const [status, setStatus] = useState('')
  const [step, setStep] = useState(1)
  useEffect(() => {
    setStep(1)
    setStatus('')
    setRequest(null)
    setLoading(false)
  }, [open])

  const handleQuery = async () => {
    if (orderNumber.trim() == '') {
      toast.error('الرجاء اختيار صورة.')
    } else {
      try {
        setLoading(true)
        const { data } = await Http.get(`/form/order/${orderNumber}`)
        if (data.status) {
          toast.success(data.msg)
          onSuccess()
          setStatus(data.request.status)
          setRequest(data.request)
          setStep(2)
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

  const onAnotherQuery = () => {
    setStep(1)
    setStatus('')
    setRequest(null)
    setLoading(false)
  }

  return (
    <Dialog fullWidth fullScreen={fullScreen} maxWidth='sm' open={open} onClose={onClose}>
      <DialogContent sx={{ p: 5 }}>
        <Grid container sx={{ py: 5, borderBottom: step == 1 ? '1px solid #F2F2F2' : '' }}>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: { sm: 'nowrap', xs: 'wrap' } }}
          >
            <Typography
              variant='h1'
              sx={{
                fontFamily: 'Pinar !important',
                color: '#313131',
                fontWeight: 'bold',
                fontSize: {
                  sm: '2.5rem',
                  xs: '1.5rem'
                }
              }}
            >
              متابعة الطلب
            </Typography>
            <Button
              variant='contained'
              sx={{ color: '#212123', backgroundColor: '#F8F8F8', border: '1px, solid #BCBCBC' }}
              onClick={onClose}
            >
              إغلاق
            </Button>
          </Grid>
        </Grid>
        {step == 1 && (
          <Box sx={{ py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FormControl>
              <TextField
                size='small'
                value={orderNumber}
                onChange={e => setOrderNumber(e.target.value)}
                placeholder='يرجى ادخال رقم الطلب هنا'
              />
            </FormControl>
            <Box
              sx={{
                textAlign: 'left',
                mt: { sm: 10, xs: 5 }
              }}
            >
              <Button
                variant='contained'
                sx={{ borderRadius: '4px', py: 4, px: 6, backgroundColor: '#E33730', mr: 2, width: '200px' }}
                onClick={handleQuery}
                startIcon={loading && <CircularProgress color='inherit' size={16} />}
              >
                استعلام
              </Button>
              <Button
                variant='contained'
                sx={{ borderRadius: '4px', py: 4, px: 6, backgroundColor: '#135B34', width: '200px' }}
                onClick={onNewOrder}
              >
                إنشاء طلب جديد
              </Button>
            </Box>
          </Box>
        )}
        {step == 2 && status == 'pending' && (
          <>
            <Box
              sx={{
                borderRadius: '8px',
                border: '1px solid #D2D2D2',
                py: 4,
                px: 3
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>رقم الطلب:</Typography>
                <Box sx={{ backgroundColor: '#F3F8FA', display: 'flex', alignItems: 'center', p: 2 }}>
                  {orderNumber}
                  <Icon icon='tabler:copy' color={'#000000'} />
                </Box>
              </Box>
              <Typography>الأسم: {request.name}</Typography>
              <Typography sx={{ fontWeight: 'bold', mt: 5 }}>حالة الطلب</Typography>
              <Grid
                item
                md={12}
                sx={{ p: '0px !important', backgroundColor: '#FEF8EC', borderLeft: '4px solid #F8BB4B' }}
              >
                <ul>
                  <li>{`تم استلام طلبك بنجاح في ${moment(request?.createdAt).format(
                    'DD/MM/YYYY'
                  )} وسيتم معالجته في أسرع وقت ممكن`}</li>
                </ul>
              </Grid>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', mt: 10, justifyContent: 'center' }}>
              <Button
                variant='contained'
                sx={{ borderRadius: '4px', py: 4, px: 6, backgroundColor: '#E33730', mr: 2, width: '200px' }}
                onClick={onAnotherQuery}
                startIcon={loading && <CircularProgress color='inherit' size={16} />}
              >
                استعلام
              </Button>
            </Box>
          </>
        )}
        {step == 2 && status == 'processing' && (
          <>
            <Box
              sx={{
                borderRadius: '8px',
                border: '1px solid #D2D2D2',
                py: 4,
                px: 3
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>رقم الطلب:</Typography>
                <Box sx={{ backgroundColor: '#F3F8FA', display: 'flex', alignItems: 'center', p: 2 }}>
                  {orderNumber}
                  <Icon icon='tabler:copy' color={'#000000'} />
                </Box>
              </Box>
              <Typography>الأسم: {request?.name}</Typography>
              <Typography sx={{ fontWeight: 'bold', mt: 5 }}>حالة الطلب</Typography>
              <Grid
                item
                md={12}
                sx={{ p: '0px !important', backgroundColor: '#ECEFFE', borderLeft: '4px solid #4BBAF8' }}
              >
                <ul>
                  <li>{`تم استلام طلبك بنجاح في ${moment(request?.createdAt).format(
                    'DD/MM/YYYY'
                  )} و هو قيد المعالجة, يرجى اجراء استعلام مرة أخرى بعد 10 أيام`}</li>
                </ul>
              </Grid>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', mt: 10, justifyContent: 'center' }}>
              <Button
                variant='contained'
                sx={{ borderRadius: '4px', py: 4, px: 6, backgroundColor: '#E33730', mr: 2, width: '200px' }}
                onClick={onAnotherQuery}
                startIcon={loading && <CircularProgress color='inherit' size={16} />}
              >
                استعلام
              </Button>
            </Box>
          </>
        )}
        {step == 2 && status == 'processed' && (
          <>
            <Box
              sx={{
                borderRadius: '8px',
                border: '1px solid #D2D2D2',
                py: 4,
                px: 3
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>رقم الطلب:</Typography>
                <Box sx={{ backgroundColor: '#F3F8FA', display: 'flex', alignItems: 'center', p: 2 }}>
                  {orderNumber}
                  <Icon icon='tabler:copy' color={'#000000'} />
                </Box>
              </Box>
              <Typography>الأسم: {request?.name}</Typography>
              <Typography sx={{ fontWeight: 'bold', mt: 5 }}>حالة الطلب</Typography>
              <Grid
                item
                md={12}
                sx={{ mt: 1, p: '2px !important', backgroundColor: '#EEFFED', borderLeft: '4px solid #1BDE2F' }}
              >
                <ul>
                  <li>{`تم معالجة طلبك بتاريخ: ${moment(request?.createdAt).format('DD/MM/YYYY')}`}</li>
                </ul>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>التفاصيل</Typography>
                <Button sx={{ backgroundColor: '#FFFFFF', border: '0.5px solid #314733' }}>
                  <Icon icon='tabler:printer' color={'#000000'} />
                  طباعة الاستجابة
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  borderRadius: '7px',
                  border: '1px solid #EEFFED',
                  backgroundColor: '#F8FFF8',
                  mt: 5,
                  minHeight: '330px'
                }}
              >
                {request?.details}
              </Grid>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', mt: 10, justifyContent: 'center' }}>
              <Button
                variant='contained'
                sx={{ borderRadius: '4px', py: 4, px: 6, backgroundColor: '#E33730', mr: 2, width: '200px' }}
                onClick={onAnotherQuery}
                startIcon={loading && <CircularProgress color='inherit' size={16} />}
              >
                استعلام
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CheckOrderDialog
