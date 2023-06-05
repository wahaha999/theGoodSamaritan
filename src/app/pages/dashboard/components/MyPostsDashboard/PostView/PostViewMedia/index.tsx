import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {toServerUrl} from 'src/_metronic/helpers'

type Props = {post: any; type: 'comment' | 'post' | 'reply'}

const PostViewMedia = (props: Props) => {
  const {post, type} = props
  return (
    <Carousel showThumbs={false} infiniteLoop dynamicHeight>
      {JSON.parse(post?.images).map((item: any, index: number) => (
        <div key={index}>
          <img
            src={toServerUrl('/media/post/image/' + item)}
            style={{height: 'unset', objectFit: 'cover'}}
            alt={item}
          />
        </div>
      ))}
    </Carousel>
  )
}

export default PostViewMedia
