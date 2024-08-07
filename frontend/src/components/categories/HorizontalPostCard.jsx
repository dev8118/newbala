import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import Link from 'next/link'
import moment from 'moment'

const HorizontalPostCard = ({ post }) => {
  const extractContent = htmlContent => {
    const span = document.createElement('span')
    span.innerHTML = htmlContent

    return span.innerText.split(' ').slice(0, 50) + '...'
  }

  return (
    <Card
      component={Link}
      href={`/posts/${post._id}`}
      sx={{
        textDecoration: 'none',
        borderRadius: 0,
        boxShadow: 'none',
        display: 'flex',
        p: 5,
        borderTop: '1px solid #EBF2FE'
      }}
    >
      <CardMedia
        component='img'
        sx={{ maxWidth: 300, maxHeight: 210, objectFit: 'contain', backgroundColor: '#ccc', borderRadius: '8px' }}
        src={`/uploads/posts/${post.image}`}
        alt={post.title}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Typography>{moment(post?.createdAt).format( 'LL' )}</Typography>
        <Typography
          variant='h3'
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mb: 3
          }}
        >
          {post.title}
        </Typography>
        <Typography
          sx={{
            wordBreak: 'break-word',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            color: '#232E52',
            textOverflow: 'ellipsis'
          }}
        >
          {extractContent(post.content)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default HorizontalPostCard
