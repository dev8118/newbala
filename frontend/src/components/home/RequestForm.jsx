import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Button, Pagination, PaginationItem } from '@mui/material'
import Link from 'next/link'
import Icon from 'src/@core/components/icon'
import clsx from 'clsx'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { useKeenSlider } from 'keen-slider/react'
import moment from 'moment'
import Http from 'src/services/Http'
import NewOrderdialog from './form/NewOrderDialog'
import CheckOrderDialog from './form/CheckOrderDialog'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const RequestForm = () => {
  const [formSetting, setFormSetting] = useState(null)
  const [isNewOrder, setIsNewOrder] = useState(false)
  const [isGetData, setIsGetData] = useState(false)
  const [isOrderCheck, setIsOrderCheck] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('ld'))
  useEffect(() => {
    fetchSetting()
  }, [])

  const fetchSetting = async () => {
    const { data } = await Http.get('/form/setting')
    console.log('data', data)
    if (data?.formSetting) {
      setFormSetting(data.formSetting)
    }
  }

  return (
    <Grid container>
      <Box sx={{ my: { sm: 30, xs: 10, p: 15, } }}>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
          container
        >
          <Grid item md={7} xs={12}>
            <Box
              sx={{
                py: { sm: 10, xs: 5 },
                px: 5,
                backgroundColor: '#FCFCFC'
              }}
            >
              <Typography
                variant='h1'
                sx={{
                  fontSize: {
                    sm: '3rem',
                    xs: '1.5rem'
                  },
                  fontFamily: '29LT Zarid Slab !important',
                  textDecoration: 'none',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: {
                    sm: 'inherit',
                    xs: 'center'
                  },
                  mb: 3
                }}
              >
                تواصل مع المحافظ مباشرة
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Plus Jakarta Sans !important',
                  color: '#313131',
                  fontSize: 20,
                  borderBottom: '4px solid #313131',
                  pb: 1,
                  width: 'auto',
                  fontWeight: '500',
                  width: 'fit-content'
                }}
              >
                أختر نوع الطلب
              </Typography>
              <Box key='formsetting'
                sx={{
                  my: 8
                }}
              >
                {formSetting &&
                  formSetting.requestTypes.map(item => {
                    return (
                      <Button
                        variant='outlined'
                        sx={{
                          fontFamily: 'IRANYekanFN !important',
                          m: 1,
                          wordBreak: 'break-all',
                          color: '#0E0E0E'
                        }}
                      >
                        {item}
                      </Button>
                    )
                  })}
              </Box>
              <Box
                sx={{
                  textAlign: 'left',
                  mt: { sm: 5, xs: 2 }
                }}
              >
                <Button
                  variant='contained'
                  sx={{ borderRadius: '4px', py: 4, px: 6, backgroundColor: '#135B34', mr: 2 }}
                  onClick={() => setIsNewOrder(true)}
                >
                  إنشاء طلب جديد
                </Button>
                <Button
                  variant='contained'
                  sx={{ borderRadius: '4px', py: 4, px: 6, backgroundColor: '#E33730' }}
                  onClick={() => setIsOrderCheck(true)}
                >
                  متابعة حالة الطلب
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item md={5} xs={12} sx={{ pr: {md: 5, sm: 0}, position: 'relative ', backgroundColor: '#FFF' }}>
            <Box
              component='img'
              src={formSetting?.image ? `/uploads/posts/${formSetting.image}` : ''}
              sx={{
                backgroundColor: '#FFFFFF',
                borderRadius: 2,
                objectFit: 'contain',
                width: '100%',
                zIndex: 9999
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <NewOrderdialog
        open={isNewOrder}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsNewOrder(false)}
        formSetting={formSetting}
        onCheckOrder={() => {
          setIsNewOrder(false)
          setIsOrderCheck(true)
        }}
        fullScreen={fullScreen}
      />
      <CheckOrderDialog
        open={isOrderCheck}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsOrderCheck(false)}
        onNewOrder={() => {
          setIsOrderCheck(false)
          setIsNewOrder(true)
        }}
        fullScreen={fullScreen}
      />
    </Grid>
  )
}

export default RequestForm
