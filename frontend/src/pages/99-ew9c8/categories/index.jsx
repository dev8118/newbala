import { useState, useEffect } from 'react'
import { Card, CardHeader, Divider, Box, TextField, Typography, Tooltip, IconButton, Button, Chip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import AdminLayout from 'src/layouts/AdminLayout'
import NewCategoryDialog from 'src/components/99-ew9c8/categories/NewCategoryDialog'
import EditCategoryDialog from 'src/components/99-ew9c8/categories/EditCategoryDialog'
import DeleteCategoryDialog from 'src/components/99-ew9c8/categories/DeleteCategoryDialog'
import Http from 'src/services/Http'

const Categories = () => {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({})
  const pageSizeOptions = [10, 20, 50]
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [isGetData, setIsGetData] = useState(false)
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [isEditCategory, setIsEditCategory] = useState(false)
  const [isDeleteCategory, setIsDeleteCategory] = useState(false)

  const columns = [
    {
      flex: 1,
      field: 'name',
      headerName: 'الاسم',
      renderCell: ({ row }) => row.title
    },
    {
      flex: 1,
      field: 'description',
      headerName: 'الوصف',
      renderCell: ({ row }) => row.content
    },
    {
      flex: 1,
      maxWidth: 120,
      field: 'isFeature',
      headerName: 'قسم الأخبار الرئيسة',
      renderCell: ({ row }) => (
        <Chip
          label={row.isFeature ? 'خاص' : 'عادي'}
          color={row.isFeature ? 'success' : 'primary'}
          size='small'
          sx={{ width: '100%' }}
        />
      )
    },
    {
      flex: 1,
      maxWidth: 150,
      field: 'isTab',
      headerName: 'ظهور قسم النشاطات',
      renderCell: ({ row }) => (
        <Chip
          label={row.isTab ? 'مرئي' : 'غير مرئية'}
          color={row.isTab ? 'primary' : 'error'}
          size='small'
          sx={{ width: '100%' }}
        />
      )
    },
    {
      flex: 1,
      maxWidth: 120,
      field: 'isPublish',
      headerName: 'قسم الإصدارات',
      renderCell: ({ row }) =>
        row.isPublish == true && <Chip label='قسم الإصدارات' color='primary' size='small' sx={{ width: '100%' }} />
    },
    {
      flex: 1,
      maxWidth: 120,
      field: 'isAdvertisement',
      headerName: 'قسم الاعلانات',
      renderCell: ({ row }) =>
        row.isAdvertisement && <Chip label='قسم الاعلانات' color='primary' size='small' sx={{ width: '100%' }} />
    },
    {
      flex: 1,
      maxWidth: 105,
      field: 'action',
      headerName: 'الإجراء',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title='يحرر'>
            <Button
              variant='contained'
              size='small'
              sx={{ minWidth: 35, px: 0 }}
              onClick={ev => handleEditCategory(ev, row)}
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
              onClick={ev => handleDeleteCategory(ev, row)}
            >
              <Icon icon='tabler:trash' />
            </Button>
          </Tooltip>
        </Box>
      )
    }
  ]

  useEffect(() => {
    fetchCategories()
  }, [isGetData, search])

  const fetchCategories = async () => {
    const { data } = await Http.get('/admin/categories', {
      params: {
        search
      }
    })
    setCategories(data)
  }

  const handleEditCategory = (ev, row) => {
    ev.stopPropagation()
    setCategory(row)
    setIsEditCategory(true)
  }

  const handleDeleteCategory = (ev, row) => {
    ev.stopPropagation()
    setCategory(row)
    setIsDeleteCategory(true)
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h4'>ادارة القسم</Typography>}
        action={
          <Box sx={{ display: 'flex', gap: 3 }}>
            <TextField
              size='small'
              placeholder='يبحث'
              value={search}
              onChange={ev => setSearch(ev.target.value)}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 2, display: 'flex' }}>
                    <Icon fontSize='1.25rem' icon='tabler:search' />
                  </Box>
                ),
                endAdornment: (
                  <IconButton size='small' title='البحث' aria-label='واضح' onClick={() => setSearch('')}>
                    <Icon fontSize='1.25rem' icon='tabler:x' />
                  </IconButton>
                )
              }}
            />
            <Button variant='contained' startIcon={<Icon icon='mdi:plus' />} onClick={() => setIsNewCategory(true)}>
              انشاء قسم جديد
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
        rows={categories}
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
      <NewCategoryDialog
        open={isNewCategory}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsNewCategory(false)}
      />
      <EditCategoryDialog
        open={isEditCategory}
        category={category}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsEditCategory(false)}
      />
      <DeleteCategoryDialog
        open={isDeleteCategory}
        category={category}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsDeleteCategory(false)}
      />
    </Card>
  )
}

Categories.getLayout = page => <AdminLayout>{page}</AdminLayout>
Categories.authGuard = true

export default Categories
