import React from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import PostEditor from './PostEditor'
import PostOptions from './PostOptions'

type Props = {}

const Post = (props: Props) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <PostEditor />
      <PostOptions />
    </FormProvider>
  )
}

export default Post
