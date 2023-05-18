import {Button} from '@mui/base'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'

type Props = {}

const Billing = (props: Props) => {
  return (
    <Paper sx={{m: 1, p: 4}}>
      <Typography className='d-flex justify-content-center'>
        Billing Subscription Management
      </Typography>
      <TableContainer className='d-flex justify-content-center'>
        <Table sx={{minWidth: 600, width: 'fit-content'}}>
          <TableHead>
            <Typography>Billing Information</Typography>
            <Typography variant='body2'>Personal details and application.</Typography>
            <TableRow></TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>Stripe Customer</Typography>
              </TableCell>
              <TableCell>
                <Typography>slfkewflskd</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Stripe Subscription</Typography>
              </TableCell>
              <TableCell>
                <Typography>slfkewflskd</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Plan</Typography>
              </TableCell>
              <TableCell>
                <Typography>slfkewflskd</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Manage</Typography>
              </TableCell>
              <TableCell>
                <Button>Manage</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default Billing
