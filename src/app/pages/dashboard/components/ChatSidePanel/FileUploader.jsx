import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {Button, Divider, LinearProgress, Typography} from '@mui/material'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {formatBytes} from 'src/app/helpers/fileHelper'

function FileUploader({key, file, onUploadComplete}) {
  const [uploadPercentage, setUploadPercentage] = useState(0)

  useEffect(() => {
    if (file.file !== undefined) {
      const handleFileUpload = () => {
        let formData = new FormData()
        formData.append('file', file)

        axios
          .post(`${API_URL}/account/update`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              setUploadPercentage(
                parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
              )
            },
          })
          .then((response) => {
            setUploadPercentage(0)
            onUploadComplete(response.data) // Passing the response to the parent component
          })
          .catch(() => setUploadPercentage(0))
      }

      handleFileUpload()
    } else {
      onUploadComplete(file)
    }
  }, [])

  return (
    <div
      key={key}
      className='w-160 h-120 rounded-8 mt-3 py-4 px-3 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
    >
      <Typography
        variant='h6'
        color='text.secondary'
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {file.file === undefined ? file.file_name : file.file.name}
      </Typography>
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
      >
        {file.file === undefined ? file.file_size : formatBytes(file.file.size)}
      </Typography>
      <div className='flex align-items-center pt-7 pb-3'>
        <FuseSvgIcon size={30}>heroicons-outline:document-text</FuseSvgIcon>
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginRight: 'auto',
            marginLeft: '4px',
          }}
        >
          File
        </Typography>
        {uploadPercentage > 0 && <LinearProgress variant='determinate' value={uploadPercentage} />}
      </div>
      <Divider variant='fullWidth' sx={{bgcolor: 'black'}}></Divider>
      <Button variant='text' color='inherit' className='w-100'>
        {uploadPercentage > 0 ? 'Cancel' : 'Download'}
      </Button>
    </div>
  )
}

export default FileUploader
