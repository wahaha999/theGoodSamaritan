import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  FormControl,
  Grid,
  Hidden,
  InputBase,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import {usePrevious} from 'src/app/modules/hooks'
import _ from 'src/app/modules/@lodash/@lodash'
import HoverPopover from 'src/app/pages/dashboard/components/MyPostsDashboard/PostView/PostViewHeader/PostAccountViewPopover/index'
import Navigation from '../Navigation'
import FuseScrollbars from 'src/app/modules/core/FuseScrollbars/FuseScrollbars'

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

const navigationConfig = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    subtitle: 'Unique dashboard designs',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'DASHBOARDS',
    children: [
      {
        id: 'dashboards.project',
        title: 'Project',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/dashboards/project',
      },
      {
        id: 'dashboards.analytics',
        title: 'Analytics',
        type: 'item',
        icon: 'heroicons-outline:chart-pie',
        url: '/dashboards/analytics',
      },
    ],
  },
  {
    id: 'apps',
    title: 'Applications',
    subtitle: 'Custom made application designs',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'APPLICATIONS',
    children: [
      {
        id: 'apps.academy',
        title: 'Academy',
        type: 'item',
        icon: 'heroicons-outline:academic-cap',
        url: '/apps/academy',
        translate: 'ACADEMY',
      },
      {
        id: 'apps.calendar',
        title: 'Calendar',
        subtitle: '3 upcoming events',
        type: 'item',
        icon: 'heroicons-outline:calendar',
        url: '/apps/calendar',
        translate: 'CALENDAR',
      },
      {
        id: 'apps.chat',
        title: 'Chat',
        type: 'item',
        icon: 'heroicons-outline:chat-alt',
        url: '/apps/chat',
        translate: 'CHAT',
      },
      {
        id: 'apps.contacts',
        title: 'Contacts',
        type: 'item',
        icon: 'heroicons-outline:user-group',
        url: '/apps/contacts',
        translate: 'CONTACTS',
      },
      {
        id: 'apps.ecommerce',
        title: 'ECommerce',
        type: 'collapse',
        icon: 'heroicons-outline:shopping-cart',
        translate: 'ECOMMERCE',
        children: [
          {
            id: 'e-commerce-products',
            title: 'Products',
            type: 'item',
            url: 'apps/e-commerce/products',
            end: true,
          },
          {
            id: 'e-commerce-product-detail',
            title: 'Product Detail',
            type: 'item',
            url: 'apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
          },
          {
            id: 'e-commerce-new-product',
            title: 'New Product',
            type: 'item',
            url: 'apps/e-commerce/products/new',
          },
          {
            id: 'e-commerce-orders',
            title: 'Orders',
            type: 'item',
            url: 'apps/e-commerce/orders',
            end: true,
          },
          {
            id: 'e-commerce-order-detail',
            title: 'Order Detail',
            type: 'item',
            url: 'apps/e-commerce/orders/1',
          },
        ],
      },
      {
        id: 'apps.file-manager',
        title: 'File Manager',
        type: 'item',
        icon: 'heroicons-outline:cloud',
        url: '/apps/file-manager',
        end: true,
        translate: 'FILE_MANAGER',
      },
      {
        id: 'apps.help-center',
        title: 'Help Center',
        type: 'collapse',
        icon: 'heroicons-outline:support',
        url: '/apps/help-center',
        children: [
          {
            id: 'apps.help-center.home',
            title: 'Home',
            type: 'item',
            url: '/apps/help-center',
            end: true,
          },
          {
            id: 'apps.help-center.faqs',
            title: 'FAQs',
            type: 'item',
            url: '/apps/help-center/faqs',
          },
          {
            id: 'apps.help-center.guides',
            title: 'Guides',
            type: 'item',
            url: '/apps/help-center/guides',
          },
          {
            id: 'apps.help-center.support',
            title: 'Support',
            type: 'item',
            url: '/apps/help-center/support',
          },
        ],
      },
    ],
  },
]

export function MenuInner(props) {
  const {type} = props
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
  const data = watch()
  const saved_posts = watch('saved_posts')

  const prevData = usePrevious(data ? _.merge({}, data) : null)
  useEffect(() => {
    if (_.isEqual(prevData, data)) {
      return
    }
    dispatch(addFilterForHeader(watch()))
  }, [data, prevData])

  if (type === 'header') {
    return (
      <>
        <div style={{paddingTop: '10px'}}>
          {/* <Grid container flexDirection='row'> */}
          <FuseScrollbars className={'flex h-full items-center'}>
            <Navigation layout='horizontal' />
          </FuseScrollbars>

          {/* </Grid> */}
          <Hidden mdDown>
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
                  <Grid item>
                    <Button startIcon={<NotificationsActiveIcon color='secondary' />} sx={{ml: 2}}>
                      Your Connections
                    </Button>
                  </Grid>
                  <Controller
                    name='saved_posts'
                    control={control}
                    defaultValue={false}
                    render={({field}) => (
                      <Grid item>
                        <Button
                          onClick={() => field.onChange(!field.value)}
                          startIcon={
                            <NotificationsActiveIcon
                              color={saved_posts ? 'primary' : 'secondary'}
                            />
                          }
                          sx={{ml: 2}}
                        >
                          Saved Posts
                        </Button>
                      </Grid>
                    )}
                  />
                </Grid>
              </FormProvider>
            )}
          </Hidden>
        </div>
      </>
    )
  } else {
    return (
      <FormProvider {...methods}>
        <List>
          <ListItem>
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
          </ListItem>
          <ListItem>
            <Controller
              name='sort_by'
              control={control}
              defaultValue={'desc'}
              render={({field}) => (
                <FormControl sx={{m: 1, minWidth: 120}} size='small' fullWidth>
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
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='select'
              defaultValue={0}
              control={control}
              render={({field}) => (
                <FormControl sx={{m: 1, minWidth: 120}} size='small' fullWidth>
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
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <NotificationsActiveIcon color='secondary' />
              </ListItemIcon>
              <ListItemText primary='Your Connections' />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Controller
              name='saved_posts'
              control={control}
              defaultValue={false}
              render={({field}) => (
                <ListItemButton onClick={() => field.onChange(!field.value)}>
                  <ListItemIcon>
                    <NotificationsActiveIcon color={saved_posts ? 'primary' : 'secondary'} />
                  </ListItemIcon>
                  <ListItemText primary='Saved Posts' />
                </ListItemButton>
              )}
            />
          </ListItem>
        </List>
      </FormProvider>
    )
  }
}
