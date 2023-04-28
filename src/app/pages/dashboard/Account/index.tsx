import React from 'react'
import { Link, Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import AccountInfo from './AccountInfo'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import AboutNonProfit from './AboutNonProfit';
import Verification from './Verification';
import Location from './Location';
import { Grid } from '@mui/material';

interface LinkTabProps {
  label?: string;
  href?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value?: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container justifyContent="center">

        <Box sx={{ p: 3 }}>
            {children}
        </Box>
        </Grid>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



 function AccountLayout() {
     const [value, setValue] = React.useState(0);
     const params = useParams();
    //  const params = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
     };
     console.log('value==',value)

  return (
    <Paper sx={{ width: '100%',p:4 }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" centered>
        <Tab label="Account Information" component={Link} to="info" />
        <Tab label="About Your Non-Profit" component={Link} to="about_non_profit" />
        <Tab label="Now-Profit Verification" component={Link} to="verification" />
        <Tab label="Address" component={Link} to="location" />
    </Tabs>
    <TabPanel >{ <Outlet/>}</TabPanel>
    </Paper>
  );
}

type Props = {}

const Account = (props: Props) => {
  return (
      <Routes>
          <Route element={<AccountLayout />}>
              <Route index element={<Navigate to="info"/>}/>
              <Route path="info" element={ <AccountInfo/>} />
              <Route path="about_non_profit" element={ <AboutNonProfit/>} />
              <Route path="verification" element={ <Verification/>} />
              <Route path="location" element={ <Location/>} />
          </Route>
    </Routes>
  )
}

export default Account