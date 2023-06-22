import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material'
import React from 'react'
import {IConnDialog, closeConnDialog} from '../../store/connectDialogSlice'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import ConnectionContent from './ConnectionContent'
import ConnectionTitle from './ConnectionTitle'
import {FormProvider, useForm} from 'react-hook-form'
import {IMessage, createChatRoom} from '../ChatSidePanel/store/chatRoomSlice'

type Props = {}

const ConnectionDialog = (props: Props) => {
  const methods = useForm({
    mode: 'onChange',
  })

  const {handleSubmit, reset} = methods
  const dispatch = useAppDispatch()
  const {open, info}: IConnDialog = useAppSelector(({post}) => post.connDialog)
  const handleMessage = (data: any) => {
    // console.log('data=', data, info)
    const mdata: IMessage = {...data, receiver: info.id}
    dispatch(createChatRoom(mdata))
    dispatch(closeConnDialog())
  }

  return (
    <Dialog open={open} maxWidth='sm' fullWidth onClose={() => dispatch(closeConnDialog())}>
      <FormProvider {...methods}>
        <DialogTitle>
          <ConnectionTitle info={info} />
        </DialogTitle>
        <DialogContent dividers>
          <ConnectionContent />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(closeConnDialog())}>Cancel</Button>
          <Button variant='contained' sx={{ml: 2}} onClick={handleSubmit(handleMessage)}>
            Send
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}

export default ConnectionDialog
