import { useState, useEffect } from 'react'
import { Card, CardHeader, Divider, Box, TextField, Typography, Tooltip, IconButton, Button, Chip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import AdminLayout from 'src/layouts/AdminLayout'
import NewServiceDialog from 'src/components/99-ew9c8/services/NewServiceDialog'
import EditServiceDialog from 'src/components/99-ew9c8/services/EditServiceDialog'
import DeleteServiceDialog from 'src/components/99-ew9c8/services/DeleteServiceDialog'
import Http from 'src/services/Http'

const Videos = () => {
  const [search, setSearch] = useState('')
  const [services, setServices] = useState([])
  const [service, setService] = useState({})
  const pageSizeOptions = [10, 20, 50]
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [isGetData, setIsGetData] = useState(false)
  const [isNewService, setIsNewService] = useState(false)
  const [isEditService, setIsEditService] = useState(false)
  const [isDeleteService, setIsDeleteService] = useState(false)

  const columns = [
    {
      flex: 1,
      field: 'title',
      headerName: 'عنوان',
      renderCell: ({ row }) => row.title
    },
    {
      flex: 1,
      field: 'items',
      headerName: 'وصلة',
      renderCell: ({ row }) => (
        <ul>
          {row.description.split(/\r*\n/).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )
    },
    {
      flex: 1,
      maxWidth: 110,
      field: 'action',
      headerName: 'الإجراء',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Tooltip title='يحرر'>
            <Button
              variant='contained'
              size='small'
              sx={{ minWidth: 35, px: 0 }}
              onClick={ev => handleEditService(ev, row)}
            >
              <Icon icon='tabler:edit' />
            </Button>
          </Tooltip>
          <Tooltip title='يمسح'>
            <Button
              variant='contained'
              color='error'
              size='small'
              sx={{ minWidth: 35, px: 0 }}
              onClick={ev => handleDeleteService(ev, row)}
            >
              <Icon icon='tabler:trash' />
            </Button>
          </Tooltip>
        </Box>
      )
    }
  ]

  useEffect(() => {
    fetchServices()
  }, [isGetData, search])

  const fetchServices = async () => {
    const { data } = await Http.get('/admin/services', {
      params: {
        search
      }
    })
    setServices(data)
  }

  const handleEditService = (ev, row) => {
    ev.stopPropagation()
    setService(row)
    setIsEditService(true)
  }

  const handleDeleteService = (ev, row) => {
    ev.stopPropagation()
    setService(row)
    setIsDeleteService(true)
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h4'>إدارة الخدمات</Typography>}
        action={
          <Box sx={{ display: 'flex', gap: 3 }}>
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
                  <IconButton size='small' title='واضح' aria-label='واضح' onClick={() => setSearch('')}>
                    <Icon fontSize='1.25rem' icon='tabler:x' />
                  </IconButton>
                )
              }}
            />
            <Button variant='contained' startIcon={<Icon icon='mdi:plus' />} onClick={() => setIsNewService(true)}>
              خدمة جديدة
            </Button>
          </Box>
        }
      />
      <Divider />
      <DataGrid
        autoHeight
        rowHeight={80}
        getRowId={row => row._id}
        columns={columns}
        rows={services}
        localeText={{
          noRowsLabel: 'لا توجد صفوف',
          footerTotalRows: 'إجمالي الصفوف:',
          columnMenuFilter: 'منقي',
          columnMenuHideColumn: 'إخفاء العمود',
          columnMenuManageColumns: 'إدارة الأعمدة',
          columnMenuSortAsc: 'الترتيب حسب تصاعدي',
          columnMenuSortDesc: 'الترتيب تنازلياً',
          footerRowSelected: count =>
            count !== 1 ? `${count.toLocaleString()} الصفوف المحددة` : `${count.toLocaleString()} الصفوف المحددة`,
          footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} من ${totalCount.toLocaleString()}`
        }}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <NewServiceDialog
        open={isNewService}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsNewService(false)}
      />
      <EditServiceDialog
        open={isEditService}
        service={service}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsEditService(false)}
      />
      <DeleteServiceDialog
        open={isDeleteService}
        service={service}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsDeleteService(false)}
      />
    </Card>
  )
}

Videos.getLayout = page => <AdminLayout>{page}</AdminLayout>
Videos.authGuard = true

export default Videos
