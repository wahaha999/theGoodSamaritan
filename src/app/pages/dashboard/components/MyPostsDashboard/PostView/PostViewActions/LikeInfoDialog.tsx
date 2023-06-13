import {DialogContent, DialogTitle, Typography, Grid} from '@mui/material'
import React, {useMemo} from 'react'
import LikeInfoItem from './LikeInfoItem'
import {emoji} from '.'

type Props = {
  data: any[]
}

const LikeInfoDialog = (props: Props) => {
  const {data} = props
  const title = useMemo(() => {
    const likeTypeCount: any = {}

    for (const like of data) {
      const likeType = like.like_type
      likeTypeCount[likeType] = (likeTypeCount[likeType] || 0) + 1
    }
    return likeTypeCount
  }, [data])
  return (
    <>
      <DialogTitle>
        <Grid container alignItems='center' spacing={2}>
          {Object.keys(title).map((item: any, index: number) => (
            <Grid item key={index}>
              <Typography variant='h5' key={index} sx={{display: 'inline'}}>
                {emoji[item - 1]}
              </Typography>
              <Typography sx={{display: 'inline'}}> - {title[item]}</Typography>
            </Grid>
          ))}
          <Grid item>
            <Typography>Total Reaction {data.length}</Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        {data.map((item: any, index: number) => (
          <LikeInfoItem info={item} key={index} />
        ))}
      </DialogContent>
    </>
  )
}

export default LikeInfoDialog
