import {Avatar, Box, Button, Grid, IconButton, Tooltip, Typography, styled} from '@mui/material'
import React from 'react'
import {toServerUrl} from 'src/_metronic/helpers'
import PostAccountView from 'src/app/pages/dashboard/components/MyPostsDashboard/PostView/PostViewHeader/PostAccountViewPopover'
import {reasons} from 'src/app/pages/dashboard/components/MyPostsDashboard/PostView/component/ReportDialog/ReportDialogContent/Reason'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import AlertDialog from './AlertDialog'
type Props = {
  data: any
  type: 'user' | 'non_profit'
}

const Root = styled(Box)(({theme}) => ({
  padding: 12,
  //   margin: 2,
  borderBottom: '1px solid grey',
  position: 'relative',
  //   borderRadius: 4,
}))

const SilenceUserItem = (props: Props) => {
  const {data, type} = props
  const {reported_users: user} = data
  return (
    <Root>
      {JSON.parse(data?.want)[0] === 'true' && (
        <Tooltip title='You sent email to admin'>
          <MarkEmailReadOutlinedIcon
            fontSize='small'
            sx={{position: 'absolute', top: 4, right: 10}}
          />
        </Tooltip>
      )}
      <Grid container alignItems='center'>
        <Grid item xs>
          <Grid container alignItems='center' spacing={4}>
            <Grid item>
              <PostAccountView
                avatar={
                  type === 'user'
                    ? toServerUrl(`/media/user/avatar/${user.avatar}`)
                    : toServerUrl(`/media/account/avatar/${user.account.avatar}`)
                }
                data={{user}}
                width='50px'
                height='50px'
              />
            </Grid>
            <Grid item>
              <Typography variant='h6'>
                {type === 'user'
                  ? `${user.first_name} ${user.last_name}`
                  : `${user.account.non_profit_name}`}
              </Typography>
              <Typography variant='subtitle1'>
                reason: {reasons[Number(data?.reason) - 1].title}
              </Typography>
            </Grid>
          </Grid>
          {/* <div style={{margin: '10px'}} dangerouslySetInnerHTML={{__html: data.content}}></div> */}
        </Grid>
        <Grid item>
          <Button>Show More...</Button>
          <Tooltip title='Un-Silence User'>
            {/* <IconButton>
              <HighlightOffIcon color='primary' fontSize='medium' />
            </IconButton> */}
            <AlertDialog report_id={data?.id} />
          </Tooltip>
        </Grid>
      </Grid>
    </Root>
  )
}

export default SilenceUserItem
