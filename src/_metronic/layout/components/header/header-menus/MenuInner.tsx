import SearchIcon from '@mui/icons-material/Search'
import {Button, Grid, MenuItem, Select, TextField, styled} from '@mui/material'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {useIntl} from 'react-intl'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MenuItemBy} from './MenuItem'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import {useParams} from 'react-router-dom'
import {Controller, FormProvider, useForm, useFormContext} from 'react-hook-form'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useAppDispatch} from 'src/app/store/hook'
import {addFilterForHeader} from 'src/app/pages/dashboard/store/filterSlice'

const SearchText = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    height: 50,
    '&.Mui-focused': {
      backgroundColor: '#fff',
      borderColor: 'grey',
    },
  },
  '& .MuiInputBase-input': {
    fontSize: 16,
    fontWeight: 500,
  },
})

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
      select: 1,
    }
    reset({...initialState})
  }, [reset])

  useEffect(() => {
    dispatch(addFilterForHeader(watch()))
  }, [watch()])

  return (
    <>
      <div style={{padding: '12px'}}>
        <Grid container flexDirection='row'>
          {/* <Button >Dashboard</Button>
          <Button >Account</Button> */}
          <MenuItemBy title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
          <MenuInnerWithSub
            title='Account'
            to='/account'
            hasArrow={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItemBy title='Account Information' to='/account/info' />
            <MenuItemBy title='Billing' to='/account/billing' />
            {/* <MenuItemBy title='About Your Non-Profit' to='/account/about_non_profit' />
            <MenuItemBy title='Noe-Profit Verification' to='/account/verification' />
            <MenuItemBy title='Address' to='/account/location' /> */}
          </MenuInnerWithSub>
          <MenuItemBy title={'Subscription'} to='/subscription' />
          <Button startIcon={<NotificationsActiveIcon color='secondary' />} sx={{ml: 2}}>
            Your Connections
          </Button>
          <Button startIcon={<NotificationsActiveIcon color='secondary' />} sx={{ml: 2}}>
            Saved Posts
          </Button>
        </Grid>
        {params['*'] == 'dashboard' && (
          <FormProvider {...methods}>
            <Grid container columnSpacing={4} sx={{mt: 1}}>
              <Grid item>
                <Controller
                  name='search'
                  defaultValue=''
                  control={control}
                  render={({field}) => (
                    <SearchText
                      {...field}
                      placeholder='Search Posts'
                      InputProps={{startAdornment: <SearchIcon />}}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <label>Sort By:</label>
                <Controller
                  name='sort_by'
                  control={control}
                  defaultValue={'desc'}
                  render={({field}) => (
                    <Select
                      sx={{ml: 1}}
                      labelId='demo-select-small-label'
                      id='demo-select-small'
                      {...field}
                      // value={age}
                      // label="Age"
                      // onChange={handleChange}
                    >
                      <MenuItem value='desc'>Latest</MenuItem>
                      <MenuItem value='asc'>Earliest</MenuItem>
                    </Select>
                  )}
                />
              </Grid>
              <Grid item>
                <Grid container alignItems='center'>
                  <label>Select Posts:</label>
                  <Controller
                    name='select'
                    defaultValue={1}
                    control={control}
                    render={({field}) => (
                      <Select
                        sx={{ml: 1}}
                        labelId='demo-select-small-label'
                        id='demo-select-small'
                        {...field}
                        // value={age}
                        // label="Age"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Today</MenuItem>
                        <MenuItem value={2}>This Month</MenuItem>
                      </Select>
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
