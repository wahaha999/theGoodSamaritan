import AddLocationIcon from '@mui/icons-material/AddLocation'
import EditIcon from '@mui/icons-material/Edit'
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material'
import {useMemo, useState} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {useAppSelector} from 'src/app/store/hook'

const center = {
  lat: -3.745,
  lng: -38.523,
}

function MapContainer() {
  const {
    control,
    watch,
    formState: {errors},
  } = useFormContext()
  const [open, setOpen] = useState(false)
  const {state} = useAppSelector(({post}) => post.plan)
  const address = watch('address')

  const tempState = useMemo(() => {
    if (state) {
      let temp = []
      Object.keys(state).map((item) => {
        temp.push(`${state[item].State} - ${state[item].Description}`)
      })
      return temp
    }
  }, [state])

  return (
    <div>
      {/* <Button startIcon={<AddLocationIcon />} onClick={() => setOpen(true)}>
        Change Location
      </Button> */}
      <Chip
        sx={{ml: 4}}
        variant='outlined'
        deleteIcon={<EditIcon />}
        onDelete={() => setOpen(true)}
        color='primary'
        label={address}
        icon={<AddLocationIcon />}
      />

      {/* <Controller
        name='address'
        defaultValue={{lat: 10.99835602, lng: 77.01502627}}
        control={control}
        render={({field}) => (
          <> */}
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        fullWidth
        maxWidth='sm'
        // sx={{padding: '20px'}}
      >
        <DialogTitle>Enter your address detail</DialogTitle>
        <DialogContent>
          <Grid container justifyContent='space-between'>
            <Grid item md={7} mt={4}>
              <Controller
                control={control}
                defaultValue=''
                name='address'
                render={({field}) => (
                  <TextField
                    className='mt-32'
                    required
                    {...field}
                    label='Address'
                    placeholder='Address'
                    id='address'
                    error={!!errors.address}
                    helperText={errors?.address?.message}
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
            </Grid>
            <Grid item md={4} mt={4}>
              <Controller
                control={control}
                defaultValue=''
                name='city'
                render={({field}) => (
                  <TextField
                    required
                    className='mt-32'
                    {...field}
                    label='City'
                    placeholder='City'
                    id='city'
                    error={!!errors.city}
                    helperText={errors?.city?.message}
                    variant='outlined'
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <FuseSvgIcon size={20}>heroicons-solid:office-building</FuseSvgIcon>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item md={5} mt={4}>
              {state && (
                <Controller
                  control={control}
                  name='state'
                  defaultValue=''
                  render={({field: {onChange, value}}) => {
                    return (
                      <Autocomplete
                        id='state'
                        fullWidth
                        value={value ?? ''}
                        inputValue={value ?? ''}
                        // defaultValue={value}
                        // onOpen={() => {
                        //   setOpen(true)
                        // }}
                        onChange={(event, newValue) => {
                          onChange(newValue.split('-')[0].trim())
                        }}
                        onInputChange={(event, newInputValue) => {
                          onChange(newInputValue ?? '')
                        }}
                        // onClose={() => {
                        //   setOpen(false)
                        // }}
                        isOptionEqualToValue={(option, value) => option == value}
                        getOptionLabel={(option) => option}
                        options={tempState}
                        // loading={loading}
                        renderInput={(params) => (
                          <TextField
                            error={!!errors.state}
                            helperText={errors?.state?.message}
                            {...params}
                            label='State'
                          />
                        )}
                      />
                    )
                  }}
                />
              )}
            </Grid>
            <Grid item md={6} mt={4}>
              <Controller
                control={control}
                name='zip_code'
                defaultValue=''
                render={({field}) => (
                  <TextField
                    className='mt-32'
                    required
                    {...field}
                    label='Zip Code'
                    placeholder='Zip Code'
                    id='zip_code'
                    error={!!errors.zip_code}
                    helperText={errors?.zip_code?.message}
                    variant='outlined'
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <FuseSvgIcon size={20}>heroicons-solid:code</FuseSvgIcon>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant='outlined' color='primary'>
            Save
          </Button>
          {/* <Button variant='outlined' color='info'>
            Cancel
          </Button> */}
        </DialogActions>
        {/* <Autocomplete onSelect={handleSelect} apiKey="YOUR_GOOGLE_MAPS_API_KEY" />
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapCenter}
                  zoom={10}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              </LoadScript> */}
      </Dialog>
      {/* </>
        )}
      /> */}
    </div>
  )
}

export default MapContainer
