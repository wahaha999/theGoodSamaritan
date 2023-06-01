import {CardContent, Grid, Typography, Chip} from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'

type Props = {
  post: any
}

function PostViewContent(props: Props) {
  const {post} = props
  return (
    <CardContent>
      <Grid container alignItems='center' sx={{mb: 2}}>
        <LocationOnIcon color='primary' sx={{mr: 2}} />
        {post?.address ? (
          <Typography
            color='purple'
            component='a'
            target='_blank'
            href={`https://www.google.com/maps/place/${post?.address || ''} ${post?.city || ''} ${
              post?.state || ''
            } ${post?.zip_code || ''}`}
          >
            {post?.address}
          </Typography>
        ) : (
          <Typography color='purple'>
            lat: {post?.lat} lng: {post?.lng}
          </Typography>
        )}
      </Grid>
      <Grid container alignItems='center' gap={2}>
        {post?.keyword != 'null' && JSON.parse(post?.keyword ? post?.keyword : '[]').length > 0 && (
          <Typography variant='caption'>Keyword: </Typography>
        )}
        {post?.keyword != 'null' &&
          JSON.parse(post?.keyword ? post?.keyword : '[]').map((item: string, index: number) => (
            <Chip label={item} key={index} />
          ))}
      </Grid>
    </CardContent>
  )
}

export default PostViewContent
