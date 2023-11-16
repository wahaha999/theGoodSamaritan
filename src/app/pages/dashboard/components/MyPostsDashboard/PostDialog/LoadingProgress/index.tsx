import * as React from 'react'
import CircularProgress, {CircularProgressProps} from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function CircularProgressWithLabel(props: CircularProgressProps & {value: number}) {
  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='body1' component='div' sx={{color: 'white'}}>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

type Props = {
  progress: number
}

export default function CircularWithValueLabel({progress}: Props) {
  return <CircularProgressWithLabel value={progress} />
}
