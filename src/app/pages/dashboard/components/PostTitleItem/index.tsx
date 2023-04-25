import React from 'react'
import { Stack,Grid,Typography,IconButton,Badge } from '@mui/material'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
type Props = {
    title: string,
    img: string,
    pending?: boolean,
    request?:boolean,
}

const PostTitleItem = (props: Props) => {
    const {title,img,request,pending } = props;
    return (
        <Stack sx={{ my: 1 }}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Grid container alignItems='center'>
                        {
                            request ?
                            
                        <Badge anchorOrigin={{vertical:'top',horizontal:'left'}} badgeContent={<NotificationsActiveIcon color='secondary'/>} >
                            <img width="30px" style={{borderRadius:'6px'}} src={toAbsoluteUrl(img)} alt='' />
                        </Badge>:
                            <img width="30px" style={{borderRadius:'6px'}} src={toAbsoluteUrl(img)} alt='' />
                        }
                        
                        <Typography sx={{pl:4}}>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container alignItems='center'>
                        {
                            pending && 
                            <IconButton sx={{color:'green'}}>
                                <CheckCircleOutlineIcon/>
                            </IconButton>
                        }
                        <IconButton sx={{color:'red'}}>
                            <HighlightOffIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
      </Stack>
      )
}

export default PostTitleItem