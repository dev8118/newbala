import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Typography,
  IconButton,
  Button,
  CircularProgress
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import { toast } from 'react-toastify'
import Http from 'src/services/Http'

const NewServiceDialog = props => {
  const { open, onSuccess, onClose } = props
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (open) {
      setTitle('')
      setDescription('')
    }
  }, [open])

  const handleCreateService = async () => {
    if (title.trim() === '') {
      toast.error('يرجى ادخال العنوان')
    } else {
      try {
        setLoading(true)

        const { data } = await Http.post(`/admin/services`, {
          title,
          description
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
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle sx={{ p: 4 }}>
        <Typography variant='h5' component='span'>
        فيديو جديد
        </Typography>
        <IconButton sx={{ position: 'absolute', top: 9, right: 9 }} onClick={onClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label='العنوان' size='small' value={title} onChange={ev => setTitle(ev.target.value)} />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            size='small'
            label='وصلة'
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: '1rem !important' }}>
        <Button
          variant='contained'
          color='primary'
          disabled={loading}
          startIcon={loading && <CircularProgress color='inherit' size={16} />}
          onClick={handleCreateService}
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

export default NewServiceDialog
