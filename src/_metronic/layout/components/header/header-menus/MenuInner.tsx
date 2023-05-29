import SearchIcon from '@mui/icons-material/Search'
import {Button, Grid, Select, TextField, styled} from '@mui/material'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {useIntl} from 'react-intl'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MenuItem} from './MenuItem'
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
      sort_by: 1,
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
          <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
          <MenuInnerWithSub
            title='Account'
            to='/account'
            hasArrow={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem title='Account Information' to='/account/info' />
            <MenuItem title='Billing' to='/account/billing' />
            {/* <MenuItem title='About Your Non-Profit' to='/account/about_non_profit' />
            <MenuItem title='Noe-Profit Verification' to='/account/verification' />
            <MenuItem title='Address' to='/account/location' /> */}
          </MenuInnerWithSub>
          <MenuItem title={'Subscription'} to='/subscription' />
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
                  defaultValue={1}
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
                      <option value={1}>Latest</option>
                      <option value={2}>Earliest</option>
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
                        <option value={1}>Today</option>
                        <option value={2}>This Month</option>
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
