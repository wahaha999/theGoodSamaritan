import React from 'react'
import {Typography, Button} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {Controller, useFormContext} from 'react-hook-form'
type Props = {}

const Verification = (props: Props) => {
  const methods = useFormContext()
  const {control} = methods
  return (
    <>
      <Typography my={3}>
        EIN <span>Your EIN will never be shared. It is used to verify your Non Profit status</span>
      </Typography>
      <Typography my={3}>Upload your Non-Profit Documentation</Typography>
      <Controller
        name='doc'
        control={control}
        render={({field: {onChange, value}}) => (
          <Button startIcon={<CloudUploadIcon />} variant='contained' component='label'>
            <input
              hidden
              accept='image/*'
              type='file'
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            UploadFiles
          </Button>
        )}
      />
    </>
  )
}

export default Verification
