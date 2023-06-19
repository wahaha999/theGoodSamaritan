import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material'
import React from 'react'
import {IConnDialog, closeConnDialog} from '../../store/connectDialogSlice'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import ConnectionContent from './ConnectionContent'
import ConnectionTitle from './ConnectionTitle'

type Props = {}

const ConnectionDialog = (props: Props) => {
  const dispatch = useAppDispatch()
  const {open, info}: IConnDialog = useAppSelector(({post}) => post.connDialog)
  return (
    <Dialog open={open} maxWidth='sm' fullWidth onClose={() => dispatch(closeConnDialog())}>
      <DialogTitle>
        <ConnectionTitle info={info} />
      </DialogTitle>
      <DialogContent dividers>
        <ConnectionContent />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeConnDialog())}>Cancel</Button>
        <Button variant='contained' sx={{ml: 2}}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConnectionDialog
