import {DialogContent, DialogTitle, Typography, Grid, DialogActions, Button} from '@mui/material'
import React, {useMemo} from 'react'
import LikeInfoItem from './LikeInfoItem'
import {emoji} from 'src/app/constants/emoji'

type Props = {
  data: any[]
  onClose: () => void
}

const LikeInfoDialog = (props: Props) => {
  const {data, onClose} = props
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
              <img src={emoji[item - 1].url} className='w-24 h-24 inline' alt='like' />

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
      <DialogActions>
        <Button onClick={onClose} variant='contained'>
          cancel
        </Button>
      </DialogActions>
    </>
  )
}

export default LikeInfoDialog
