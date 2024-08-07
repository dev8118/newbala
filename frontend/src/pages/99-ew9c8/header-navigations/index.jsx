import { useState, useEffect } from 'react'
import { Card, CardHeader, Divider, Box, TextField, Typography, Tooltip, IconButton, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import AdminLayout from 'src/layouts/AdminLayout'
import NewHeaderMenuDialog from 'src/components/99-ew9c8/header-navigations/NewHeaderMenuDialog'
import EditHeaderMenuDialog from 'src/components/99-ew9c8/header-navigations/EditHeaderMenuDialog'
import DeleteHeaderMenuDialog from 'src/components/99-ew9c8/header-navigations/DeleteHeaderMenuDialog'
import Http from 'src/services/Http'

const HeaderNavigations = () => {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState()
  const [navigations, setNavigations] = useState([])
  const [navigation, setNavigation] = useState({})
  const pageSizeOptions = [10, 20, 50]
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [isGetData, setIsGetData] = useState(false)
  const [isNewNavigation, setIsNewNavigation] = useState(false)
  const [isEditNavigation, setIsEditNavigation] = useState(false)
  const [isDeleteNavigation, setIsDeleteNavigation] = useState(false)

  const columns = [
    {
      flex: 1,
      maxWidth: 250,
      field: 'name',
      headerName: 'عنوان',
      renderCell: ({ row }) => row.name
    },
    {
      flex: 1,
      field: 'url',
      headerName: 'رابط',
      renderCell: ({ row }) => {
        if (row.type == 'static') {
          return <Box dir='ltr'>{row.isExternal ? row.url : `/${row.page}`}</Box>
        } else {
          return <Box dir='ltr'>/categories/{row.category}</Box>
        }
      }
    },
    {
      flex: 1,
      maxWidth: 110,
      field: 'action',
      headerName: 'الإجراء',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title='edit'>
            <Button
              variant='contained'
              size='small'
              sx={{ minWidth: 35, px: 0 }}
              onClick={ev => handleEditMenu(ev, row)}
            >
              <Icon icon='tabler:edit' />
            </Button>
          </Tooltip>
          <Tooltip title='delete'>
            <Button
              variant='contained'
              color='error'
              size='small'
              sx={{ minWidth: 35, px: 0 }}
              onClick={ev => handleDeleteMenu(ev, row)}
            >
              <Icon icon='tabler:trash' />
            </Button>
          </Tooltip>
        </Box>
      )
    }
  ]

  useEffect(() => {
    fetchHeaderNavigations()
  }, [isGetData, search])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const { data } = await Http.get('/admin/categories')
    setCategories(data)
  }

  const fetchHeaderNavigations = async () => {
    const { data } = await Http.get('/admin/header-navigations', {
      params: {
        search
      }
    })

    setNavigations(data)
  }

  const handleEditMenu = (ev, row) => {
    ev.stopPropagation()
    setNavigation(row)
    setIsEditNavigation(true)
  }

  const handleDeleteMenu = (ev, row) => {
    ev.stopPropagation()
    setNavigation(row)
    setIsDeleteNavigation(true)
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h4'>ادارة القائمة الرئيسة</Typography>}
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
                  <IconButton size='small' title='Clear' aria-label='Clear' onClick={() => setSearch('')}>
                    <Icon fontSize='1.25rem' icon='tabler:x' />
                  </IconButton>
                )
              }}
            />
            <Button variant='contained' startIcon={<Icon icon='mdi:plus' />} onClick={() => setIsNewNavigation(true)}>
              قائمة جديدة
            </Button>
          </Box>
        }
      />
      <Divider />
      <DataGrid
        autoHeight
        rowHeight={60}
        getRowId={row => row._id}
        columns={columns}
        rows={navigations}
        localeText={{
          noRowsLabel: 'لا توجد بيانات',
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
      <NewHeaderMenuDialog
        open={isNewNavigation}
        categories={categories}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsNewNavigation(false)}
      />
      <EditHeaderMenuDialog
        open={isEditNavigation}
        categories={categories}
        navigation={navigation}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsEditNavigation(false)}
      />
      <DeleteHeaderMenuDialog
        open={isDeleteNavigation}
        navigation={navigation}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsDeleteNavigation(false)}
      />
    </Card>
  )
}

HeaderNavigations.getLayout = page => <AdminLayout>{page}</AdminLayout>
HeaderNavigations.authGuard = true

export default HeaderNavigations
