import { useIntl } from 'react-intl'
import { MenuItem } from './MenuItem'
import { Button, FormControl, Grid, InputLabel, Select, TextField, styled, Typography } from '@mui/material'
import Calendar from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SearchText = styled(TextField)({
   '& .MuiInputBase-root': {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    height:50,
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
  const intl = useIntl();
  
  return (
    <>
      <div style={{padding:'12px'}}>
        <Grid container flexDirection="row">
          {/* <Button >Dashboard</Button>
          <Button >Account</Button> */}
          <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
          <MenuItem title='Account' to='/builder' />
        </Grid>
        <Grid container columnSpacing={4}>
          <Grid item>
            <SearchText placeholder='Search Posts' InputProps={{startAdornment:<SearchIcon/>}}/>
          </Grid>
          <Grid item>
              <label>Sort By:</label>
            <Select
              sx={{ml:1}}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value="latest"
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
            <Grid container alignItems="center">
            <label>Active Posts between:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={['DatePicker']}> */}
                <DatePicker sx={{ml:1}} />
              {/* </DemoContainer> */}
            </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
