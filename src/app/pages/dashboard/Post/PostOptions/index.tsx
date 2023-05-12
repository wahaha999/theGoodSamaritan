import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import {DemoContainer} from '@mui/x-date-pickers/internals/demo'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import React, {useMemo} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {useAppSelector} from 'src/app/store/hook'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ShareIcon from '@mui/icons-material/Share'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import moment from 'moment'
import dayjs, {Dayjs} from 'dayjs'
import GoogleMap from 'google-map-react'
import MapContainer from '../GoogleMap'
import {motion} from 'framer-motion'
import {ITimezone, timezone} from 'src/app/constants/timezone'
type Props = {}
const labels = [
  {id: 1, color: 'red', title: 'Sharing Message'},
  {id: 2, color: 'green', title: 'With Resources to Share'},
  {id: 3, color: 'yellow', title: 'In need of Resources'},
  {id: 4, color: 'grey', title: 'That have an Event'},
]

function Marker(props: any) {
  return (
    <Tooltip title={props.text} placement='top'>
      <FuseSvgIcon className='text-red'>heroicons-outline:location-marker</FuseSvgIcon>
    </Tooltip>
  )
}
// const top100Films = [
//   {title: 'The Shawshank Redemption', year: 1994},
//   {title: 'The Godfather', year: 1972},
//   {title: 'The Godfather: Part II', year: 1974},
//   {title: 'The Dark Knight', year: 2008},
//   {title: '12 Angry Men', year: 1957},
//   {title: "Schindler's List", year: 1993},
//   {title: 'Pulp Fiction', year: 1994},
//   {
//     title: 'The Lord of the Rings: The Return of the King',
//     year: 2003,
//   },
//   {title: 'The Good, the Bad and the Ugly', year: 1966},
//   {title: 'Fight Club', year: 1999},
//   {
//     title: 'The Lord of the Rings: The Fellowship of the Ring',
//     year: 2001,
//   },
//   {
//     title: 'Star Wars: Episode V - The Empire Strikes Back',
//     year: 1980,
//   },
//   {title: 'Forrest Gump', year: 1994},
//   {title: 'Inception', year: 2010},
//   {
//     title: 'The Lord of the Rings: The Two Towers',
//     year: 2002,
//   },
//   {title: "One Flew Over the Cuckoo's Nest", year: 1975},
//   {title: 'Goodfellas', year: 1990},
//   {title: 'The Matrix', year: 1999},
//   {title: 'Seven Samurai', year: 1954},
//   {
//     title: 'Star Wars: Episode IV - A New Hope',
//     year: 1977,
//   },
//   {title: 'City of God', year: 2002},
//   {title: 'Se7en', year: 1995},
//   {title: 'The Silence of the Lambs', year: 1991},
//   {title: "It's a Wonderful Life", year: 1946},
//   {title: 'Life Is Beautiful', year: 1997},
//   {title: 'The Usual Suspects', year: 1995},
//   {title: 'Léon: The Professional', year: 1994},
//   {title: 'Spirited Away', year: 2001},
//   {title: 'Saving Private Ryan', year: 1998},
//   {title: 'Once Upon a Time in the West', year: 1968},
//   {title: 'American History X', year: 1998},
//   {title: 'Interstellar', year: 2014},
//   {title: 'Casablanca', year: 1942},
//   {title: 'City Lights', year: 1931},
//   {title: 'Psycho', year: 1960},
//   {title: 'The Green Mile', year: 1999},
//   {title: 'The Intouchables', year: 2011},
//   {title: 'Modern Times', year: 1936},
//   {title: 'Raiders of the Lost Ark', year: 1981},
//   {title: 'Rear Window', year: 1954},
//   {title: 'The Pianist', year: 2002},
//   {title: 'The Departed', year: 2006},
//   {title: 'Terminator 2: Judgment Day', year: 1991},
//   {title: 'Back to the Future', year: 1985},
//   {title: 'Whiplash', year: 2014},
//   {title: 'Gladiator', year: 2000},
//   {title: 'Memento', year: 2000},
//   {title: 'The Prestige', year: 2006},
//   {title: 'The Lion King', year: 1994},
//   {title: 'Apocalypse Now', year: 1979},
//   {title: 'Alien', year: 1979},
//   {title: 'Sunset Boulevard', year: 1950},
//   {
//     title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
//     year: 1964,
//   },
//   {title: 'The Great Dictator', year: 1940},
//   {title: 'Cinema Paradiso', year: 1988},
//   {title: 'The Lives of Others', year: 2006},
//   {title: 'Grave of the Fireflies', year: 1988},
//   {title: 'Paths of Glory', year: 1957},
//   {title: 'Django Unchained', year: 2012},
//   {title: 'The Shining', year: 1980},
//   {title: 'WALL·E', year: 2008},
//   {title: 'American Beauty', year: 1999},
//   {title: 'The Dark Knight Rises', year: 2012},
//   {title: 'Princess Mononoke', year: 1997},
//   {title: 'Aliens', year: 1986},
//   {title: 'Oldboy', year: 2003},
//   {title: 'Once Upon a Time in America', year: 1984},
//   {title: 'Witness for the Prosecution', year: 1957},
//   {title: 'Das Boot', year: 1981},
//   {title: 'Citizen Kane', year: 1941},
//   {title: 'North by Northwest', year: 1959},
//   {title: 'Vertigo', year: 1958},
//   {
//     title: 'Star Wars: Episode VI - Return of the Jedi',
//     year: 1983,
//   },
//   {title: 'Reservoir Dogs', year: 1992},
//   {title: 'Braveheart', year: 1995},
//   {title: 'M', year: 1931},
//   {title: 'Requiem for a Dream', year: 2000},
//   {title: 'Amélie', year: 2001},
//   {title: 'A Clockwork Orange', year: 1971},
//   {title: 'Like Stars on Earth', year: 2007},
//   {title: 'Taxi Driver', year: 1976},
//   {title: 'Lawrence of Arabia', year: 1962},
//   {title: 'Double Indemnity', year: 1944},
//   {
//     title: 'Eternal Sunshine of the Spotless Mind',
//     year: 2004,
//   },
//   {title: 'Amadeus', year: 1984},
//   {title: 'To Kill a Mockingbird', year: 1962},
//   {title: 'Toy Story 3', year: 2010},
//   {title: 'Logan', year: 2017},
//   {title: 'Full Metal Jacket', year: 1987},
//   {title: 'Dangal', year: 2016},
//   {title: 'The Sting', year: 1973},
//   {title: '2001: A Space Odyssey', year: 1968},
//   {title: "Singin' in the Rain", year: 1952},
//   {title: 'Toy Story', year: 1995},
//   {title: 'Bicycle Thieves', year: 1948},
//   {title: 'The Kid', year: 1921},
//   {title: 'Inglourious Basterds', year: 2009},
//   {title: 'Snatch', year: 2000},
//   {title: '3 Idiots', year: 2009},
//   {title: 'Monty Python and the Holy Grail', year: 1975},
// ]
const PostOptions = (props: Props) => {
  const {account} = useAppSelector(({user}) => user.user)
  const {
    control,
    watch,
    formState: {errors},
  } = useFormContext()
  console.log('errors==', errors)
  const purpose = watch('purpose')
  const {category} = useAppSelector(({sidebar}) => sidebar)
  const all_category = useMemo(() => {
    let temp: any = []
    category.map((item: any, index: number) => {
      if (item.subcategories.length > 0) {
        temp.push({id: item.id, name: item.name})
        item.subcategories.map((item1: any, index: number) => {
          temp.push({id: `${item1.category_id}-${item1.id}`, name: item1.name})
        })
      } else {
        temp.push({id: item.id, name: item.name})
      }
    })
    return temp
  }, [category])
  return (
    <>
      <Grid container alignItems='center' my={4}>
        <Grid item md={4}>
          <Typography>Select the Purpose*</Typography>
        </Grid>
        <Grid item md={8}>
          <Controller
            name='purpose'
            control={control}
            defaultValue=''
            render={({field}) => (
              <FormControl fullWidth error={!!errors.purpose}>
                <InputLabel required id='select-label'>
                  Purpose
                </InputLabel>
                <Select
                  required
                  fullWidth
                  labelId='select-label'
                  id='label-select'
                  {...field}
                  startAdornment={
                    <InputAdornment position='start'>
                      <ShareIcon />
                    </InputAdornment>
                  }
                  //   value={value}
                  label='Purpose'
                  //   onChange={handleChange}
                  //   ref={ref}
                  classes={{select: 'd-flex items-center space-x-12'}}
                >
                  {labels.map((label) => (
                    <MenuItem value={label.id} key={label.id} className='space-x-12'>
                      <Box
                        className='w-12 h-12 shrink-0 rounded-full'
                        sx={{backgroundColor: label.color}}
                      />
                      <span>{label.title}</span>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors?.purpose?.message as string}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
      {purpose == 4 && (
        <motion.div
          initial={{height: 0}}
          animate={{height: 'auto'}}
          exit={{height: 0}}
          transition={{duration: 0.3}}
          style={{borderRadius: '8px', backgroundColor: '#F6F5F9', padding: '12px'}}
        >
          <Grid container alignItems='center' justifyContent='space-between' mt={2}>
            <Grid item container md={6} alignItems='center'>
              <Grid item md={4}>
                <Typography>Event Name*</Typography>
              </Grid>
              <Grid item md={8}>
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
                      disabled={purpose !== 4}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item container md={4} alignItems='center'>
              <Grid item md={4}>
                <Typography>Timezone</Typography>
              </Grid>
              <Grid item md={8}>
                <Controller
                  name='timezone'
                  control={control}
                  defaultValue={account?.timezone ?? ''}
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
          <Grid container alignItems='center' justifyContent='space-between' mt={2}>
            <Grid item container alignItems='center' md={5}>
              <Grid item md={3}>
                <Typography>Start Date</Typography>
              </Grid>
              <Grid item md={9} container justifyContent='flex-end'>
                <Controller
                  name='start'
                  control={control}
                  defaultValue={dayjs('2022-04-17')}
                  render={({field: {onChange, value}}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          defaultValue=''
                          value={value}
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
            <Grid item container alignItems='center' md={5}>
              <Grid item md={3}>
                <Typography>End Date</Typography>
              </Grid>
              <Grid item md={9} container justifyContent='flex-end'>
                <Controller
                  name='end'
                  control={control}
                  defaultValue={dayjs('2022-04-17')}
                  render={({field: {onChange, value}}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          value={value}
                          onChange={(value) => {
                            onChange(value)
                          }}
                          label='End date'
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
      )}
      <Controller
        name='category'
        // defaultValue=''
        control={control}
        render={({field: {onChange, value}}) => (
          <>
            <Typography mx={4} my={2}>
              Select Your Category*
            </Typography>
            <FormControl fullWidth error={!!errors.category}>
              <Autocomplete
                onChange={(e, value: any) => {
                  let temp: any = []
                  value.map((item: any) => {
                    temp.push(item.id)
                  })
                  onChange(temp)
                }}
                sx={{mx: 4, mb: 2}}
                multiple
                id='tags-outlined'
                options={all_category}
                getOptionLabel={(option: any) => option.name}
                groupBy={(option: any) => {
                  if (typeof option.id == 'number') return option.name
                }}
                // defaultValue={[top100Films[13]]}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    required
                    error={!!errors.category}
                    helperText={errors.category?.message as string}
                    {...params}
                    label='Select Your Category'
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position='start'>
                    //       <CategoryOutlinedIcon />
                    //     </InputAdornment>
                    //   ),
                    // }}
                    placeholder='Categories'
                  />
                )}
              />
              {/* <FormHelperText>{errors.category?.message as string}</FormHelperText> */}
            </FormControl>
          </>
        )}
      />
      {/* <Controller
        name='address'
        control={control}
        defaultValue={{lat: 10.99835602, lng: 77.01502627}}
        render={({field: {onChange, value}}) => (
          <div className=' h-320 rounded-16 overflow-hidden mx-24 mb-12 mt-8'>
            <GoogleMap
              bootstrapURLKeys={{
                key: '',
              }}
              onClick={({x, y, lat, lng, event}) => {
                // console.log('x==', x, y, lat, lng, event)
                onChange({lat: lat, lng: lng})
              }}
              defaultZoom={15}
              defaultCenter={{lat: 10.99835602, lng: 77.01502627}}
              center={{lat: value.lat, lng: value.lng}}
              // as
              // Coords
            >
              <Marker
                text='{order.customer.shippingAddress.address}'
                lat={value.lat}
                lng={value.lng}
              />
            </GoogleMap>
          </div>
        )}
      /> */}
      <MapContainer />
    </>
  )
}

export default PostOptions
