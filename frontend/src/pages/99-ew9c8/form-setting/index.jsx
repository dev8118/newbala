import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Box,
  FormControl,
  TextField,
  Typography,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import AdminLayout from 'src/layouts/AdminLayout'
import PhoneInput from 'react-phone-input-2'
import Http from 'src/services/Http'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import ListPanel from '../../../components/99-ew9c8/form-setting/ListPanel' 
import 'react-phone-input-2/lib/style.css'

const FormSetting = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [requestTypes, setRequestTypes] = useState([]);
  const [judiciaries, setJudiciaries] = useState([]);
  const [academicTypes, setAcademicTypes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchSetting()
  }, [])

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

  const handleRemoveImage = (ev) => {
    ev.stopPropgation()
    setImage(null)
  }

  const fetchSetting = async () => {
    const { data } = await Http.get('/form/setting')
    console.log('data', data);
    if(data?.formSetting) {
      setId(data.formSetting._id)
      setTitle(data.formSetting.title)
      setSubTitle(data.formSetting.subTitle)
      setRequestTypes(data.formSetting.requestTypes)
      setJudiciaries(data.formSetting.judiciaries)
      setAcademicTypes(data.formSetting.academicTypes)
      setRegions(data.formSetting.regions)
      if(data.formSetting?.image != 'null') {
        setImage({
          file: null,
          url: `/uploads/posts/${data.formSetting.image}`
        })
      }
    }
  }

  const handleUpdateFormSetting = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      console.log(image.file)
      if (image.file) formData.append('image', image.file)
      formData.append('id', id)
      formData.append('title', title)
      requestTypes.forEach(item => {
        formData.append('requestTypes', item)
      })
      judiciaries.forEach(item => {
        formData.append('judiciaries', item)
      })
      academicTypes.forEach(item => {
        formData.append('academicTypes', item)
      })
      regions.forEach(item => {
        formData.append('regions', item)
      })
      console.log(formData)
      const { data } = await Http.put('/admin/form/update', formData)
      console.log(data)
      if (data.status) {
        toast.success(data.msg)
      } else {
        toast.error(data.msg)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }

  return (
    <Card>
      <CardHeader title={<Typography variant='h4'>الاعدادات</Typography>} />
      <Divider />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label='subTitle'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                value={subTitle}
                onChange={ev => setSubTitle(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label='Title'
                size='small'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 0
                  }
                }}
                value={title}
                onChange={ev => setTitle(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <ListPanel 
              title="أختر نوع الطلب"
              items={requestTypes}
              setItems={setRequestTypes}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ListPanel 
              title="القضاء "
              items={judiciaries}
              setItems={setJudiciaries}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ListPanel 
              title="التحصيل الدراسي"
              items={academicTypes}
              setItems={setAcademicTypes}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ListPanel 
              title="المنطقة"
              items={regions}
              setItems={setRegions}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DropzoneWrapper sx={{ mb: 5 }}>
              <Box {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {image ? (
                  <Box
                    component='img'
                    className='single-file-image'
                    src={image.url}
                    sx={{
                      objectFit: 'contain !important'
                    }}
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
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
          <Button
            variant='contained'
            disabled={loading}
            startIcon={loading && <CircularProgress color='inherit' size={16} />}
            onClick={handleUpdateFormSetting}
          >
            تحديث
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

FormSetting.getLayout = page => <AdminLayout>{page}</AdminLayout>
FormSetting.authGuard = true

export default FormSetting;
