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
import {Controller, FormProvider, useForm, useFormContext} from 'react-hook-form'
import {showMessage} from 'src/app/store/fuse/messageSlice'
import {getStates} from 'src/app/pages/dashboard/store/planSlice'
import BillingManage from 'src/app/pages/dashboard/Billing/BillingManage'
import {addFilter} from 'src/app/pages/dashboard/store/filterSlice'

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
                    console.log('value==', value)
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
  const methods = useForm({
    mode: 'onChange',
  })
  const {getValues, watch, reset, setValue} = methods

  React.useEffect(() => {
    if (category.length > 0 && state != undefined && state.length > 0 && states) {
      const initialValues: any = {view: {}, purpose: {}, category: {}, state: {}}
      initialValues.view.my_posts = true
      initialValues.view.every_posts = false
      initialValues.purpose.sharing_message = false
      initialValues.purpose.resource_to_share = false
      initialValues.purpose.need_resources = false
      initialValues.purpose.have_event = false
      initialValues.all_states = false
      initialValues.all_select = false
      const initialCategory: any = category.reduce((acc: any, item: any) => {
        acc[item.name.toLowerCase()] = false
        // item.subcategories.forEach((sub: any) => {
        //   acc[sub.name.toLowerCase()] = false
        // })
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
      // console.log(
      //   '🚀 ~ file: SidebarMenuMain.tsx:144 ~ constinitialStates:Record<string,boolean>=state.reduce ~ initialStates:',
      //   initialStates
      // )

      // initialValues = { ...initialStates };

      // Add other static fields to initialValues

      // Reset the form with the new initialValues when category data is available
      reset({...initialValues, state: {...initialStates}, category: {...initialCategory}})
    }
  }, [category, reset, state, states])

  const allSelect = watch('all_select') // Watch the all_select field

  React.useEffect(() => {
    if (category.length > 0) {
      // Iterate through the category data and set the related fields to the value of all_select
      category.forEach((item: any) => {
        setValue(`category.${item.name.toLowerCase()}`, allSelect)
        // item.subcategories.forEach((sub: any) => {
        //   setValue(sub.name.toLowerCase(), allSelect)
        // })
      })
    }
  }, [category, setValue, allSelect])

  React.useEffect(() => {
    dispatch(getStates())
  }, [dispatch])

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
  // React.useEffect(() => {
  //   if (category.length > 0) {
  //     // Iterate through the category data and check for changes in the related fields
  //     category.forEach((item: any) => {
  //       let allSubcategoriesChecked = true

  //       // If the category field is true, set all related subcategory fields to true
  //       if (watchedFields[item.name.toLowerCase()]) {
  //         item.subcategories.forEach((sub: any) => {
  //           setValue(sub.name.toLowerCase(), true)
  //         })
  //       } else {
  //         item.subcategories.forEach((sub: any) => {
  //           setValue(sub.name.toLowerCase(), false)
  //         })
  //       }
  //     })
  //   }
  // }, [category, setValue, watchedFields])

  // React.useEffect(() => {
  //   if (category.length > 0) {
  //     // Iterate through the category data and check for changes in the subcategory fields
  //     category.forEach((item: any) => {
  //       let allSubcategoriesChecked = true
  //       if (item.subcategories.length > 0) {
  //         // Check if all subcategories are checked
  //         item.subcategories.forEach((sub: any) => {
  //           if (!watchedFields[sub.name.toLowerCase()]) {
  //             allSubcategoriesChecked = false
  //           }
  //         })

  //         if (!allSubcategoriesChecked) {
  //           // If any subcategory field is false, set the parent category field to false
  //           setValue(item.name.toLowerCase(), false)
  //         }
  //       }
  //     })
  //   }
  // }, [category, setValue, watchedFields])

  // React.useEffect(() => {
  //   // console.log('value=====================', allValues)
  // }, [allValues])
  console.log('value==', watch())
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
