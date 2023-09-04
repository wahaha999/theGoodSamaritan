import React from 'react'
import {AnimatedDialog} from '../../../PostDialog'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {closeReportDialog} from 'src/app/pages/dashboard/store/reportDialogSlice'
import {FormProvider, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {AppBar, Button, DialogContent, IconButton, Toolbar, Typography} from '@mui/material'
import {AnimatePresence, motion} from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close'
import ReportDialogContent from './ReportDialogContent'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'

type Props = {}

const schema = yup.object().shape({
  reason: yup.number().required('Reason is required'),
  want: yup
    .array()
    .of(yup.bool())
    .test('one-true', 'At least one item must be true', (values: any) =>
      values?.some((v: any) => v)
    ),
})

const ReportDialog = (props: Props) => {
  const dispatch = useAppDispatch()
  const {open, reported_user} = useAppSelector(({post}) => post.reportDialog)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const {
    reset,
    formState: {isValid},
    watch,
  } = methods
  const {handleSubmit} = methods

  const onSubmit = async (data: any) => {
    console.log('data==', data)
    const formData = new FormData()
    Object.keys(data).forEach((item) => {
      if (item === 'attachment') {
        data[item]?.map((i: any, index: number) => {
          formData.append(`attachment[${index}]`, i)
        })
      } else if (item === 'want') {
        data[item]?.map((i: any, index: number) => {
          formData.append(`want[${index}]`, i)
        })
      } else {
        formData.append(item, data[item])
      }
    })

    const res: any = await axios.post(`${API_URL}/report`, formData)

    dispatch(
      showMessage({
        message:
          res.status === 200
            ? 'Thank you. Your inquiry has been sent and we will review it as soon as possible.'
            : res.data.message,
        variant: res.status === 200 ? 'success' : 'error',
      })
    )
  }
  const handleClose = () => {
    reset()
    dispatch(closeReportDialog())
  }
  return (
    <AnimatedDialog
      open={open}
      scroll='paper'
      maxWidth='md'
      fullWidth
      disableEnforceFocus
      disableRestoreFocus
      disablePortal
      onClose={handleClose}
    >
      <FormProvider {...methods}>
        <AppBar position='static' color='default'>
          <Toolbar>
            <Typography component='div' sx={{flexGrow: 1}}>
              Silence User: {reported_user?.first_name} {reported_user?.last_name} from{' '}
              {reported_user?.account.non_profit_name}
            </Typography>
            <motion.div
              initial={{x: 30}}
              animate={{x: 0}}
              exit={{opacity: 0}}
              transition={{duration: 1}}
            >
              {/* <Grid container direction='row-reverse'> */}
              <Button
                variant='contained'
                color='success'
                sx={{
                  mx: 2,
                  borderRadius: 12,
                  '&.Mui-disabled': {
                    backgroundColor: '#a7dda7',
                    // color: 'white',
                  },
                }}
                disabled={!isValid}
                // disabled={
                //   postType.includes('edit') ? (editIsValid ? !isValid : !editIsValid) : !isValid
                // }
                onClick={() => handleSubmit(onSubmit)()}
              >
                Report
              </Button>
            </motion.div>
            <motion.div
              initial={{x: -30}}
              animate={{x: 0}}
              exit={{opacity: 0}}
              transition={{duration: 1}}
            >
              <IconButton
                size='small'
                sx={{
                  backgroundColor: 'white',
                }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </motion.div>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <ReportDialogContent />
        </DialogContent>
      </FormProvider>
    </AnimatedDialog>
  )
}

export default ReportDialog
