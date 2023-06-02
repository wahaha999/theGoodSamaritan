import {Dialog, DialogTitle, DialogContent, Typography, DialogActions} from '@mui/material'
import React from 'react'
import {Button} from 'react-bootstrap'
import {deleteComment, deletePost} from '../../../store/postSlice'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {ICheckDialog, closeCheckDialog} from '../../../store/checkDialog'

type Props = {}

const CheckDialog = (props: Props) => {
  const dispatch = useAppDispatch()
  const {open, checkType, dialogId}: ICheckDialog = useAppSelector(({post}) => post.checkDialog)

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(closeCheckDialog())
      }}
    >
      <DialogTitle>Notice</DialogTitle>
      <DialogContent>
        <Typography>Are you sure?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          color='error'
          onClick={() => {
            if (checkType === 'post') {
              dispatch(deletePost(dialogId))
            } else {
              dispatch(deleteComment(dialogId))
            }
            dispatch(closeCheckDialog())
          }}
        >
          Yes
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            dispatch(closeCheckDialog())
          }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CheckDialog
