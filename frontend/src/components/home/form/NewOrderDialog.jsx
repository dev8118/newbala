import React, { useState, useEffect, useRef } from 'react'
import Checkbox from '@mui/material/Checkbox'
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
import Http from 'src/services/Http'

const NewOrderdialog = props => {
  const { open, onSuccess, onClose, formSetting, fullScreen, onCheckOrder } = props
  const galleryRef = useRef(null)
  const [chk, setChk] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [requestType, setRequestType] = useState('')
  const [judiciary, setJudiciary] = useState('')
  const [academicType, setAcademicType] = useState('')
  const [region, setRegion] = useState('')
  const [image, setImage] = useState(null)
  const [content, setContent] = useState()
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
      setStep(1)
      setName('')
      setPhone('')
      setRequestType('')
      setJudiciary('')
      setAcademicType(''), setRegion('')
      setImage(null)
      setOrderNumber('834781249887')
      setContent('')
      setGalleries([])
      setChk(false)
    }
  }, [open])

  const handleRemoveImage = ev => {
    ev.stopPropagation()
    setImage(null)
  }

  const validateForm = () => {
    return (
      name &&
      name.trim != '' &&
      phone &&
      phone.trim != '' &&
      requestType &&
      requestType.trim != '' &&
      academicType &&
      academicType.trim != '' &&
      region &&
      region.trim != '' &&
      judiciary &&
      judiciary.trim != '' &&
      content &&
      content.trim != '' &&
      image
    )
  }

  const handleCreateOrder = async () => {
    if (!image) {
      toast.error('الرجاء اختيار صورة.')
    } else if (name.trim() === '') {
      toast.error('يرجى ادخال العنوان')
    } else if (phone.trim() === '') {
      toast.error('الرجاء إدخال رقم الهاتف')
    } else if (requestType.trim() === '') {
      toast.error('الرجاء إدخال نوع الطلب')
    } else if (judiciary.trim() === '') {
      toast.error('من فضلك أدخل القضاء')
    } else if (region.trim() === '') {
      toast.error('الرجاء اختيار المنطقة')
    } else if (content.trim() === '') {
      toast.error('الرجاء تحديد المحتوى')
    } else {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append('image', image.file)
        formData.append('name', name)
        formData.append('phone', phone)
        formData.append('requestType', requestType)
        formData.append('judiciary', judiciary)
        formData.append('region', region)
        formData.append('content', content)
        formData.append('academicType', academicType)
        for (let gallery of galleries) {
          formData.append('gallery', gallery.file ? gallery.file : gallery.url)
        }

        const { data } = await Http.post('/form/order', formData)
        if (data.status) {
          toast.success(data.msg)
          onSuccess()
          setOrderNumber(data.orderNumber)
          setStep(3)
        } else {
          toast.error(data.msg)
          setStep(4)
        }
      } catch (err) {
        toast.error(err.message)
        setStep(4)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (step == 2) {
      setChk(false)
    }
  }, [step])
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

  const tyleSx = { width: '100%', my: 1, px: 1 }

  return (
    <Dialog fullWidth fullScreen={fullScreen} maxWidth='md' open={open} onClose={onClose}>
      {step == 1 && (
        <DialogContent>
          <Grid container sx={{ p: 5 }}>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: { sm: 'nowrap', xs: 'wrap' } }}
            >
              <Typography
                variant='h1'
                sx={{
                  fontFamily: 'Pinar !important',
                  color: '#313131',
                  fontWeight: 'bold',
                  fontSize: {
                    sm: '2rem',
                    xs: '1rem'
                  }
                }}
              >
                تواصل مع المحافظ مباشرة
              </Typography>
              <Button variant='contained' sx={{ color: '#FFFFFF', backgroundColor: '#E33730' }} onClick={onCheckOrder}>
                متابعة حالة الطلب
              </Button>
            </Grid>
            <Grid
              item
              md={12}
              sx={{ mt: 5, p: '0px !important', backgroundColor: '#FEF8EC', borderLeft: '4px solid #F8BB4B' }}
            >
              <ul>
                <li>يرجى التأكد من ادخال المعلومات بصورة صحيحة</li>
                <li>تحميل الملفات ان وجدت </li>
              </ul>
            </Grid>
            <Grid container sx={{ mt: 5 }}>
              <Grid item md={4} xs={6} sx={tyleSx}>
                <FormControl fullWidth>
                  <InputLabel size='small'>القضاء</InputLabel>
                  <Select
                    size='small'
                    label='القضاء'
                    value={requestType}
                    onChange={ev => setRequestType(ev.target.value)}
                  >
                    {formSetting?.requestTypes.map((item, idx) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={6} sx={tyleSx}>
                <FormControl fullWidth>
                  <TextField
                    size='small'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='الأسم الثلاثي واللقب '
                  />
                </FormControl>
              </Grid>
              <Grid item md={4} xs={6} sx={tyleSx}>
                <FormControl fullWidth>
                  <InputLabel size='small'>القضاء</InputLabel>
                  <Select size='small' label='القضاء' value={judiciary} onChange={ev => setJudiciary(ev.target.value)}>
                    {formSetting?.judiciaries.map((item, idx) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={6} sx={tyleSx}>
                <FormControl fullWidth>
                  <InputLabel size='small'>المنطقة</InputLabel>
                  <Select size='small' label='المنطقة' value={region} onChange={ev => setRegion(ev.target.value)}>
                    {formSetting?.regions.map((item, idx) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={6} sx={tyleSx}>
                <FormControl fullWidth>
                  <TextField
                    size='small'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder='رقم الهاتف'
                  />
                </FormControl>
              </Grid>
              <Grid item md={4} xs={6} sx={tyleSx}>
                <FormControl fullWidth>
                  <InputLabel size='small'>التحصيل الدراسي</InputLabel>
                  <Select
                    size='small'
                    label='التحصيل الدراسي'
                    value={academicType}
                    onChange={ev => setAcademicType(ev.target.value)}
                  >
                    {formSetting?.academicTypes.map((item, idx) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 5 }}>
              <Typography sx={{ display: 'flex', m: 1 }}>
                <Typography sx={{ color: '#C9563A', mr: 1 }}>*</Typography> ارفاق ملفات
              </Typography>
            </Grid>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Box
                sx={{
                  mr: 5,
                  flexDirection: 'column'
                }}
              >
                <DropzoneWrapper sx={{ mb: 5 }}>
                  <Box {...getRootProps({ className: 'dropzone' })} sx={{ minWidth: '200px' }}>
                    <input {...getInputProps()} />
                    {image ? (
                      <Box
                        component='img'
                        key={image.file.name}
                        alt={image.file.name}
                        className='single-file-image'
                        sx={{
                          minWidth: '200px',
                          maxWidth: '224px',
                          width: '100% !important',
                          height: 60,
                          display: 'flex',
                          borderRadius: 1
                        }}
                        src={image.url}
                      />
                    ) : (
                      <Box
                        sx={{
                          p: 5,
                          display: 'flex',
                          textAlign: 'center',
                          alignItems: 'center',
                          flexDirection: 'column'
                        }}
                      >
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
                        <Typography sx={{ color: 'text.secondary' }}>إضافة ملف</Typography>
                        <Button
                          variant='outlined'
                          sx={{
                            color: '#495ED4',
                            borderColor: '#495ED4',
                            mt: 3
                          }}
                        >
                          Browse
                        </Button>
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
                  <Typography
                    sx={{
                      color: '#5A7A92',
                      width: '100%',
                      textAlign: 'right'
                    }}
                  >
                    (*.jpeg, jpg, png)
                  </Typography>
                </DropzoneWrapper>
              </Box>
              <Box
                sx={{
                  border: '3px dashed #C2C2C2',
                  borderRadius: '10px',
                  maxWidth: '241px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  px: 10,
                  py: 5
                }}
                onClick={() => galleryRef.current.click()}
              >
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
                <Typography
                  sx={{
                    fontFamily: 'IRANYekanFN !important',
                    size: 20,
                    mt: 1
                  }}
                >
                  + إضافة ملف آخر
                </Typography>
              </Box>
            </Box>
            <Grid container>
              {galleries.length > 0 && (
                <Box sx={{ display: 'flex', gap: 3, mt: 5, flexWrap: 'wrap' }}>
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
            </Grid>
            <Grid item xs={12} sx={{ mt: 10 }}>
              <Typography
                sx={{
                  color: '#1C3E57',
                  fontWeight: 'bold',
                  fontFamily: 'DanaFaNumn !important',
                  fontSize: 20
                }}
              >
                التفاصيل
              </Typography>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={8}
                  sx={{
                    width: '100%',
                    backgroundColor: '#FAFAFA'
                  }}
                  placeholder='يرجى كتابة التفاصيل بصورة واضحة ومختصرة'
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 10 }}></Grid>
          </Grid>
          <Box
            component='input'
            type='file'
            multiple
            ref={galleryRef}
            sx={{ display: 'none' }}
            onChange={handleChangeGalleries}
          />
          <Box
            sx={{
              p: '1rem !important',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Button
              variant='outlined'
              sx={{
                color: '#212123',
                backgroundColor: '#F8F8F8',
                border: '1px solid #BCBCBC'
              }}
              disabled={loading}
              onClick={onClose}
            >
              التالي
            </Button>
            <Button
              variant='contained'
              onClick={() => setStep(2)}
              sx={{
                backgroundColor: '#1630C5',
                color: '#FFFFFF'
              }}
              disabled={!validateForm()}
              // startIcon={loading && <CircularProgress color='inherit' size={16} />}
            >
              إلغاء
              <Icon icon='tabler:arrow-left' color={!validateForm() ? '#BCBCBC' : '#FFFFFF'} />
            </Button>
          </Box>
        </DialogContent>
      )}
      {step == 2 && (
        <DialogContent>
          <Grid
            item
            md={12}
            sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: { sm: 'nowrap', xs: 'wrap' } }}
          >
            <Typography
              variant='h1'
              sx={{
                fontFamily: 'Pinar !important',
                color: '#313131',
                fontWeight: 'bold',
                fontSize: {
                  sm: '2rem',
                  xs: '1rem'
                }
              }}
            >
              مراجعة وتأكيد الطلب
            </Typography>
            <Button
              variant='contained'
              sx={{ color: '#212123', backgroundColor: '#F8F8F8', border: '1px solid #BCBCBC' }}
              onClick={onClose}
            >
              إغلاق
            </Button>
          </Grid>
          <Grid container xs={12}>
            <Grid item md={7} xs={12} sx={{ pr: { md: 10, xs: 0 } }}>
              <Grid
                container
                sx={{
                  backgroundColor: '#F7F7F7',
                  border: '1px solid #B8B8B8',
                  borderRadius: '5px',
                  p: 5,
                  my: 5
                }}
              >
                <Grid md={6} sx={{ color: '#1C3E57' }}>
                  <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>نوع الطلب</Typography>
                  <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>الأسم الثلاثي واللقب</Typography>
                  <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>القضاء</Typography>
                  <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>المنطقة</Typography>
                  <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>رقم الهاتف</Typography>
                  <Typography sx={{ color: '#1C3E57', fontWeight: 900, p: 2 }}>التحصيل الدراسي</Typography>
                </Grid>
                <Grid md={6}>
                  <Typography sx={{ color: '#1C3E57', p: 2 }}>{requestType}</Typography>
                  <Typography sx={{ color: '#1C3E57', p: 2 }}>{name}</Typography>
                  <Typography sx={{ color: '#1C3E57', p: 2 }}>{judiciary}</Typography>
                  <Typography sx={{ color: '#1C3E57', p: 2 }}>{region}</Typography>
                  <Typography sx={{ color: '#1C3E57', p: 2 }}>{phone}</Typography>
                  <Typography sx={{ color: '#1C3E57', p: 2 }}>{academicType}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={5} xs={12}>
              <Grid container xs={12} sx={{ display: 'flex' }}>
                <Typography sx={{ color: '#C9563A' }}>*</Typography>
                <Typography
                  sx={{
                    fontFamily: 'DanaFaNum !important',
                    fontSize: 24,
                    color: '#1C3E57'
                  }}
                >
                  الملفات المرفقة
                </Typography>
              </Grid>
              <Grid container xs={12} sx={{ display: 'flex' }}>
                {image && (
                  <Box
                    component='img'
                    sx={{
                      maxWidth: '200px',
                      display: 'flex',
                      borderRadius: 1,
                      mt: 2
                    }}
                    src={image.url}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <Box>
              <Checkbox checked={chk} onChange={e => setChk(e.target.checked)} />
            </Box>
            <Box sx={{ maxWidth: '90%' }}>
              <Typography>
                أؤكد أن جميع التفاصيل المقدمة صحيحة ودقيقة. بمجرد الإرسال، لن يكون بإمكاني تعديل المعلومات المدخلة. إذا
                كنت متأكداً من صحة المعلومات، يرجى الضغط على "مراجعة وتأكيد" لتقديم النموذج. شكراً لتعاونك.
              </Typography>
            </Box>
          </Grid>
          <Grid container xs={12}>
            <Box
              sx={{
                p: '1rem !important',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Button
                variant='outlined'
                sx={{
                  color: '#495ED4',
                  backgroundColor: '#F8F8F8',
                  border: '1px solid #495ED4'
                }}
                onClick={() => {
                  setStep(1)
                }}
              >
                <Icon icon='tabler:arrow-right' color={'#495ED4'} />
                تعديل
              </Button>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#135B34',
                  color: '#FFFFFF'
                }}
                disabled={!validateForm() || !chk}
                startIcon={loading && <CircularProgress color='inherit' size={16} />}
                onClick={handleCreateOrder}
              >
                تقديم الطلب
              </Button>
            </Box>
          </Grid>
        </DialogContent>
      )}
      {step == 3 && (
        <DialogContent sx={{ p: 10 }}>
          <Grid container xs={12}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  borderRadius: '100%',
                  border: '1px solid #248438',
                  width: '53px',
                  height: '53px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 2
                }}
              >
                <Icon icon='tabler:check' color={'#248438'} />
              </Box>
              <Typography
                variant='h1'
                sx={{
                  fontFamily: 'Pinar !important',
                  color: '#313131',
                  fontWeight: 'bold',
                  fontSize: {
                    sm: '2rem',
                    xs: '1rem'
                  }
                }}
              >
                تم إستلام طلبك بنجاح
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>رقم الطلب:</Typography>
                <Box sx={{ backgroundColor: '#F3F8FA', display: 'flex', alignItems: 'center', p: 2 }}>
                  {orderNumber}
                  <Icon icon='tabler:copy' color={'#000000'} />
                </Box>
              </Box>
            </Box>
            <Grid
              item
              md={12}
              sx={{ mt: 5, p: '0px !important', backgroundColor: '#FEF8EC', borderLeft: '4px solid #F8BB4B' }}
            >
              <ul>
                <p>سيتم متابعة طلبك من قبل السيد المحافظ محمد جميل المياحي مباشرة ضمن الأولوية </p>
                <p>تحميل الملفات ان ستتلقى إشعارًا برسالة نصية حول حالة الطلب. </p>
                <p>يمكنك متابعة طلبك بزيارة الصفحة التالية وإدخال رقم الطلب المذكور أعلاه </p>
              </ul>
            </Grid>
            <Grid container xs={12} sx={{ mt: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h2' sx={{}}>
                شكرا لكم
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      )}
      {step == 4 && (
        <DialogContent sx={{ p: 15 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                borderRadius: '100%',
                border: '1px solid #FF0000',
                width: '53px',
                height: '53px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2
              }}
            >
              <Icon icon='tabler:x' color={'#FF0000'} />
            </Box>
            <Typography
              variant='h1'
              sx={{
                fontFamily: 'Pinar !important',
                color: '#313131',
                fontWeight: 'bold',
                fontSize: {
                  sm: '2rem',
                  xs: '1rem'
                }
              }}
            >
              حدث خطأ
            </Typography>
            <Button
              variant='contained'
              sx={{
                color: '#FFFFFF',
                backgroundColor: '#3D08D3',
                border: '0.5px solid #0D773E',
                mt: 10
              }}
              onClick={handleCreateOrder}
            >
              <Icon icon='tabler:arrow-back-up-double' color={'#FFFFFF'} />
              إعادة المحاولة
            </Button>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  )
}

export default NewOrderdialog
