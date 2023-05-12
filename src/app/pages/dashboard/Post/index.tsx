import React, {memo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import PostEditor from './PostEditor'
import PostOptions from './PostOptions'
import TopImage from './TopImage'

type Props = {}

const Post = (props: Props) => {
  return (
    <>
      <PostEditor />
      <PostOptions />
      <TopImage />
    </>
  )
}

export default memo(Post)
