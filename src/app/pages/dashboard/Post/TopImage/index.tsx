import {orange} from '@mui/material/colors'
import {lighten, styled} from '@mui/material/styles'
import clsx from 'clsx'
// import FuseUtils from '@fuse/utils'
import {Controller, useFormContext} from 'react-hook-form'
import Box from '@mui/material/Box'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {generateGUID} from 'src/app/helpers/generate_id'
import {Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {toServerUrl} from 'src/_metronic/helpers'

const Root = styled('div')(({theme}) => ({
  margin: 4,
  '& .productImageFeaturedStar': {
    position: 'absolute',
    top: 4,
    right: 4,
    color: orange[400],
    opacity: 0,
  },

  '& .productImageUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  '& .productImageItem': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& .productImageFeaturedStar': {
        opacity: 0.8,
      },
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& .productImageFeaturedStar': {
        opacity: 1,
      },
      '&:hover .productImageFeaturedStar': {
        opacity: 1,
      },
    },
  },
}))

function TopImage() {
  const methods = useFormContext()
  const [preview, setPreview] = useState<any>([])
  const [isPreviewSet, setIsPreviewSet] = useState<boolean>(false)
  const {control, watch, setValue} = methods

  const images = watch('images')
  useEffect(() => {
    if (images.length > 0 && !isPreviewSet) {
      if (typeof images == 'string') {
        setPreview([...JSON.parse(images ? images : '[]')])
        setValue('images', [...JSON.parse(images ? images : '[]')])
        setIsPreviewSet(true)
      }
    }
  }, [images, isPreviewSet])

  return (
    <>
      <Typography sx={{m: 4}} variant='caption'>
        Attach an image to display at the top of your post
      </Typography>
      <Root>
        <div className='flex justify-center sm:justify-start flex-wrap -mx-16'>
          <Controller
            name='images'
            control={control}
            render={({field: {onChange, value}}) => (
              <>
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  component='label'
                  htmlFor='button-file'
                  className='productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                >
                  <input
                    accept='image/*'
                    className='hidden'
                    id='button-file'
                    type='file'
                    onChange={async (e: any) => {
                      function readFileAsync() {
                        return new Promise((resolve, reject) => {
                          const file = e.target.files[0]
                          if (!file) {
                            return
                          }
                          const reader = new FileReader()
                          reader.onload = () => {
                            resolve({
                              id: generateGUID(),
                              url: `data:${file.type};base64,${btoa(reader.result as string)}`,
                              type: 'image',
                            })
                          }
                          reader.onerror = reject
                          reader.readAsBinaryString(file)
                        })
                      }
                      const newImage = await readFileAsync()
                      // console.log('imagevalue==', value)
                      setPreview([newImage, ...preview])
                      onChange([
                        e.target.files[0],
                        ...(typeof value == 'string' ? JSON.parse(value) : value),
                      ])
                    }}
                  />
                  <FuseSvgIcon size={32} color='action'>
                    heroicons-outline:upload
                  </FuseSvgIcon>
                </Box>
                {preview?.map((media: any, index: number) => (
                  <div
                    onClick={() => {
                      preview.splice(index, 1)
                      let temp
                      if (typeof value == 'string') {
                        temp = JSON.parse(value)
                        temp.splice(index, 1)
                        onChange(temp)
                      } else {
                        value.splice(index, 1)
                        onChange(value)
                      }
                      // console.log('splice==', temp)
                      setPreview(preview)
                    }}
                    // onKeyDown={() => onChange(media.id)}
                    role='button'
                    tabIndex={0}
                    className='productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
                    key={index}
                  >
                    <FuseSvgIcon className='productImageFeaturedStar'>
                      heroicons-solid:trash
                    </FuseSvgIcon>
                    <img
                      className='max-w-none w-auto h-full'
                      src={
                        typeof media == 'string'
                          ? toServerUrl('/media/post/image/' + media)
                          : media.url
                      }
                      alt='product'
                    />
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </Root>
    </>
  )
}

export default TopImage