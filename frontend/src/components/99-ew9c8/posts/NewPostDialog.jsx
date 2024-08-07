import React, { useState, useEffect, useRef } from 'react'
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
import { convertToRaw, EditorState } from 'draft-js'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import Http from 'src/services/Http'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const NewPostDialog = props => {
  const { open, categories, onSuccess, onClose } = props
  const galleryRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(EditorState.createEmpty())
  const [galleries, setGalleries] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accpet: {
      'images/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg']
    },
    onDrop: files => {
      setImage({
        file: files[0],
        url: URL.createObjectURL(files[0])
      })
    }
  })

  useEffect(() => {
    if (open) {
      setCategory('')
      setImage(null)
      setTitle('')
      setContent(EditorState.createEmpty())
      setGalleries([])
    }
  }, [open])

  const handleRemoveImage = ev => {
    ev.stopPropagation()
    setImage(null)
  }

  const handleCreatePost = async () => {
    if (!image) {
      toast.error('الرجاء اختيار صورة.')
    } else if (title.trim() === '') {
      toast.error('يرجى ادخال العنوان')
    } else if (category.trim() === '') {
      toast.error('اختر القسم')
    } else {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append('image', image.file)
        formData.append('title', title)
        formData.append('category', category)
        formData.append('content', draftToHtml(convertToRaw(content.getCurrentContent())))
        for (let gallery of galleries) {
          formData.append('gallery', gallery.file ? gallery.file : gallery.url)
        }

        const { data } = await Http.post('/admin/posts', formData)
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

  const handleChangeGalleries = ev => {
    const _galleries = []
    for (let i = 0; i < ev.target.files.length; i++) {
      _galleries.push({ file: ev.target.files[i], url: URL.createObjectURL(ev.target.files[i]) })
    }
    setGalleries(galleries.concat(_galleries))
  }

  const handleRemoveGallery = id => {
    setGalleries(galleries.filter((gallery, idx) => idx !== id))
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle sx={{ p: 4 }}>
        <Typography variant='h5' component='span'>
          انشاء خبر جديد
        </Typography>
        <IconButton sx={{ position: 'absolute', top: 9, right: 9 }} onClick={onClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={5}>
          <Grid item md={6} xs={12}>
            <DropzoneWrapper sx={{ mb: 5 }}>
              <Box {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {image ? (
                  <Box
                    component='img'
                    key={image.file.name}
                    alt={image.file.name}
                    className='single-file-image'
                    src={image.url}
                  />
                ) : (
                  <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box
                      sx={{
                        mb: 5,
                        width: 80,
                        height: 60,
                        display: 'flex',
                        borderRadius: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
                      }}
                    >
                      <Icon icon='tabler:upload' fontSize='2.75rem' />
                    </Box>
                    <Typography sx={{ color: 'text.secondary' }}>قم بسحب الصور هنا او انقر للتحميل</Typography>
                  </Box>
                )}
                {image && (
                  <IconButton
                    size='small'
                    sx={{ position: 'absolute', top: 5, right: 5 }}
                    onClick={ev => handleRemoveImage(ev)}
                  >
                    <Icon icon='tabler:x' color='red' />
                  </IconButton>
                )}
              </Box>
            </DropzoneWrapper>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth sx={{ mb: 5 }}>
              <TextField
                label='العنوان'
                size='small'
                multiline
                minRows={5.7}
                value={title}
                onChange={ev => setTitle(ev.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel size='small'>القسم</InputLabel>
              <Select size='small' label='القسم' value={category} onChange={ev => setCategory(ev.target.value)}>
                <MenuItem value=''>لا تصنيف</MenuItem>
                {categories.map((category, idx) => (
                  <MenuItem key={idx} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ mb: 5 }}>
          <EditorWrapper>
            <ReactDraftWysiwyg
              editorStyle={{
                height: 145
              }}
              editorState={content}
              onEditorStateChange={content => setContent(content)}
            />
          </EditorWrapper>
        </Box>
        <Button variant='contained' onClick={() => galleryRef.current.click()}>
          اضافة صور
        </Button>
        <Box
          component='input'
          type='file'
          multiple
          ref={galleryRef}
          sx={{ display: 'none' }}
          onChange={handleChangeGalleries}
        />
        {galleries.length > 0 && (
          <Box sx={{ display: 'flex', gap: 3, mt: 5 }}>
            {galleries.map((gallery, idx) => (
              <Box key={idx} sx={{ position: 'relative', border: '1px solid #ccc', borderRadius: 1 }}>
                <Box
                  component='img'
                  src={gallery.url}
                  alt='gallery'
                  sx={{ height: 100, width: 100, borderRadius: 1, objectFit: 'cover' }}
                />
                <Button
                  variant='contained'
                  color='error'
                  size='small'
                  sx={{
                    position: 'absolute',
                    top: -9,
                    right: -9,
                    borderRadius: 5,
                    width: 20,
                    height: 20,
                    p: 0,
                    minWidth: 0
                  }}
                  onClick={() => handleRemoveGallery(idx)}
                >
                  <Icon icon='tabler:x' fontSize={16} />
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: '1rem !important' }}>
        <Button
          variant='contained'
          color='primary'
          disabled={loading}
          startIcon={loading && <CircularProgress color='inherit' size={16} />}
          onClick={handleCreatePost}
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

export default NewPostDialog
