import { Typography, Grid, Avatar, TextField, Badge, IconButton } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React from 'react'
import { useAppSelector } from 'src/app/store/hook';
import { toAbsoluteUrl, toServerUrl } from 'src/_metronic/helpers';

type Props = {}

const AccountInfo = (props: Props) => {
  const user= useAppSelector(({user}) => {
    return user.user
  })
  console.log("🚀 ~ file: index.tsx:11 ~ AccountInfo ~ user:", user)
  return (
    <>
      <Typography variant="h6">Your Account Number:    33</Typography>
      <Grid container  rowSpacing={4}>

      <Grid item  container alignItems="center" justifyContent="space-between">
          <Typography  variant='h6'>Upload an Image to represent your Non-Profit:</Typography>
          <Grid item md={6} container justifyContent="center">
            <Badge
              overlap="circular"
              badgeContent={
              <IconButton>
                <AddAPhotoIcon/>
              </IconButton>
            }>
              <Avatar
                alt="Remy Sharp"
                src={toServerUrl('/media/avatar/'+user?.avatar)}
                sx={{ width: 120, height: 120 }}
              />
            </Badge>
          </Grid>
      </Grid>
      <Grid item container alignItems="center" justifyContent="space-between" >
          <Typography variant='h6'>Name of Non-Profit:</Typography>
          <Grid item md={6}>
          <TextField fullWidth/>
          </Grid>
      </Grid>
      </Grid>
    </>
  )
}

export default AccountInfo