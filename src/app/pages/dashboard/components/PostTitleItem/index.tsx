import React from 'react'
import { Stack,Grid,Typography,IconButton } from '@mui/material'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
type Props = {
    title: string,
    img:string
}

const PostTitleItem = (props: Props) => {
    const {title,img } = props;
    return (
        <Stack sx={{ my: 1 }}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Grid container alignItems='center'>
                        <img width="30px" style={{borderRadius:'6px'}} src={toAbsoluteUrl(img)} alt='' />
                        <Typography sx={{pl:4}}>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <IconButton>
                        <HighlightOffIcon/>
                    </IconButton>
                </Grid>
            </Grid>
      </Stack>
      )
}

export default PostTitleItem