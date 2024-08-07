import { useState } from 'react'
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

const OpenImageDialog = props => {
  const { open, image, onClose, fullScreen } = props

  console.log(image)
  return (
    <Dialog fullWidth fullScreen={fullScreen} maxWidth='lg' open={open} onClose={onClose}>
      <DialogTitle sx={{ p: 4 }}>
        <a href={image} download>
          <IconButton sx={{ position: 'absolute', top: 9, left: 9 }}>
            <Icon icon='tabler:download' fontSize='3rem' />
          </IconButton>
        </a>
        <IconButton sx={{ position: 'absolute', top: 9, right: 9 }} onClick={onClose}>
          <Icon icon='tabler:x' fontSize='3rem' />
        </IconButton>
      </DialogTitle>
      <DialogContent>{image && <Box component='img' sx={{}} src={image} />}</DialogContent>
    </Dialog>
  )
}

export default OpenImageDialog
