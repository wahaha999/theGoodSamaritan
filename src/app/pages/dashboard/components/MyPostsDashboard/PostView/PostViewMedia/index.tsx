import React, {useMemo} from 'react'
import {toServerUrl} from 'src/_metronic/helpers'
import ImageSlider from '../../../ImageSlider/ImageSlider'

type Props = {post: any; type: 'comment' | 'post' | 'reply'}

const PostViewMedia = (props: Props) => {
  const {post, type} = props

  const slides = useMemo(() => {
    return JSON.parse(post.images).map((item: any, index: number) => ({
      original: toServerUrl('/media/post/image/' + item),
      originalHeight: '400px',
      // title: item,
    }))
  }, [post.images])

  return (
    <div style={{width: '100%', height: '400px', margin: '0 auto', padding: '0 20px'}}>
      <ImageSlider slides={slides} />
    </div>
    // <Carousel showThumbs={false} infiniteLoop dynamicHeight>
    //   {JSON.parse(post?.images).map((item: any, index: number) => (
    //     <div key={index}>
    //       <img
    //         src={toServerUrl('/media/post/image/' + item)}
    //         style={{height: 'unset', objectFit: 'cover'}}
    //         alt={item}
    //       />
    //     </div>
    //   ))}
    // </Carousel>
  )
}

export default PostViewMedia
