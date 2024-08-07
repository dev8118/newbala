import { useState, useEffect } from 'react'
import AdminLayout from 'src/layouts/AdminLayout'
import { Card, CardHeader, Divider, Box, TextField, Typography, Tooltip, IconButton, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomChip from 'src/@core/components/mui/chip'
import Icon from 'src/@core/components/icon'
import Http from 'src/services/Http'
import moment from 'moment'
import ContactEmailDialog from 'src/components/99-ew9c8/contacts/ContactEmailDialog'
import ContactSmsDialog from 'src/components/99-ew9c8/contacts/ContactSmsDialog'
import DeleteContactDialog from 'src/components/99-ew9c8/contacts/DeleteContactDialog'

const Contacts = () => {
  const [search, setSearch] = useState('')
  const [contacts, setContacts] = useState([])
  const [contact, setContact] = useState({})
  const [isEmail, setIsEmail] = useState(false)
  const [isSms, setIsSms] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isGetData, setIsGetData] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const pageSizeOptions = [10, 20, 50]

  const columns = [
    {
      flex: 1,
      field: 'name',
      headerName: 'الاسم',
      renderCell: ({ row }) => row.name
    },
    {
      flex: 1,
      minWidth: 210,
      field: 'email',
      headerName: 'البريد الإلكتروني',
      renderCell: ({ row }) => row.email
    },
    {
      minWidth: 110,
      field: 'phone',
      headerName: 'رقم الهاتف',
      renderCell: ({ row }) => row.phone
    },
    {
      flex: 4,
      field: 'message',
      headerName: 'الرسالة',
      renderCell: ({ row }) => row.message
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
          label={row.status === true ? 'تم الاطلاع' : 'لم يتم الاطلاع'}
          size='small'
          skin='light'
          color={row.status === true ? 'success' : 'error'}
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
          {row.status ? (
            <Tooltip title='تم الاطلاع' arrow>
              <IconButton size='small' color='error' onClick={ev => handleUnReadMessage(ev, row)}>
                <Icon icon='mdi:eye-off' />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='تم الاطلاع' arrow>
              <IconButton size='small' color='primary' onClick={ev => handleReadMessage(ev, row)}>
                <Icon icon='mdi:eye' />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title='ارسال ايميل' arrow>
            <IconButton size='small' color='primary' onClick={ev => handleSendEmail(ev, row)}>
              <Icon icon='mdi:email' />
            </IconButton>
          </Tooltip>
          <Tooltip title='ارسال رسالة' arrow>
            <IconButton size='small' color='primary' onClick={ev => handleSendSms(ev, row)}>
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

  useEffect(() => {
    fetchContacts()
  }, [isGetData, search])

  const fetchContacts = async () => {
    const { data } = await Http.get('/admin/contacts', {
      params: {
        search
      }
    })
    setContacts(data)
  }

  const handleReadMessage = async (ev, row) => {
    ev.stopPropagation()
    const { data } = await Http.put(`/admin/contacts/${row._id}`, { status: true })
    if (data.status) setIsGetData(!isGetData)
  }

  const handleUnReadMessage = async (ev, row) => {
    ev.stopPropagation()
    const { data } = await Http.put(`/admin/contacts/${row._id}`, { status: false })
    if (data.status) setIsGetData(isGetData => !isGetData)
  }

  const handleSendEmail = async (ev, row) => {
    ev.stopPropagation()
    setContact(row)
    setIsEmail(true)
  }

  const handleSendSms = async (ev, row) => {
    ev.stopPropagation()
    setContact(row)
    setIsSms(true)
  }

  const handleRemoveMessage = async (ev, row) => {
    ev.stopPropagation()
    setContact(row)
    setIsDelete(true)
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h4'>ادارة جهات الاتصال</Typography>}
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
        rows={contacts}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <ContactEmailDialog open={isEmail} contact={contact} onClose={() => setIsEmail(false)} />
      <ContactSmsDialog open={isSms} contact={contact} onClose={() => setIsSms(false)} />
      <DeleteContactDialog
        open={isDelete}
        contact={contact}
        onSuccess={() => setIsGetData(isGetData => !isGetData)}
        onClose={() => setIsDelete(false)}
      />
    </Card>
  )
}

Contacts.getLayout = page => <AdminLayout>{page}</AdminLayout>
Contacts.authGuard = true

export default Contacts
