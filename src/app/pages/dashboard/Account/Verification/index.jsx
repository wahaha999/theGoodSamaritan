import React, { useCallback, useEffect, useState } from 'react'
import {Typography, Button, TextField, InputAdornment, Grid, IconButton, Chip} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {Controller, useForm, useFormContext} from 'react-hook-form'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { API_URL } from 'src/app/modules/auth/core/_requests'
import { useDispatch } from 'react-redux'
import { showMessage } from 'src/app/store/fuse/messageSlice'
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Verification = (props) => {
  const [loading, setLoading] = useState(false);
   const methods = useFormContext()
  const {control, formState, watch,resetField,reset} = methods
  const dispatch = useDispatch();
  const { errors } = formState
  const [filePreviews, setFilePreviews] = useState([]);
  const doc = watch('doc');
  // console.log("🚀 ~ file: index.jsx:23 ~ Verification ~ doc:", doc)
  useEffect(() => {
    if (typeof doc !== 'string') {
      
      setFilePreviews([...doc])
    } else {
      
      setFilePreviews([...JSON.parse(doc)])
    }
  },[])

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader?.result === 'string') {
          resolve(`data:${file.type};base64,${btoa(reader?.result)}`);
        } else {
          return;
        }
      };
      reader.onerror = reject;
      reader.readAsBinaryString(file);
    });
  };

  const handleRemove = (index,onChange) => {
    let files = filePreviews.splice(index, 1);
    setFilePreviews([...filePreviews]);
    onChange([...filePreviews])
    // reset('doc',[...filePreviews])
  }
  
   const handleDownLoad = useCallback((event, name) => {
    event.stopPropagation()
     setLoading(true);
    axios.post(
        `${API_URL}/account/download-doc`,
        { name },
        {
          responseType: 'blob',
        }
      )
      .then((res) => {
        let url = window.URL.createObjectURL(res.data)
        let a = document.createElement('a')
        a.href = url
        a.download = name
        a.click()
        setLoading(false);
      })
      .catch((error) => {
        dispatch(showMessage({message:'This file is not founded',variant:'error'}))
        setLoading(false);
      })
  }, [])

  return (
    <>
      <Typography my={3}>
        EIN <span>Your EIN will never be shared. It is used to verify your Non Profit status</span>
      </Typography>
      <Controller
        name='EIN'
        control={control}
        render={({field}) => (
          <TextField
            className='mt-32'
            required
            {...field}
            label='Enter your EIN'
            placeholder="12-3456789"
            id='EIN'
            error={!!errors.EIN}
            helperText={errors?.EIN?.message }
            variant='outlined'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FuseSvgIcon size={20} >heroicons-solid:location-marker</FuseSvgIcon>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Typography mt={1}>Your EIN should be in the format of two digits separated by a hyphen, followed by seven more digits</Typography>
      <Typography my={3}>Upload your Non-Profit Documentation</Typography>
      <Controller
        name='doc'
        // defaultValue={[]}
        control={control}
        render={({ field: { onChange, value } }) => {
          // setFilePreviews([...filePreviews,...value])
          // console.log('value==',value)
          return (
          <>
            <Button startIcon={<CloudUploadIcon />} variant='contained' component='label'>
              <input
                hidden
                accept=".doc, .docx, .pdf"
                type='file'
                onChange={async (e) => {
                  const files = Array.from(e.target.files);
                  // onChange(files);
                  const filePreviewsPromises = files.map(async (file) => {
                    const fileDataUrl = await readFileAsync(file);
                    return { file, fileDataUrl };
                  });

                  const newFilePreviews = await Promise.all(filePreviewsPromises);
                  setFilePreviews([...filePreviews, ...newFilePreviews]);
                  onChange([...filePreviews, ...newFilePreviews]);
                }}
                multiple
              />
              Upload Files
            </Button>
            <Grid container mt={2}>
              {
                filePreviews?.map((item, index) => (
                  <Chip
                    key={index}
                    // loading={loading}
                    label={typeof item === 'string' ? item : item.file.name}
                    variant='outlined'
                  onClick={(e) => handleDownLoad(e, typeof item === 'string' ? item : item?.file.name)}
                  // loadingIndicator="downloading..."
                  // loadingPosition="center"
                    onDelete={() => handleRemove(index,onChange)}
                />
                  
                ))
              }
            </Grid>
          </>
        )}}
      />
    </>
  )
}

export default Verification
