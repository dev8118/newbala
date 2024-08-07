import { Card, CardMedia, CardContent, Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import moment from 'moment'

const PostCard = ({ post }) => {
  const extractContent = htmlContent => {
    const span = document.createElement('span')
    span.innerHTML = htmlContent
    return span.innerText.split(' ').slice(0, 18) + '...'
  }

  return (
    <Card
      sx={{ 
        display: 'inline-block', 
        width: '100%', 
        textDecoration: 'none', 
        borderRadius: '32px', 
        boxShadow: 'none',
        border: '0.5px solid #C6C6C6',
        backgroundColor: '#FAFAFA',
        p: 2, 
        position: 'relative',
        height: '570px',
      }}>
      <Box sx={{ p: 2 }}>
        <CardMedia
          sx={{ 
            height: '295px', 
            backgroundSize: 'cover', 
            backgroundColor: '#ccc',
            borderRadius: '8px' 
          }}
          image={`/uploads/posts/${post?.image}`}
        />
      </Box>
      <CardContent sx={{ pt: {sm: 4, xs: 1 }, pb: 0 }}>
        <Box sx={{ minHeight: { sm: 200, xs: 100 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              variant='h3'
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                mb: 3
              }}
            >
              {post?.title}
            </Typography>
            <Typography sx={{ wordBreak: 'break-word', mb: { sm: 5.5, xs: 2 } }}>{extractContent(post?.content)}</Typography>
          </Box>
          <Button variant='contained' size='large' href={`/posts/${post._id}`}  
              sx={{ 
                color: '#034737', 
                borderRadius: '4px', 
                backgroundColor: '#F4F7F3', 
                border: '0.5px solid #5D897D',
                maxWidth: '118px',
                width: '100%'
              }}>
              التفاصيل
          </Button>
          <Typography 
            sx={{ 
              padding: 1,
              backgroundColor: '#F4F7F3',
              color: '#676767',
              fontFamily: 'DM Sans !important',
              position: 'absolute',
              top: 30,
              left: 30,
              borderRadius: '5px', 
            }}>{moment(post?.createdAt).format('ll')}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PostCard
