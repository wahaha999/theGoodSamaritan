import {
  DialogProps,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  DialogContent,
  Button,
  styled,
} from '@mui/material'
import {AnimatePresence, motion} from 'framer-motion'
import React, {useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import Post from '../../../Post'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import CloseIcon from '@mui/icons-material/Close'
import {createComment, createPost, createReply} from '../../../store/postSlice'
import {IPostDialog, closePostDialog} from '../../../store/postDialogSlice'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import {POST_DIALOG_TITLE} from 'src/app/constants/post'
import _ from 'src/app/modules/@lodash/@lodash'
import {usePrevious} from 'src/app/modules/hooks'
import {IUploadDialog} from '../../../store/uploadDialogSlice'
import CircularWithValueLabel from './LoadingProgress'

type Props = {}

type AnimatedDialogProps = DialogProps & {
  animate?: boolean
}

export const AnimatedDialog: React.FC<AnimatedDialogProps> = ({
  open,
  onClose,
  children,
  ...props
}) => {
  return (
    <AnimatePresence>
      <Dialog
        open={open}
        onClose={onClose}
        {...props}
        sx={{'& .MuiPaper-root': {borderRadius: 4}, zIndex: 1000}}
      >
        {children}
      </Dialog>
    </AnimatePresence>
  )
}

const ProgressDialog = styled(Dialog)(({theme}) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
}))

const post_schema: any = yup.object().shape({
  purpose: yup.number().required('Purpose is required'),
  // title: yup.string().required('Title is required'),
  event_name: yup
    .string()
    .test(
      'is-event-name-required',
      'Event name is required when Purpose is That have an Event',
      function (value) {
        const {purpose} = this.parent
        if (Number(purpose) === 4 && !value) {
          return false
        }
        return true
      }
    ),
  category: yup.array().min(1, 'Category is required and must contain at least one item'),
})
const comment_schema: any = yup.object().shape({
  content: yup.string().min(9, 'Content is required and must contain at least 5 char'),
  // title: yup.string().required('Title is required'),
})

const PostDialog = (props: Props) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(({user}) => user.user)
  const {open, postType, postOption, postId}: IPostDialog = useAppSelector(
    ({post}) => post.postDialog
  )
  const {open: openProgress, progress}: IUploadDialog = useAppSelector(
    ({post}) => post.uploadDialog
  )

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(postType.includes('post') ? post_schema : comment_schema),
  })

  const {
    reset,
    formState: {isValid},
    watch,
  } = methods
  const data = watch()
  const {handleSubmit} = methods
  React.useEffect(() => {
    if (user.account) {
      if (
        (postType === 'edit_post' || postType === 'edit_comment' || postType === 'edit_reply') &&
        postOption
      ) {
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
    if (postType.includes('post')) {
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
    } else if (postType.includes('comment')) {
      let comment_data = {post_id: postId, ...data}
      dispatch(createComment(comment_data))
        .then(() => {
          // dispatch(
          //   showMessage({
          //     message: postType === 'new_comment' ? 'Successful commented' : 'Successful edited',
          //     variant: 'success',
          //   })
          // )
        })
        .catch(() => {})
        .finally(() => {
          dispatch(closePostDialog())
        })
    } else if (postType.includes('reply')) {
      let reply_data = {comment_id: postId, ...data}
      dispatch(createReply(reply_data))
        .then(() => {
          // dispatch(
          //   showMessage({
          //     message: postType === 'new_comment' ? 'Successful commented' : 'Successful edited',
          //     variant: 'success',
          //   })
          // )
        })
        .catch(() => {})
        .finally(() => {
          dispatch(closePostDialog())
        })
    }
  }
  const prevData = usePrevious(data ? _.merge({}, data) : null)
  const editIsValid = useMemo(() => {
    if (postType.includes('edit')) {
      if (_.isEqual(prevData, data)) {
        return false
      } else {
        return true
      }
    }
  }, [postType, data, prevData])

  //TODO: edit valid feature
  return (
    <>
      <AnimatedDialog
        open={open}
        scroll='paper'
        maxWidth='md'
        fullWidth
        disableEnforceFocus
        disableRestoreFocus
        disablePortal
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
                  disabled={
                    postType.includes('edit') ? (editIsValid ? !isValid : !editIsValid) : !isValid
                  }
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  {postType.includes('post')
                    ? 'Post'
                    : postType.includes('comment')
                    ? 'Comment'
                    : 'Reply'}
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
      <ProgressDialog open={openProgress}>
        <CircularWithValueLabel progress={progress} />
      </ProgressDialog>
    </>
  )
}

export default PostDialog
