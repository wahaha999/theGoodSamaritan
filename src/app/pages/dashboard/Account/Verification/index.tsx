import React from 'react'
import { Typography, Button } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
type Props = {}

const Verification = (props: Props) => {
  return (
    <>
      <Typography my={3}>EIN <span>Your EIN will never be shared. It is used to verify your Non Profit status</span></Typography>
      <Typography my={3}>Upload your Non-Profit Documentation</Typography>
      <Button startIcon={<CloudUploadIcon/>} variant="contained">UploadFiles</Button>
    </>
  )
}

export default Verification