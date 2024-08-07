import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  TextField,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  FormControlLabel,
  InputAdornment
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import { toast } from 'react-toastify'
import Http from 'src/services/Http'

const NewFooterMenuDialog = props => {
  const { open, categories, onSuccess, onClose } = props
  const [loading, setLoading] = useState(false)
  const [label, setLabel] = useState('الأقسام الرئيسة')
  const [name, setName] = useState('')
  const [type, setType] = useState('static') // static | category
  const [isExternal, setIsExternal] = useState(false)
  const [category, setCategory] = useState('')
  const [page, setPage] = useState('home')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (open) {
      setName('')
      setType('static')
      setCategory(categories.length ? categories[0]._id : '')
      setPage('home')
      setUrl('')
    }
  }, [open])

  const handleCreateMenu = async () => {
    if (name.trim() === '') {
      toast.error('رجاء أدخل اسم القائمة')
    } else if (type === 'static' && isExternal == 'true' && url.trim() === '') {
      toast.error('رجاء ادخل رابط القائمة')
    } else if (type === 'static' && isExternal == 'false' && page.trim() === '') {
      toast.error('الرجاء اختيار صفحة محلية.')
    } else if (type === 'category' && category.trim() === '') {
      toast.error('اختيار القائمة')
    } else {
      try {
        setLoading(true)

        const { data } = await Http.post('/admin/footer-navigations', {
          label,
          name,
          type,
          isExternal: isExternal == 'true' ? true : false,
          page,
          url,
          category
        })

        if (data.status) {
          toast.success(data.msg)
          onSuccess()
          setTimeout(() => onClose(), 500)
        } else {
          toast.error(data.msg)
        }
      } catch (err) {
        toast.error(err.message)
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle sx={{ p: 4 }}>
        <Typography variant='h5' component='span'>
          اضافة قائمة جديدة
        </Typography>
        <IconButton sx={{ position: 'absolute', top: 9, right: 9 }} onClick={onClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <InputLabel size='small'>تسمية العنصر</InputLabel>
          <Select size='small' label='تسمية العنصر' value={label} onChange={ev => setLabel(ev.target.value)}>
            <MenuItem value='الأقسام الرئيسة'>الأقسام الرئيسة</MenuItem>
            <MenuItem value='نشاطات'>نشاطات</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label='اسم' size='small' value={name} onChange={ev => setName(ev.target.value)} />
        </FormControl>
        <FormControl fullWidth sx={{ mb: type === 'static' ? 0 : 5 }}>
          <InputLabel size='small'>نوع القائمة</InputLabel>
          <Select label='نوع القائمة' size='small' value={type} onChange={ev => setType(ev.target.value)}>
            <MenuItem value='static'>ثابت</MenuItem>
            <MenuItem value='category'>القسم</MenuItem>
          </Select>
        </FormControl>
        {type === 'static' ? (
          <Box>
            <RadioGroup row value={isExternal} onChange={ev => setIsExternal(ev.target.value)}>
              <FormControlLabel value={false} control={<Radio />} label='محلي' />
              <FormControlLabel value={true} control={<Radio />} label='خارجي' />
            </RadioGroup>
            {isExternal == 'true' ? (
              <FormControl fullWidth dir='ltr'>
                <TextField
                  size='small'
                  label='رابط'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>https://</InputAdornment>
                  }}
                  value={url}
                  onChange={ev => setUrl(ev.target.value)}
                />
              </FormControl>
            ) : (
              <FormControl fullWidth>
                <InputLabel size='small'>نوع</InputLabel>
                <Select label='نوع' size='small' value={page} onChange={ev => setPage(ev.target.value)}>
                  <MenuItem value='home'>الصفحة الرئيسية</MenuItem>
                  <MenuItem value='section'>القسم</MenuItem>
                  <MenuItem value='online-payments'>خدمات الدفع الالكتروني</MenuItem>
                  <MenuItem value='contact-us'>اتصل بنا</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        ) : (
          <FormControl fullWidth>
            <InputLabel size='small'>القسم</InputLabel>
            <Select label='القسم' size='small' value={category} onChange={ev => setCategory(ev.target.value)}>
              {categories.map((category, idx) => (
                <MenuItem key={idx} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions sx={{ p: '1rem !important' }}>
        <Button
          variant='contained'
          color='primary'
          disabled={loading}
          startIcon={loading && <CircularProgress color='inherit' size={16} />}
          onClick={handleCreateMenu}
        >
          إنشاء
        </Button>
        <Button variant='contained' color='error' onClick={onClose}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewFooterMenuDialog
