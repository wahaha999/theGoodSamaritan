import {orange} from '@mui/material/colors'
import {lighten, styled} from '@mui/material/styles'
import clsx from 'clsx'
// import FuseUtils from '@fuse/utils'
import {Controller, useFormContext} from 'react-hook-form'
import Box from '@mui/material/Box'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {generateGUID} from 'src/app/helpers/generate_id'
import {Typography} from '@mui/material'
import {useState} from 'react'

const Root = styled('div')(({theme}) => ({
  margin: 4,
  '& .productImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
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
  const {control, watch} = methods

  const images = watch('images')

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
                    setPreview([newImage, ...preview])
                    onChange([e.target.files[0], ...(value ? value : [])])
                  }}
                />
                <FuseSvgIcon size={32} color='action'>
                  heroicons-outline:upload
                </FuseSvgIcon>
              </Box>
            )}
          />
          <Controller
            name='featuredImageId'
            control={control}
            defaultValue=''
            render={({field: {onChange, value}}) =>
              preview?.map((media: any) => (
                <div
                  onClick={() => onChange(media.id)}
                  onKeyDown={() => onChange(media.id)}
                  role='button'
                  tabIndex={0}
                  className={clsx(
                    'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                    media.id === value && 'featured'
                  )}
                  key={media.id}
                >
                  <FuseSvgIcon className='productImageFeaturedStar'>
                    heroicons-solid:star
                  </FuseSvgIcon>
                  <img className='max-w-none w-auto h-full' src={media.url} alt='product' />
                </div>
              ))
            }
          />
        </div>
      </Root>
    </>
  )
}

export default TopImage
