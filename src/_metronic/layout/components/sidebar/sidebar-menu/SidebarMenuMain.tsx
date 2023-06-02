import * as React from 'react'
import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import TreeView from '@mui/lab/TreeView'
import TreeItem, {TreeItemProps, treeItemClasses} from '@mui/lab/TreeItem'
import Typography from '@mui/material/Typography'
import MailIcon from '@mui/icons-material/Mail'
import DeleteIcon from '@mui/icons-material/Delete'
import Label from '@mui/icons-material/Label'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {SvgIconProps} from '@mui/material/SvgIcon'
import {Button, Checkbox} from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import withReducer from 'src/app/store/withReducer'
import reducer from '../store'
import {Controller, FormProvider, set, useForm, useFormContext} from 'react-hook-form'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import {getStates} from 'src/app/pages/dashboard/store/planSlice'
import BillingManage from 'src/app/pages/dashboard/Billing/BillingManage'
import {addFilter} from 'src/app/pages/dashboard/store/filterSlice'
import {getCategories} from '../store/categorySlice'

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string
    '--tree-view-bg-color'?: string
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string
  color?: string
  labelIcon: React.ElementType<SvgIconProps>
  labelInfo?: string
  labelText: string
  name: string
}

const StyledTreeItemRoot = styled(TreeItem)(({theme}) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: theme.palette.secondary.main,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}))

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    name,
    disabled,
    ...other
  } = props
  const methods = useFormContext()
  const {control, watch} = methods
  const value = watch(`${name}`)
  const {account} = useAppSelector(({user}) => user.user)
  const dispatch = useAppDispatch()
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {value, onChange}}) => (
        <StyledTreeItemRoot
          label={
            <Box sx={{display: 'flex', alignItems: 'center', p: 0.5, pr: 0}}>
              <Checkbox
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (disabled) {
                    dispatch(
                      showMessage({
                        message: 'This state is not your plan',
                        variant: 'info',
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        autoHideDuration: 5000,
                        node: (
                          <BillingManage
                            title='Upgrade your subscription'
                            variant='contained'
                            color='primary'
                            customer_id={account?.customer_id}
                          />
                        ),
                      })
                    )
                  } else {
                    onChange(e.target.checked)
                  }
                }}
                checked={value !== undefined ? value : false}
                color={disabled ? 'default' : 'secondary'}
                icon={<CheckBoxOutlineBlankIcon color={disabled ? 'inherit' : 'secondary'} />}
                checkedIcon={<CheckBoxIcon color={disabled ? 'inherit' : 'secondary'} />}
                // sx={{'& .MuiSvgIcon-root': {bgcolor: 'white'}}}
                size='medium'
              />
              {/* <Box component={LabelIcon} color='inherit' sx={{mr: 1}} /> */}

              <Typography
                variant='subtitle1'
                color={disabled ? 'gray' : 'secondary'}
                sx={{fontWeight: 'inherit', flexGrow: 1}}
              >
                {labelText}
              </Typography>

              <Typography variant='caption' color='inherit'>
                {labelInfo}
              </Typography>
            </Box>
          }
          style={{
            '--tree-view-color': color,
            '--tree-view-bg-color': bgColor,
          }}
          {...other}
        />
      )}
    />
  )
}

