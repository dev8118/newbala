import { useState, useEffect } from 'react'
import AdminLayout from 'src/layouts/AdminLayout'
import { Card, CardHeader, Divider, Box, TextField, Typography, Tooltip, IconButton, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomChip from 'src/@core/components/mui/chip'
import Icon from 'src/@core/components/icon'
import Http from 'src/services/Http'
import moment from 'moment'
import OrderDetailsDialog from 'src/components/99-ew9c8/requests/OrderDetailsDialog'
import DeleteOrderDialog from 'src/components/99-ew9c8/requests/DeleteOrderDialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import OpenImageDialog from 'src/components/99-ew9c8/requests/OpenImageDialog'

const Requests = () => {
  const [search, setSearch] = useState('')
  const [requests, setRequests] = useState([])
  const [request, setRequest] = useState(null)
  const [isDetails, setIsDetails] = useState(false)
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(null)
  const [isDelete, setIsDelete] = useState(false)
  const [isGetData, setIsGetData] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const pageSizeOptions = [10, 20, 50]
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('ld'))
  const columns = [
    {
      flex: 1,
      field: 'name',
      headerName: 'الأسم الثلاثي واللقب',
      renderCell: ({ row }) => row.name
    },
    {
      flex: 1,
      minWidth: 210,
      field: 'requestType',
      headerName: 'نوع الطلب',
      renderCell: ({ row }) => row.requestType
    },
    {
      minWidth: 110,
      field: 'phone',
      headerName: 'رقم الهاتف',
      renderCell: ({ row }) => row.phone
    },
    {
      flex: 1,
      field: 'judiciary',
      headerName: 'القضاء',
      renderCell: ({ row }) => row.judiciary
    },
    {
      flex: 1,
      field: 'region',
      headerName: 'المنطقة',
      renderCell: ({ row }) => row.region
    },
    {
      flex: 1,
      field: 'academicType',
      headerName: 'التحصيل الدراسي',
      renderCell: ({ row }) => row.academicType
    },
    {
      flex: 1,
      minWidth: 130,
      field: 'createdAt',
      headerName: 'تاريخ الاستلام',
      renderCell: ({ row }) => moment(row.createdAt).format('DD/MM/YYYY HH:mm')
    },
    {
      flex: 1,
      field: 'status',
      headerName: 'الحالة',
      minWidth: 125,
      renderCell: ({ row }) => (
        <CustomChip
          sx={{ width: '100%' }}
          label={
            row.status === 'processing' ? 'تم الاطلاع' : row.status === 'pending' ? 'لم يتم الاطلاع' : 'تم الانتهاء من'
          }
          size='small'
          skin='light'
          color={row.status === 'processing' ? 'warning' : row.status === 'pending' ? 'error' : 'success'}
        />
      )
    },
    {
      flex: 1,
      minWidth: 155,
      field: 'action',
      headerName: 'الإجراء',
      renderCell: ({ row }) => (
        <Box>
          {row.status == 'pending' ? (
            <Tooltip title='تم الاطلاع' arrow>
              <IconButton size='small' color='error' onClick={ev => handleUnReadMessage(ev, row)}>
                <Icon icon='mdi:eye-off' />
              </IconButton>
            </Tooltip>
          ) : row.status == 'processing' ? (
            <Tooltip title='تم الاطلاع' arrow>
              <IconButton size='small' color='warning' onClick={ev => handleReadMessage(ev, row)}>
                <Icon icon='mdi:eye' />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='تم الاطلاع' arrow>
              <IconButton size='small' color='success' onClick={ev => handleReadMessage(ev, row)}>
                <Icon icon='mdi:store-check-outline' />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title='ارسال رسالة' arrow>
            <IconButton size='small' color='success' onClick={ev => handleResponse(ev, row)}>
              <Icon icon='mdi:sms' fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title='حذف' arrow onClick={ev => handleRemoveMessage(ev, row)}>
            <IconButton size='small' color='error'>
              <Icon icon='mdi:trash' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  const openImage = (image) => {
    setImage(image)
    setIsImage(true)
  }

  useEffect(() => {
    fetchRequests()
  }, [isGetData, search])

  const fetchRequests = async () => {
    console.log('sdfsdfds fsdfsdf')
    const { data } = await Http.get('/admin/form/orders', {
      params: {
        search
      }
    })
    setRequests(data.requests)
  }

  const handleReadMessage = async (ev, row) => {
    ev.stopPropagation()
    const { data } = await Http.put(`/admin/form/check-order/${row._id}`, { status: 'pending' })
    if (data.status) setIsGetData(!isGetData)
  }

  const handleUnReadMessage = async (ev, row) => {
    ev.stopPropagation()
    const { data } = await Http.put(`/admin/form/check-order/${row._id}`, { status: 'processing' })
    if (data.status) setIsGetData(isGetData => !isGetData)
  }

  const handleResponse = async (ev, row) => {
    ev.stopPropagation()
    setRequest(row)
    setIsDetails(true)
  }

  const handleRemoveMessage = async (ev, row) => {
    ev.stopPropagation()
    setRequest(row)
    setIsDelete(true)
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h4'>Order Management</Typography>}
        action={
          <Box>
            <TextField
              size='small'
              placeholder='البحث'
              value={search}
              onChange={ev => setSearch(ev.target.value)}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 2, display: 'flex' }}>
                    <Icon fontSize='1.25rem' icon='tabler:search' />
                  </Box>
                ),
                endAdornment: (
                  <IconButton size='small' title='Clear' aria-label='Clear' onClick={() => setSearch('')}>
                    <Icon fontSize='1.25rem' icon='tabler:x' />
                  </IconButton>
                )
              }}
            />
          </Box>
        }
      />
      <Divider />
      <DataGrid
        autoHeight
        getRowId={row => row._id}
        rows={requests}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <OrderDetailsDialog
        open={isDetails}
        onSuccess={() => setIsGetData(isGetData => !isGetData)}
        request={request}
        onClose={() => setIsDetails(false)}
        openImage={openImage}
      />
      <DeleteOrderDialog
        open={isDelete}
        request={request}
        onSuccess={() => setIsGetData(isGetData => !isGetData)}
        onClose={() => setIsDelete(false)}
        fullScreen={fullScreen}
      />
      <OpenImageDialog open={isImage} onClose={() => setIsImage(false)} fullScreen={fullScreen} image={image} />
    </Card>
  )
}

Requests.getLayout = page => <AdminLayout>{page}</AdminLayout>
Requests.authGuard = true

export default Requests
