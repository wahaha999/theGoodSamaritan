import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  alpha,
  styled,
} from '@mui/material'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {useIntl} from 'react-intl'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MenuItemBy} from './MenuItem'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import {Link, useParams} from 'react-router-dom'
import {Controller, FormProvider, useForm, useFormContext} from 'react-hook-form'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useAppDispatch} from 'src/app/store/hook'
import {addFilterForHeader} from 'src/app/pages/dashboard/store/filterSlice'

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.75),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export function MenuInner() {
  const intl = useIntl()
  const params = useParams()
  const dispatch = useAppDispatch()
  const methods = useForm({
    mode: 'onChange',
  })
  const {control, watch, reset} = methods

  useEffect(() => {
    const initialState = {
      search: '',
      sort_by: 'desc',
      select: 0,
    }
    reset({...initialState})
  }, [reset])

  useEffect(() => {
    dispatch(addFilterForHeader(watch()))
  }, [watch()])

  return (
    <>
      <div style={{paddingTop: '10px'}}>
        <Grid container flexDirection='row'>
          {/* <Button >Dashboard</Button>
          <Button >Account</Button> */}
          <MenuItemBy to={'/dashboard'} title='DASHBOARD' />
          <MenuInnerWithSub
            title='Account'
            to='/account'
            hasArrow={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem>
              <MenuItemBy title='Account Information' to='/account/info' />
            </MenuItem>
            <MenuItem>
              <MenuItemBy title='Billing' to='/account/billing' />
            </MenuItem>
            {/* <MenuItemBy title='About Your Non-Profit' to='/account/about_non_profit' />
            <MenuItemBy title='Noe-Profit Verification' to='/account/verification' />
          <MenuItemBy title='Address' to='/account/location' /> */}
          </MenuInnerWithSub>
          <MenuItemBy title={'SUBSCRIPTION'} to='/subscription' />
          <MenuItemBy title='OUR YOUTUBE CHANNEL' to='/youtube' />
          <Button startIcon={<NotificationsActiveIcon color='secondary' />} sx={{ml: 2}}>
            Your Connections
          </Button>
          <Button startIcon={<NotificationsActiveIcon color='secondary' />} sx={{ml: 2}}>
            Saved Posts
          </Button>
        </Grid>
        {params['*'] == 'dashboard' && (
          <FormProvider {...methods}>
            <Grid container alignItems='center'>
              <Grid item>
                <Controller
                  name='search'
                  defaultValue=''
                  control={control}
                  render={({field}) => (
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        {...field}
                        placeholder='Search…'
                        inputProps={{'aria-label': 'search'}}
                      />
                    </Search>
                  )}
                />
              </Grid>
              <Grid item>
                <Grid container alignItems='center'>
                  <label>Sort By:</label>
                  <Controller
                    name='sort_by'
                    control={control}
                    defaultValue={'desc'}
                    render={({field}) => (
                      <FormControl sx={{m: 1, minWidth: 120}} size='small'>
                        <Select
                          sx={{ml: 1}}
                          labelId='demo-select-small-label'
                          id='demo-select-small'
                          {...field}
                        >
                          <MenuItem value='desc'>Latest</MenuItem>
                          <MenuItem value='asc'>Earliest</MenuItem>
                        </Select>
                      </FormControl>
                      // <Select
                      //   sx={{ml: 1}}
                      //   labelId='demo-select-small-label'
                      //   id='demo-select-small'
                      //   {...field}
                      //   // value={age}
                      //   // label="Age"
                      //   // onChange={handleChange}
                      // >
                      //   <MenuItem value='desc'>Latest</MenuItem>
                      //   <MenuItem value='asc'>Earliest</MenuItem>
                      // </Select>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems='center'>
                  <label>Select Posts:</label>
                  <Controller
                    name='select'
                    defaultValue={0}
                    control={control}
                    render={({field}) => (
                      <FormControl sx={{m: 1, minWidth: 120}} size='small'>
                        <Select
                          sx={{ml: 1}}
                          labelId='demo-select-small-label'
                          id='demo-select-small'
                          {...field}
                          // value={age}
                          // label="Age"
                          // onChange={handleChange}
                        >
                          <MenuItem value={0}>All</MenuItem>
                          <MenuItem value={1}>Today</MenuItem>
                          <MenuItem value={2}>This Month</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </FormProvider>
        )}
      </div>
    </>
  )
}