function SidebarMenuMain() {
  const category = useAppSelector(({sidebar}) => sidebar.category)
  const {state} = useAppSelector(({post}) => post.plan)
  const {states} = useAppSelector(({user}) => user)
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(getCategories())
    dispatch(getStates())
  }, [])

  const methods = useForm({
    mode: 'onChange',
  })
  const {getValues, watch, reset, setValue} = methods
  const allSelect = watch('all_select')
  const all_states = watch('all_states')

  React.useEffect(() => {
    if (category.length > 0 && state != undefined && state.length > 0 && states) {
      const initialValues: any = {view: {}, purpose: {}, category: {}, state: {}}
      initialValues.view.my_posts = true
      initialValues.view.every_posts = true
      initialValues.purpose.sharing_message = true
      initialValues.purpose.resource_to_share = true
      initialValues.purpose.need_resources = true
      initialValues.purpose.have_event = true
      initialValues.all_states = true
      initialValues.all_select = true
      const initialCategory: any = category.reduce((acc: any, item: any) => {
        acc[item.name.toLowerCase()] = true
        return acc
      }, {})

      const initialStates: Record<string, boolean> = state.reduce((acc: any, item: any) => {
        acc[item.State] = false
        Object.keys(states).map((state_item) => {
          if (item.State == state_item) {
            acc[item.State] = true
          }
        })
        return acc
      }, {})

      reset({...initialValues, state: {...initialStates}, category: {...initialCategory}})
    }
  }, [category, reset, state, states])
  React.useEffect(() => {
    if (category.length > 0) {
      category.forEach((item: any) => {
        setValue(`category.${item.name.toLowerCase()}`, allSelect)
      })
    }
  }, [category, setValue, allSelect])

  const state_with_plan = React.useMemo(() => {
    if (state && state.length > 0 && states) {
      return state.map((item1: any, index: number) => {
        let temp = {...item1}
        temp.available = false
        Object.keys(states).map((item2) => {
          if (item1.State == item2) {
            temp.available = true
          }
        })
        return temp
      })
    }
  }, [state, states])

  React.useEffect(() => {
    if (state_with_plan != undefined && state_with_plan.length > 0) {
      state_with_plan.forEach((element: any) => {
        if (element.available) {
          if (all_states) {
            setValue(`state.${element.State}`, true)
          } else {
            setValue(`state.${element.State}`, false)
            setValue('state.none', true)
          }
        }
      })
    }
  }, [setValue, all_states, state_with_plan])

  const watch_state = watch('state')

  // React.useEffect(() => {
  //   if (watch_state) {
  //     Object.keys(states)?.forEach((element: any) => {
  //       if (!watch_state[`${element}`]) {
  //         setValue('all_states', false)
  //       }
  //     })
  //   }
  // }, [watch(), states, setValue])

  React.useEffect(() => {
    dispatch(addFilter(watch()))
  }, [watch()])

  return (
    <FormProvider {...methods}>
      <TreeView
        aria-label='gmail'
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon color='secondary' />}
        defaultExpandIcon={<ArrowRightIcon color='secondary' />}
        defaultEndIcon={<div style={{width: 24}} />}
        sx={{flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
      >
        <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1 ps-4'>View</span>
          </div>
        </div>
        <StyledTreeItem nodeId='1' labelText='My Posts' name='view.my_posts' labelIcon={MailIcon} />
        <StyledTreeItem
          nodeId='2'
          labelText="Every One Else's Posts"
          name='view.every_posts'
          labelIcon={DeleteIcon}
        />
        <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1 ps-4'>
              Search for Non-Profits
            </span>
          </div>
        </div>
        <StyledTreeItem
          nodeId='3'
          labelText='Sharing a Message'
          name='purpose.sharing_message'
          labelIcon={Label}
          labelInfo='90'
        />
        <StyledTreeItem
          nodeId='4'
          labelText='Resources to Share'
          name='purpose.resource_to_share'
          labelIcon={Label}
          labelInfo='3,566'
        />
        <StyledTreeItem
          nodeId='5'
          labelText='In need of Resources'
          name='purpose.need_resources'
          labelIcon={Label}
          labelInfo='733'
        />
        <StyledTreeItem
          nodeId='6'
          labelText='Event'
          name='purpose.have_event'
          labelIcon={Label}
          labelInfo='1037'
        />
        <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1 ps-4'>
              Select States to Search
            </span>
          </div>
        </div>
        <StyledTreeItem nodeId='4' labelText='States' name='all_states' labelIcon={Label}>
          {state_with_plan?.map((item: any, index: number) => (
            <StyledTreeItem
              disabled={!item.available}
              nodeId={item.State}
              labelText={item.Description}
              labelIcon={Label}
              name={`state.${item.State}`}
              key={index}
            />
          ))}
        </StyledTreeItem>
        <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1 ps-4'>
              Select Categories
            </span>
          </div>
        </div>
        <StyledTreeItem
          nodeId='7'
          labelText={allSelect ? 'De-Select All' : 'Select All'}
          name={'all_select'}
          labelIcon={Label}
        />
        {category.map((item: any, index: number) => (
          <StyledTreeItem
            nodeId={`${item.name}`}
            labelText={item.name}
            labelIcon={Label}
            key={index}
            name={`category.${item.name.toLowerCase()}`}
          />
        ))}
      </TreeView>
    </FormProvider>
  )
}

export default withReducer('sidebar', reducer)(SidebarMenuMain)
