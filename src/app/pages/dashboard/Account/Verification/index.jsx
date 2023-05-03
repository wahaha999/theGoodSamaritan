import React from 'react'
import {Typography, Button, TextField, InputAdornment} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {Controller, useForm, useFormContext} from 'react-hook-form'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'


const Verification = (props) => {
   const methods = useFormContext()
  const {control, formState, watch} = methods

  const {errors} = formState

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
            label='EIN'
            placeholder='EIN'
            id='EIN'
            error={!!errors.EIN}
            helperText={errors?.EIN?.message }
            variant='outlined'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Typography my={3}>Upload your Non-Profit Documentation</Typography>
      <Controller
        name='doc'
        control={control}
        render={({field: {onChange, value}}) => (
          <>
            <Button startIcon={<CloudUploadIcon />} variant='contained' component='label'>
              <input
                hidden
                accept=".doc, .docx, .pdf"
                type='file'
                onChange={async (e) => {
                  function readFileAsync() {
                    return new Promise((resolve, reject) => {
                      const file = e.target.files?.[0]
                      if (!file) {
                        return
                      }
                      onChange(file)
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

                  const newDoc = await readFileAsync()
                }}
              />
              Upload Files
            </Button>
            <Typography>{typeof value === 'string' ? value : value?.name}</Typography>
          </>
        )}
      />
    </>
  )
}

export default Verification
