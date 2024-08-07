import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  TextField,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import { toast } from 'react-toastify'
import Http from 'src/services/Http'

const EditCategoryDialog = props => {
  const { open, category, onSuccess, onClose } = props
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isFeature, setIsFeature] = useState(false)
  const [isTab, setIsTab] = useState(false)
  const [isPublish, setIsPublish] = useState(false)
  const [isAdvertisement, setIsAdvertisement] = useState(false)

  useEffect(() => {
    if (open) {
      setName(category.name)
      setDescription(category.description)
      setIsFeature(category.isFeature)
      setIsTab(category.isTab)
      setIsPublish(category.isPublish)
      setIsAdvertisement(category.isAdvertisement)
    }
  }, [open])

  const handleUpdateCategory = async () => {
    if (name.trim() === '') {
      toast.error('يرجى ادخال الإسم')
    } else {
      try {
        setLoading(true)
        const id = category._id

        const { data } = await Http.put(`/admin/categories/${id}`, {
          name,
          description,
          isFeature,
          isTab,
          isPublish,
          isAdvertisement
        })
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
      sx={{ '& .MuiDialog-paper': { maxWidth: 650, overflow: 'visible' } }}
    >
      <DialogTitle sx={{ p: 4 }}>
        <Typography variant='h5' component='span'>
          تعديل قسم
        </Typography>
        <IconButton sx={{ position: 'absolute', top: 9, right: 9 }} onClick={onClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label='الاسم' size='small' value={name} onChange={ev => setName(ev.target.value)} />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            type='textarea'
            size='small'
            multiline
            minRows={8}
            label='الوصف'
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControlLabel
            label='قسم الأخبار الرئيسة'
            control={<Checkbox checked={isFeature} onChange={ev => setIsFeature(ev.target.checked)} />}
          />
          <FormControlLabel
            label='قسم النشاطات'
            control={<Checkbox checked={isTab} onChange={ev => setIsTab(ev.target.checked)} />}
          />
          <FormControlLabel
            label='قسم الأصدارات'
            control={<Checkbox checked={isPublish} onChange={ev => setIsPublish(ev.target.checked)} />}
          />
          <FormControlLabel
            label='قسم الإعلانات'
            control={<Checkbox checked={isAdvertisement} onChange={ev => setIsAdvertisement(ev.target.checked)} />}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: '1rem !important' }}>
        <Button
          variant='contained'
          color='primary'
          disabled={loading}
          startIcon={loading && <CircularProgress color='inherit' size={16} />}
          onClick={handleUpdateCategory}
        >
          تحديث
        </Button>
        <Button variant='contained' color='error' onClick={onClose}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditCategoryDialog
