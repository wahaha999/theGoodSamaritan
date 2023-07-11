import React, {useMemo} from 'react'
import {Carousel} from 'react-responsive-carousel'
import {toServerUrl} from 'src/_metronic/helpers'
import ImageSlider from '../../../ImageSlider/ImageSlider'

type Props = {post: any; type: 'comment' | 'post' | 'reply'; innerWidth: number}

const PostViewMedia = (props: Props) => {
  const {post, type, innerWidth} = props

  const slides = useMemo(() => {
    return JSON.parse(post.images).map((item: any, index: number) => ({
      url: toServerUrl('/media/post/image/' + item),
      title: item,
    }))
  }, [post.images])

  return (
    <div style={{width: `${innerWidth - 50}px`, height: '400px', margin: '0 auto'}}>
      <ImageSlider slides={slides} parentWidth={innerWidth - 50} />
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
