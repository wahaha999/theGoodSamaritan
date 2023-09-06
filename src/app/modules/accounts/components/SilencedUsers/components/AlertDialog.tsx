import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {IconButton} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {useAppDispatch} from 'src/app/store/hook'
import {deleteReportUser} from 'src/app/pages/dashboard/store/reportDialogSlice'

type Props = {
  report_id: number
}

export default function AlertDialog({report_id}: Props) {
  const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <HighlightOffIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You will be able to view all material produced by this user
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            Disagree
          </Button>
          <Button
            color='error'
            variant='outlined'
            onClick={() => {
              dispatch(deleteReportUser(report_id))
              handleClose()
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
