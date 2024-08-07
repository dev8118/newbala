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

const DeletePostDialog = props => {
  const { open, post, onSuccess, onClose } = props
  const [loading, setLoading] = useState(false)

  const handleDeletePost = async () => {
    try {
      const id = post._id
      const { data } = await Http.delete(`/admin/posts/${id}`)
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
        <Typography variant='h5'>هل متأكد من حذف هذه الخبر؟</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>بمجرد حذف الخبر، لن تتمكن من استعادته مرة أخرى.</DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button
          variant='contained'
          disabled={loading}
          startIcon={loading && <CircularProgress color='inherit' size={16} />}
          onClick={handleDeletePost}
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

export default DeletePostDialog
