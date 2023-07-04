import {CardContent, Grid, Typography, Chip} from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'

type Props = {
  post: any
  type: 'comment' | 'post' | 'reply'
}

function PostViewContent(props: Props) {
  const {post, type} = props
  if (type !== 'comment') {
    return (
      <CardContent>
        <Grid container alignItems='center' sx={{mb: 1}}>
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
              {post?.address} , {post?.city} {post?.state}
            </Typography>
          ) : (
            <Typography color='purple'>
              lat: {post?.lat} lng: {post?.lng}
            </Typography>
          )}
        </Grid>
        {type === 'post' && (
          <Grid container alignItems='center' gap={2}>
            {post?.keyword != 'null' &&
              JSON.parse(post?.keyword ? post?.keyword : '[]').length > 0 && (
                <Typography variant='caption'>Keyword: </Typography>
              )}
            {post?.keyword != 'null' &&
              JSON.parse(post?.keyword ? post?.keyword : '[]').map(
                (item: string, index: number) => <Chip label={item} key={index} />
              )}
          </Grid>
        )}
      </CardContent>
    )
  }
  else {
    return null; // or return an empty fragment: <></>
  }
}

export default PostViewContent
