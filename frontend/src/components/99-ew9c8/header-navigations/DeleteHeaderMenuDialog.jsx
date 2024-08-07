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

const DeleteHeaderMenuDialog = props => {
  const { open, navigation, onSuccess, onClose } = props
  const [loading, setLoading] = useState(false)

  const handleDeleteNavigation = async () => {
    try {
      const id = navigation._id
      const { data } = await Http.delete(`/admin/header-navigations/${id}`)
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
        <Typography variant='h5'>يرجى تأكيد حذف القائمة?</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>ننوه بعد حذف القائمة لا يمكنك الرجوع لاحقا عن هذا الأمر</DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button variant='contained' disabled={loading} onClick={handleDeleteNavigation}>
          {loading && <CircularProgress color='secondary' size={18} sx={{ mr: 2 }} />} حذف
        </Button>
        <Button variant='contained' color='error' onClick={onClose}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteHeaderMenuDialog
