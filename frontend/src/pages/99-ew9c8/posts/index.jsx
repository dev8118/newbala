import { useState, useEffect } from 'react'
import { Card, CardHeader, Divider, Box, TextField, Typography, Tooltip, IconButton, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import AdminLayout from 'src/layouts/AdminLayout'
import NewPostDialog from 'src/components/99-ew9c8/posts/NewPostDialog'
import EditPostDialog from 'src/components/99-ew9c8/posts/EditPostDialog'
import DeletePostDialog from 'src/components/99-ew9c8/posts/DeletePostDialog'
import Http from 'src/services/Http'
import moment from 'moment'

const Posts = () => {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({})
  const pageSizeOptions = [10, 20, 50]
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [isGetData, setIsGetData] = useState(false)
  const [isNewPost, setIsNewPost] = useState(false)
  const [isEditPost, setIsEditPost] = useState(false)
  const [isDeletePost, setIsDeletePost] = useState(false)

  const columns = [
    {
      flex: 1,
      field: 'title',
      headerName: 'العنوان',
      renderCell: ({ row }) => row.title
    },
    {
      flex: 1,
      field: 'content',
      headerName: 'المحتوى',
      renderCell: ({ row }) => {
        return <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{extractContent(row.content)}</Box>
      }
    },
    {
      flex: 1,
      maxWidth: 150,
      field: 'category',
      headerName: 'القسم',
      renderCell: ({ row }) => row.category.name
    },
    {
      minWidth: 130,
      field: 'createdAt',
      renderCell: ({ row }) => moment(row.createdAt).format('DD/MM/YYYY HH:mm')
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
              onClick={ev => handleEditPost(ev, row)}
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
              onClick={ev => handleDeletePost(ev, row)}
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
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [isGetData, search])

  const fetchCategories = async () => {
    const { data } = await Http.get('/admin/categories')
    setCategories(data)
  }

  const fetchPosts = async () => {
    const { data } = await Http.get('/admin/posts', {
      params: {
        search
      }
    })

    setPosts(data)
  }

  const extractContent = htmlContent => {
    const span = document.createElement('span')
    span.innerHTML = htmlContent
    
return span.innerText.split(' ').slice(0, 15) + '...'
  }

  const handleEditPost = (ev, row) => {
    ev.stopPropagation()
    setPost(row)
    setIsEditPost(true)
  }

  const handleDeletePost = (ev, row) => {
    ev.stopPropagation()
    setPost(row)
    setIsDeletePost(true)
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h4'>إدارة الأخبار</Typography>}
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
            <Button variant='contained' startIcon={<Icon icon='mdi:plus' />} onClick={() => setIsNewPost(true)}>
              انشاء خبر جديد
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
        rows={posts}
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
      <NewPostDialog
        open={isNewPost}
        categories={categories}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsNewPost(false)}
      />
      <EditPostDialog
        open={isEditPost}
        categories={categories}
        post={post}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsEditPost(false)}
      />
      <DeletePostDialog
        open={isDeletePost}
        post={post}
        onSuccess={() => setIsGetData(!isGetData)}
        onClose={() => setIsDeletePost(false)}
      />
    </Card>
  )
}

Posts.getLayout = page => <AdminLayout>{page}</AdminLayout>
Posts.authGuard = true

export default Posts
