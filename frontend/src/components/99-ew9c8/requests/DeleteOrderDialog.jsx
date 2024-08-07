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

const DeleteOrderDialog = props => {
  const { open, request, onSuccess, onClose } = props
  const [loading, setLoading] = useState(false)

  const handleDeletOrder = async () => {
    try {
      const id = request._id
      const { data } = await Http.delete(`/admin/form/order/${id}`)
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
        <Typography variant='h5'>هل أنت متأكد أنك تريد حذف جهة الاتصال هذه؟</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>بمجرد حذف جهة الاتصال هذه، لا يمكنك الرجوع إليها مرة أخرى.</DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button variant='contained' disabled={loading} onClick={handleDeletOrder}>
          {loading && <CircularProgress color='secondary' size={18} sx={{ mr: 2 }} />} إرسال الآن
        </Button>
        <Button variant='contained' color='error' onClick={onClose}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteOrderDialog
