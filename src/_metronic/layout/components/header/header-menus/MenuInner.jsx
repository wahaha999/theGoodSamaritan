import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  FormControl,
  Grid,
  Hidden,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  alpha,
  styled,
} from '@mui/material'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import {useParams} from 'react-router-dom'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {addFilterForHeader} from 'src/app/pages/dashboard/store/filterSlice'
import {useDebounce, usePrevious} from 'src/app/modules/hooks'
import _ from 'src/app/modules/@lodash/@lodash'
import Navigation from '../Navigation'
import FuseScrollbars from 'src/app/modules/core/FuseScrollbars/FuseScrollbars'
import Connections from 'src/app/pages/dashboard/components/Connections'

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

export function MenuInner(props) {
  const {type} = props
  const params = useParams()
  const [searchText, setSearchText] = useState('')
  const dispatch = useAppDispatch()
  const methods = useForm({
    mode: 'onChange',
  })
  const {control, watch, reset, setValue} = methods

  const {selectedUser} = useAppSelector(({post}) => post.filter.filter)

  useEffect(() => {
    const initialState = {
      search: '',
      sort_by: 'desc',
      select: 0,
    }
    reset({...initialState})
  }, [reset])

  useEffect(() => {
    if (selectedUser?.length > 0) {
      setValue('connections', true)
    }
  }, [selectedUser])
  const data = watch()
  const saved_posts = watch('saved_posts')
  const connections = watch('connections')

  const prevData = usePrevious(data ? _.merge({}, data) : null)
  useEffect(() => {
    if (_.isEqual(prevData, data)) {
      return
    }
    dispatch(addFilterForHeader(watch()))
  }, [data, prevData])

  const watchSearch = (value) => {
    // console.log('value==', value)
    setValue('search', value)
  }
  const debounced = useDebounce(watchSearch, 500)

  const handleChange = (e) => {
    setSearchText(e.target.value)
    debounced(e.target.value)
  }

  if (type === 'header') {
    return (
      <>
        <div style={{paddingTop: '10px'}}>
          {/* <Grid container flexDirection='row'> */}
          <FuseScrollbars className={'flex h-full items-center'}>
            <Navigation layout='horizontal' />
          </FuseScrollbars>

          {/* </Grid> */}
          {params['*'] == 'dashboard' && (
            <FormProvider {...methods}>
              <Grid container alignItems='center'>
                <Hidden mdDown>
                  <Grid item>
                    <Controller
                      name='search'
                      defaultValue=''
                      control={control}
                      render={({}) => {
                        // console.log('field==', field)
                        return (
                          <Search>
                            <SearchIconWrapper>
                              <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                              value={searchText}
                              onChange={handleChange}
                              placeholder='Search…'
                              inputProps={{'aria-label': 'search'}}
                            />
                          </Search>
                        )
                      }}
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
                  <Controller
                    name='connections'
                    control={control}
                    defaultValue={false}
                    render={({field}) => (
                      <Grid item>
                        <Button
                          onClick={() => field.onChange(!field.value)}
                          startIcon={
                            <NotificationsActiveIcon
                              color={connections ? 'primary' : 'secondary'}
                            />
                          }
                          sx={{ml: 2}}
                        >
                          Your Connections
                        </Button>
                      </Grid>
                    )}
                  />

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
                </Hidden>
              </Grid>
            </FormProvider>
          )}
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
              render={() => (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={handleChange}
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
            <Controller
              name='connections'
              control={control}
              defaultValue={false}
              render={({field}) => (
                <ListItemButton onClick={() => field.onChange(!field.value)}>
                  <ListItemIcon>
                    <NotificationsActiveIcon color={connections ? 'primary' : 'secondary'} />
                  </ListItemIcon>
                  <ListItemText primary='Your Connections' />
                </ListItemButton>
              )}
            />
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
        <Connections position='none' />
      </FormProvider>
    )
  }
}
