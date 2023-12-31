import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import {DateTimePicker} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DemoContainer} from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import {motion} from 'framer-motion'
import {Controller, useFormContext} from 'react-hook-form'
import {ITimezone, timezone} from 'src/app/constants/timezone'
import {useAppSelector} from 'src/app/store/hook'
import MapContainer from '../GoogleMap'
type Props = {}

const PostOptions = (props: Props) => {
  const {account} = useAppSelector(({user}) => user.user)
  const {
    control,
    watch,
    formState: {errors},
  } = useFormContext()
  const purpose = watch('purpose')
  const start = watch('start')

  return (
    <>
      {purpose == 4 && (
        <motion.div
          initial={{height: 0}}
          animate={{height: 'auto'}}
          exit={{height: 0}}
          transition={{duration: 0.3}}
          style={{
            borderRadius: '8px',
            backgroundColor: '#F6F5F9',
            padding: '12px',
            marginTop: '12px',
            marginBottom: '12px',
          }}
        >
          <Grid container alignItems='center' justifyContent='space-between' mt={2}>
            <Grid item container md={6} xs={12} alignItems='center'>
              <Grid item md={4} xs={12}>
                <Typography>Event Name*</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Controller
                  defaultValue=''
                  name='event_name'
                  control={control}
                  render={({field}) => (
                    <TextField
                      error={!!errors.event_name}
                      helperText={errors.event_name?.message as string}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <EmojiEventsOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                      placeholder='Event Name'
                      required
                      label='Event Name'
                      {...field}
                      disabled={purpose != 4}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item container md={4} xs={12} alignItems='center'>
              <Grid item md={4} xs={12}>
                <Typography>Timezone</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Controller
                  name='timezone'
                  control={control}
                  defaultValue={account?.timezone || ''}
                  render={({field}) => (
                    <FormControl fullWidth>
                      <InputLabel>Timezone</InputLabel>
                      <Select
                        {...field}
                        label='Timezone'
                        fullWidth
                        startAdornment={
                          <InputAdornment position='start'>
                            <AccessTimeIcon />
                          </InputAdornment>
                        }
                      >
                        {timezone.map((item: ITimezone, index: number) => (
                          <MenuItem value={item.title} key={index}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container alignItems='center' mt={2}>
            <Grid item container alignItems='center' md={6} xs={12} gap={2}>
              <Grid item>
                <Typography>Start Date</Typography>
              </Grid>
              <Grid item md='auto' xs={12} container justifyContent='flex-end'>
                <Controller
                  name='start'
                  control={control}
                  defaultValue={dayjs('2022-04-17')}
                  render={({field: {onChange, value}}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                          defaultValue=''
                          value={typeof value == 'string' ? dayjs(value) : value}
                          onChange={(value) => {
                            onChange(value)
                          }}
                          label='Start date'
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  )}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems='center'
              md={6}
              xs={12}
              justifyContent='flex-end'
              gap={2}
            >
              <Grid item>
                <Typography>End Date</Typography>
              </Grid>
              <Grid item md='auto' container justifyContent='flex-end'>
                <Controller
                  name='end'
                  control={control}
                  defaultValue={dayjs('2022-04-18')}
                  render={({field: {onChange, value}}) => {
                    return (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                          <DateTimePicker
                            minDate={start}
                            value={typeof value == 'string' ? dayjs(value) : value}
                            onChange={(value) => {
                              onChange(value)
                            }}
                            label='End date'
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
      )}
      <MapContainer />
    </>
  )
}

export default PostOptions
