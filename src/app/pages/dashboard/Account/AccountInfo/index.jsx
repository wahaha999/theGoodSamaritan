import {
  Typography,
  Grid,
  Avatar,
  TextField,
  IconButton,
  Box,
  styled,
  InputAdornment,
  Hidden,
} from '@mui/material'
import {useState} from 'react'
import {useAppSelector} from 'src/app/store/hook'
import {toServerUrl} from 'src/_metronic/helpers'
import FuseSvgIcon from '../../../../modules/core/FuseSvgIcon/FuseSvgIcon'
import {Controller, useFormContext} from 'react-hook-form'
import {orange} from '@mui/material/colors'

const Root = styled('div')(({theme}) => ({
  marginTop: 12,
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

const AccountInfo = (props) => {
  const user = useAppSelector(({user}) => {
    return user.user
  })
  const methods = useFormContext()
  const {control, formState} = methods

  const {errors} = formState
  const [preview, setPreview] = useState()
  return (
    <Root>
      <Controller
        name='account_id'
        control={control}
        defaultValue='30'
        render={({field: {value}}) => <Typography>Your Account Number: {value}</Typography>}
      />
      <Grid container rowSpacing={4} mt={1}>
        <Grid item container alignItems='center' justifyContent='space-between'>
          <Typography>Upload an Image to represent your Non-Profit:</Typography>
          <Grid item md={6} container justifyContent='center' mt={1}>
            <Controller
              name='avatar'
              control={control}
              render={({field: {onChange, value}}) => (
                <Box
                  sx={{
                    borderWidth: 4,
                    borderStyle: 'solid',
                    borderColor: 'background.paper',
                  }}
                  className='relative flex items-center justify-center w-128 h-128 rounded-full overflow-hidden'
                >
                  <div className='absolute inset-0 bg-black bg-opacity-50 z-10' />
                  <div className='absolute inset-0 flex items-center justify-around z-20'>
                    <div>
                      <label htmlFor='button-avatar' className='flex p-2 cursor-pointer'>
                        <input
                          accept='image/*'
                          className='hidden'
                          id='button-avatar'
                          type='file'
                          onChange={async (e) => {
                            function readFileAsync() {
                              return new Promise((resolve, reject) => {
                                const file = e.target.files[0]
                                if (!file) {
                                  return
                                }
                                const reader = new FileReader()

                                reader.onload = () => {
                                  resolve(`data:${file.type};base64,${btoa(reader.result)}`)
                                }

                                reader.onerror = reject

                                reader.readAsBinaryString(file)
                              })
                            }

                            const newImage = await readFileAsync()
                            setPreview(newImage)

                            onChange(e.target.files[0])
                          }}
                        />
                        {/* <Icon>
                          trash
                        </Icon> */}
                        {/* <IconButton> */}
                        <FuseSvgIcon className='text-white'>heroicons-solid:camera</FuseSvgIcon>
                        {/* </IconButton> */}
                      </label>
                    </div>
                    <div>
                      <IconButton
                        onClick={() => {
                          onChange('')
                        }}
                      >
                        {/* <IconButton>
                          <AddAPhotoIcon />
                        </IconButton> */}
                        <FuseSvgIcon className='text-white'>heroicons-solid:trash</FuseSvgIcon>
                      </IconButton>
                    </div>
                  </div>
                  <Avatar
                    sx={{
                      backgroundColor: 'background.default',
                      color: 'text.secondary',
                      width: '100%',
                      height: '100%',
                    }}
                    className='object-cover text-64 font-bold'
                    src={
                      preview
                        ? preview
                        : toServerUrl('/media/account/avatar/' + user?.account.avatar)
                    }
                    // alt={contact.name}
                  />
                </Box>
              )}
            />
          </Grid>
          {/* <Grid item md={6} container justifyContent="center">
            <Badge
              overlap="circular"
              badgeContent={
              <IconButton>
                <AddAPhotoIcon/>
              </IconButton>
            }>
              <Avatar
                alt="Remy Sharp"
                src={toServerUrl('/media/avatar/'+user?.avatar)}
                sx={{ width: 120, height: 120 }}
              />
            </Badge>
          </Grid> */}
        </Grid>
        <Grid item container alignItems='center' justifyContent='space-between'>
          <Hidden smDown>
            <Typography sx={{mb: 2}}>Name of Non-Profit:</Typography>
          </Hidden>
          <Grid item md={6} sm={12} xs={12}>
            <Controller
              control={control}
              defaultValue=''
              name='non_profit_name'
              render={({field}) => (
                <TextField
                  className='mt-32'
                  {...field}
                  label='Non Profit Name'
                  placeholder='Non Profit Name'
                  id='non_profit_name'
                  error={!!errors.non_profit_name}
                  helperText={errors?.non_profit_name?.message}
                  variant='outlined'
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <FuseSvgIcon size={20}>heroicons-solid:user-circle</FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}

export default AccountInfo
