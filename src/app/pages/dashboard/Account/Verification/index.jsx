import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  Button,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
} from '@mui/material'
import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {API_URL} from 'src/app/modules/auth/core/_requests'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {showMessage} from 'src/app/store/fuse/messageSlice'

const LightTooltip = styled(({className, ...props}) => (
  <Tooltip {...props} classes={{popper: className}} arrow />
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))

const Verification = (props) => {
  const [loading, setLoading] = useState(false)
  const methods = useFormContext()
  const {control, formState, watch, resetField, reset} = methods
  const dispatch = useDispatch()
  const {errors} = formState
  const [filePreviews, setFilePreviews] = useState([])
  const doc = watch('doc')
  useEffect(() => {
    if (typeof doc !== 'string') {
      setFilePreviews([...doc])
    } else {
      setFilePreviews([...JSON.parse(doc ? doc : '[]')])
    }
  }, [])

  const readFileAsync = (file) => {
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

  const handleRemove = (index, onChange) => {
    let files = filePreviews.splice(index, 1)
    setFilePreviews([...filePreviews])
    onChange([...filePreviews])
    // reset('doc',[...filePreviews])
  }

  const handleDownLoad = useCallback((event, name) => {
    event.stopPropagation()
    setLoading(true)
    axios
      .post(
        `${API_URL}/account/download-doc`,
        {name},
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
        setLoading(false)
      })
      .catch((error) => {
        dispatch(showMessage({message: 'This file is not founded', variant: 'error'}))
        setLoading(false)
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
          <>
            <Grid container alignItems='center'>
              <Grid item xs={10}>
                <TextField
                  className='mt-32'
                  required
                  {...field}
                  label='Enter your EIN'
                  placeholder='12-3456789'
                  id='EIN'
                  error={!!errors.EIN}
                  helperText={errors?.EIN?.message}
                  variant='outlined'
                  // fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <LightTooltip
                  placement='right'
                  title='A valid non-profit EIN number, like any other EIN number, is a unique nine-digit number assigned by the Internal Revenue Service (IRS) for tax purposes. Non-profit organizations can apply for an EIN number if they are required to file certain tax returns, such as Form 990, Return of Organization Exempt from Income Tax'
                >
                  <ErrorOutlineIcon sx={{ml: 4}} />
                </LightTooltip>
              </Grid>
            </Grid>
          </>
        )}
      />
      <Typography mt={1}>
        Your EIN should be in the format of two digits separated by a hyphen, followed by seven more
        digits
      </Typography>
      <Typography my={3}>Upload your Non-Profit Documentation</Typography>
      <Controller
        name='doc'
        defaultValue={'[]'}
        control={control}
        render={({field: {onChange, value}}) => {
          return (
            <>
              <Grid container alignItems='center'>
                <Button startIcon={<CloudUploadIcon />} variant='contained' component='label'>
                  <input
                    hidden
                    accept='.doc, .docx, .pdf'
                    type='file'
                    onChange={async (e) => {
                      const files = Array.from(e.target.files)
                      // onChange(files);
                      const filePreviewsPromises = files.map(async (file) => {
                        const fileDataUrl = await readFileAsync(file)
                        return {file, fileDataUrl}
                      })

                      const newFilePreviews = await Promise.all(filePreviewsPromises)
                      setFilePreviews([...filePreviews, ...newFilePreviews])
                      onChange([...filePreviews, ...newFilePreviews])
                    }}
                    multiple
                  />
                  Upload Files
                </Button>
                <LightTooltip
                  placement='right'
                  title='A non-profit should have documentation to support its tax-exempt status, such as a determination letter from the IRS or a state tax authority. Please provide a copy of this documentation for review'
                >
                  <ErrorOutlineIcon sx={{ml: 4}} />
                </LightTooltip>
              </Grid>
              <Grid container mt={2} gap={1}>
                {filePreviews?.map((item, index) => (
                  <Chip
                    key={index}
                    label={typeof item === 'string' ? item : item.file.name}
                    variant='outlined'
                    onClick={(e) =>
                      handleDownLoad(e, typeof item === 'string' ? item : item?.file.name)
                    }
                    onDelete={() => handleRemove(index, onChange)}
                  />
                ))}
              </Grid>
            </>
          )
        }}
      />
    </>
  )
}

export default Verification
