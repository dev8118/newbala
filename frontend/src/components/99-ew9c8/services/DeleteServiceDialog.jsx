import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Button,
  CircularProgress
} from '@mui/material'
import { toast } from 'react-toastify'
import Http from 'src/services/Http'

const DeleteServiceDialog = props => {
  const { open, service, onSuccess, onClose } = props
  const [loading, setLoading] = useState(false)

  const handleDeleteService = async () => {
    try {
      const id = service._id
      const { data } = await Http.delete(`/admin/services/${id}`)
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant='h5'>هل أنت متأكد أنك تريد حذف هذا الفيديو؟</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText> بمجرد حذف هذا الفيديو، لن تتمكن من استعادته مرة أخرى.</DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button
          variant='contained'
          disabled={loading}
          startIcon={loading && <CircularProgress color='inherit' size={16} />}
          onClick={handleDeleteService}
        >
          حذف
        </Button>
        <Button variant='contained' color='error' onClick={onClose}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteServiceDialog
