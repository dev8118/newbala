import { Card, CardMedia, CardContent, Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import moment from 'moment'

const PostSlideCard = ({ post }) => {
  const extractContent = htmlContent => {
    const span = document.createElement('span')
    span.innerHTML = htmlContent

    return span.innerText.split(' ').slice(0, 15) + '...'
  }

  return (
    <Card
      className='keen-slider__slide'
      sx={{
        borderRadius: '20px',
        boxShadow: 'none',
        display: 'inline-block',
        textDecoration: 'none',
        border: '0.5px solid #C6C6C6',
        p: 2
      }}
    >
      <Box>
        <CardMedia
          sx={{
            height: 200,
            backgroundSize: 'cover',
            backgroundColor: '#ccc',
            borderRadius: '8px'
          }}
          image={`/uploads/posts/${post.image}`}
        />
      </Box>
      <CardContent sx={{ p: 1 }}>
        <Box>
          <Typography
            variant='h3'
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              fontSize: 20, 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              mb: 3,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {post.title.slice(0, 20)} {post.title.length > 20 ? '...' : ''}
          </Typography>
          <Typography sx={{ 
            wordBreak: 'break-word', 
            mb: 5, 
            fontSize: 14,
          }}>{extractContent(post.content)}</Typography>
        </Box>
        <Button
          variant='contained'
          size='large'
          href={`/posts/${post._id}`}
          sx={{
            color: '#034737',
            fontSize: 14,
            borderRadius: '4px',
            backgroundColor: '#F4F7F3',
            border: '0.5px solid #5D897D',
            maxWidth: '103px',
            width: '100%'
          }}
        >
          التفاصيل
        </Button>
      </CardContent>
      <Typography 
        sx={{
          padding: 1,
          backgroundColor: '#F4F7F3',
          color: '#676767',
          fontFamily: 'DM Sans !important',
          position: 'absolute',
          top: 15,
          left: 15,
          borderRadius: '5px', 
        }}>{moment(post.createdAt).format('ll')}</Typography>
    </Card>
  )
}

export default PostSlideCard
