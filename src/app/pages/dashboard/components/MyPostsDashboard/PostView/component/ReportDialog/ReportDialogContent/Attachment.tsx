import {IconButton, Grid, Typography} from '@mui/material'
import {orange} from '@mui/material/colors'
import React, {useState} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {formatBytes} from 'src/app/helpers/fileHelper'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import {useAppDispatch} from 'src/app/store/hook'

type Props = {}

const readFileAsync = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader?.result === 'string') {
        resolve(`data:${file.type};base64,${btoa(reader?.result)}`)
      } else {
        return
      }
    }
    reader.onerror = reject
    reader.readAsBinaryString(file)
  })
}

const Attachment = (props: Props) => {
  const [filePreviews, setFilePreviews] = useState<any>([])
  const methods = useFormContext()
  const {formState, watch, handleSubmit, setValue} = methods

  const dispatch = useAppDispatch()
  const attachment = watch('attachment')

  const handleRemove = (index: number) => {
    filePreviews.splice(index, 1)
    attachment.splice(index, 1)

    setFilePreviews([...filePreviews])
    setValue('attachment', attachment)
  }
  return (
    <>
      <Typography mt={4}>Attach Supporting document,screen shots... </Typography>
      <Controller
        name='attachment'
        defaultValue={[]}
        render={({field: {onChange, value}}) => (
          <IconButton
            className='absolute ltr:right-0 rtl:left-0 top-0'
            size='large'
            component='label'
            sx={{mt: 1}}
          >
            <input
              id='support-attachment'
              hidden
              accept='.doc, .docx, .pdf, .exe, .jpg, .png'
              type='file'
              onChange={async (e: any) => {
                const files = Array.from(e?.target?.files || [])
                if (files.length > 5) {
                  dispatch(
                    showMessage({
                      message: 'Only allow up to 5 attachments per chat.',
                      variant: 'error',
                    })
                  )
                } else {
                  const filePreviewsPromises = files.map(async (file) => {
                    const fileDataUrl = await readFileAsync(file)
                    return {file, fileDataUrl}
                  })

                  const newFilePreviews = await Promise.all(filePreviewsPromises)
                  let canUpload = true
                  newFilePreviews.forEach((item: any) => {
                    if (item.file.size > 10485760) {
                      canUpload = false
                      return
                    }
                  })
                  if (canUpload) {
                    setFilePreviews([...filePreviews, ...newFilePreviews])
                    onChange([...(value ?? []), ...files])
                  } else {
                    dispatch(
                      showMessage({
                        message: 'Only allow sizes up to 10 MB.',
                        variant: 'error',
                      })
                    )
                  }
                }
              }}
              multiple
            />
            <FuseSvgIcon color='action'>heroicons-outline:paper-clip</FuseSvgIcon>
          </IconButton>
        )}
      />
      <Grid
        container
        direction={'row'}
        gap={1}
        sx={{paddingTop: filePreviews.length > 0 ? '12px' : '0px'}}
      >
        {filePreviews?.map((item: any, index: number) => {
          return (
            <div
              role='button'
              tabIndex={0}
              className='w-120 relative h-120 rounded-8 mx-2 mb-2 pt-1 px-2 pb-3 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
              key={index}
            >
              {/* <div> */}
              <div onClick={() => handleRemove(index)}>
                <FuseSvgIcon sx={{position: 'absolute', top: 4, right: 4, color: orange[400]}}>
                  heroicons-outline:trash
                </FuseSvgIcon>
              </div>
              {/* </div> */}
              {item.file.type.includes('image') ? (
                <>
                  <img src={item.fileDataUrl} alt='image' className='max-w-none w-auto h-full' />
                </>
              ) : (
                <div style={{marginTop: '20px'}}>
                  <FuseSvgIcon size={40} color='primary'>
                    heroicons-outline:document-text
                  </FuseSvgIcon>
                  <Typography
                    variant='h6'
                    color='text.secondary'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      paddingTop: '15px',
                      paddingBottom: '20px',
                    }}
                  >
                    {typeof item === 'string' ? item : item.file.name}
                  </Typography>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                  >
                    {typeof item === 'string' ? item : formatBytes(item.file.size)}
                  </Typography>
                </div>
              )}
            </div>
          )
        })}
      </Grid>
    </>
  )
}

export default Attachment
