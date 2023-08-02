import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import {Button, Divider, CircularProgress, Typography} from '@mui/material'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {formatBytes} from 'src/app/helpers/fileHelper'
import {showMessage} from 'src/app/store/fuse/messageSlice'

function FileUploader({key, file, onUploadComplete}) {
  const dispatch = useDispatch()
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const handleDownLoad = useCallback((event) => {
    event.stopPropagation()
    if (uploadPercentage === 0 && file.path !== undefined) {
      axios
        .post(`${API_URL}/download-attach`, file, {
          responseType: 'blob',
        })
        .then((res) => {
          let url = window.URL.createObjectURL(res.data)
          let a = document.createElement('a')
          a.href = url
          a.download = file.file_name
          a.click()
        })
        .catch((error) => {
          dispatch(showMessage({message: 'This file is not founded', variant: 'error'}))
        })
    } else {
      // TODO: handle upload cancel
    }
  }, [])

  useEffect(() => {
    if (file.file !== undefined) {
      const handleFileUpload = () => {
        let formData = new FormData()
        formData.append('file', file.file)

        axios
          .post(`${API_URL}/upload-attach`, formData, {
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
        {file.file === undefined ? formatBytes(file.file_size) : formatBytes(file.file.size)}
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
        {uploadPercentage > 0 && (
          <CircularProgress
            variant='determinate'
            value={uploadPercentage}
            sx={{width: '30px !important', height: '30px !important'}}
          />
        )}
      </div>
      <Divider variant='fullWidth' sx={{bgcolor: 'black'}}></Divider>
      <Button variant='text' color='inherit' className='w-100' onClick={(e) => handleDownLoad(e)}>
        {uploadPercentage > 0 ? 'Cancel' : 'Download'}
      </Button>
    </div>
  )
}

export default FileUploader
