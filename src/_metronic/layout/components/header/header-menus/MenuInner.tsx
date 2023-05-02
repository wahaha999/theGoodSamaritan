import SearchIcon from '@mui/icons-material/Search'
import {Button, Grid, Select, TextField, styled} from '@mui/material'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {useIntl} from 'react-intl'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MenuItem} from './MenuItem'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

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
            <MenuItem title='About Your Non-Profit' to='/account/about_non_profit' />
            <MenuItem title='Noe-Profit Verification' to='/account/verification' />
            <MenuItem title='Address' to='/account/location' />
          </MenuInnerWithSub>
          <MenuItem title={'Subscription'} to='/subscription' />
          <Button startIcon={<NotificationsActiveIcon color='secondary' />} sx={{ml: 2}}>
            Your Connections
          </Button>
          <Button startIcon={<NotificationsActiveIcon color='secondary' />} sx={{ml: 2}}>
            Saved Posts
          </Button>
        </Grid>
        {/* <Grid container columnSpacing={4}>
          <Grid item>
            <SearchText placeholder='Search Posts' InputProps={{startAdornment: <SearchIcon />}} />
          </Grid>
          <Grid item>
            <label>Sort By:</label>
            <Select
              sx={{ml: 1}}
              labelId='demo-select-small-label'
              id='demo-select-small'
              value='latest'
              // value={age}
              // label="Age"
              // onChange={handleChange}
            >
              <option value='latest'>Latest</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </Grid>
          <Grid item>
            <Grid container alignItems='center'>
              <label>Select Posts:</label>
              <Select
                sx={{ml: 1}}
                labelId='demo-select-small-label'
                id='demo-select-small'
                value='Today'
                // value={age}
                // label="Age"
                // onChange={handleChange}
              >
                <option value='Today'>Today</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </Grid>
          </Grid>
        </Grid> */}
      </div>
    </>
  )
}
