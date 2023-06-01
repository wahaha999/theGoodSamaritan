import {
  DialogProps,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  DialogContent,
  Button,
} from '@mui/material'
import {AnimatePresence, motion} from 'framer-motion'
import React from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import Post from '../../../Post'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import CloseIcon from '@mui/icons-material/Close'
import {createPost} from '../../../store/postSlice'
import {IPostDialog, closePostDialog} from '../../../store/postDialogSlice'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import {POST_DIALOG_TITLE} from 'src/app/constants/post'

type Props = {}

type AnimatedDialogProps = DialogProps & {
  animate?: boolean
}

const AnimatedDialog: React.FC<AnimatedDialogProps> = ({open, onClose, children, ...props}) => {
  return (
    <AnimatePresence>
      <Dialog open={open} onClose={onClose} {...props}>
        {children}
      </Dialog>
    </AnimatePresence>
  )
}

const schema: any = yup.object().shape({
  purpose: yup.number().required('Purpose is required'),
  // title: yup.string().required('Title is required'),
  event_name: yup
    .string()
    .test(
      'is-event-name-required',
      'Event name is required when Purpose is That have an Event',
      function (value) {
        const {purpose} = this.parent
        if (purpose == 4 && !value) {
          return false
        }
        return true
      }
    ),
  category: yup.array().min(1, 'Category is required and must contain at least one item'),
})

const PostDialog = (props: Props) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(({user}) => user.user)
  const {open, postType, postOption}: IPostDialog = useAppSelector(({post}) => post.postDialog)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })

  const {
    reset,
    formState: {isValid},
  } = methods
  const {handleSubmit} = methods
  React.useEffect(() => {
    if (user.account) {
      if (postType === 'edit_post' && postOption) {
        reset({
          ...postOption,
        })
      } else {
        const {address, state, city, zip_code, timezone} = user.account
        reset({
          content: '',
          event_name: undefined,
          category: undefined,
          images: [],
          timezone,
          purpose: undefined,
          address,
          state,
          city,
          zip_code,
          location: {lat: 10.99835602, lng: 77.01502627},
        })
      }
    }
  }, [user, open, reset, postType, postOption])

  const onSubmit = (data: any) => {
    dispatch(createPost(data))
      .then(() => {
        dispatch(
          showMessage({
            message: postType === 'new_post' ? 'Successful posted' : 'Successful edited',
            variant: 'success',
          })
        )
      })
      .catch(() => {})
      .finally(() => {
        dispatch(closePostDialog())
      })
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
      sx={{zIndex: 1000}}
    >
      <FormProvider {...methods}>
        {/* <DialogTitle> */}
        <AppBar position='static' color='default'>
          <Toolbar>
            <Typography component='div' sx={{flexGrow: 1}}>
              {POST_DIALOG_TITLE[postType]}
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
                onClick={() => handleSubmit(onSubmit)()}
              >
                Post
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
                onClick={() => {
                  dispatch(closePostDialog())
                }}
              >
                <CloseIcon />
              </IconButton>
            </motion.div>
          </Toolbar>
        </AppBar>
        <DialogContent tabIndex={-1}>
          <Post />
        </DialogContent>
      </FormProvider>
    </AnimatedDialog>
  )
}

export default PostDialog
