import * as React from 'react'
import {Theme, styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import TreeView from '@mui/lab/TreeView'
import TreeItem, {TreeItemProps, treeItemClasses} from '@mui/lab/TreeItem'
import Typography from '@mui/material/Typography'
import MailIcon from '@mui/icons-material/Mail'
import DeleteIcon from '@mui/icons-material/Delete'
import Label from '@mui/icons-material/Label'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import InfoIcon from '@mui/icons-material/Info'
import ForumIcon from '@mui/icons-material/Forum'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {SvgIconProps} from '@mui/material/SvgIcon'
import {Checkbox} from '@mui/material'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import {useAppSelector} from 'src/app/store/hook'
import withReducer from 'src/app/store/withReducer'
import reducer from '../store'
import {Controller, FormProvider, useForm, useFormContext} from 'react-hook-form'

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
  const {bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, name, ...other} = props
  const methods = useFormContext()
  const {control, watch} = methods
  const value = watch(`${name}`)
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <StyledTreeItemRoot
          label={
            <Box sx={{display: 'flex', alignItems: 'center', p: 0.5, pr: 0}}>
              <Checkbox
                {...field}
                checked={value !== undefined ? value : false}
                color='secondary'
                icon={<CheckBoxOutlineBlankIcon color='secondary' />}
                checkedIcon={<CheckBoxIcon />}
                // sx={{'& .MuiSvgIcon-root': {bgcolor: 'white'}}}
                size='medium'
              />
              {/* <Box component={LabelIcon} color='inherit' sx={{mr: 1}} /> */}

              <Typography
                variant='subtitle1'
                color='secondary'
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
  const methods = useForm({
    mode: 'onChange',
  })
  const {getValues, watch, reset, setValue} = methods

  React.useEffect(() => {
    if (category.length > 0) {
      const initialValues: Record<string, boolean> = category.reduce((acc: any, item: any) => {
        acc[item.name.toLowerCase()] = false
        // item.subcategories.forEach((sub: any) => {
        //   acc[sub.name.toLowerCase()] = false
        // })
        return acc
      }, {})

      // Add other static fields to initialValues
      initialValues.my_posts = false
      initialValues.every_posts = false
      initialValues.sharing_message = false
      initialValues.resource_to_share = false
      initialValues.need_resources = false
      initialValues.have_event = false
      initialValues.states = false
      initialValues.all_select = false

      // Reset the form with the new initialValues when category data is available
      reset(initialValues)
    }
  }, [category, reset])

  const allSelect = watch('all_select') // Watch the all_select field

  React.useEffect(() => {
    if (category.length > 0) {
      // Iterate through the category data and set the related fields to the value of all_select
      category.forEach((item: any) => {
        setValue(item.name.toLowerCase(), allSelect)
        // item.subcategories.forEach((sub: any) => {
        //   setValue(sub.name.toLowerCase(), allSelect)
        // })
      })
    }
  }, [category, setValue, allSelect])

  const watchedFields = watch()

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
        <StyledTreeItem nodeId='1' labelText='My Posts' name='my_posts' labelIcon={MailIcon} />
        <StyledTreeItem
          nodeId='2'
          labelText="Every One Else's Posts"
          name='every_posts'
          labelIcon={DeleteIcon}
        />
        <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1 ps-4'>
              Search for Non-Profits
            </span>
          </div>
        </div>
        {/* <StyledTreeItem nodeId='3' labelText='Categories' labelIcon={Label}>
          <StyledTreeItem
            nodeId='5'
            labelText='Social'
            labelIcon={SupervisorAccountIcon}
            labelInfo='90'
            // color='#1a73e8'
            // bgColor='#e8f0fe'
          />
          <StyledTreeItem
            nodeId='6'
            labelText='Updates'
            labelIcon={InfoIcon}
            labelInfo='2,294'
            // color='#e3742f'
            // bgColor='#fcefe3'
          />
          <StyledTreeItem
            nodeId='7'
            labelText='Forums'
            labelIcon={ForumIcon}
            labelInfo='3,566'
            // color='#a250f5'
            // bgColor='#f3e8fd'
          />
          <StyledTreeItem
            nodeId='8'
            labelText='Promotions'
            labelIcon={LocalOfferIcon}
            labelInfo='733'
            // color='primary'
            // bgColor='#e6f4ea'
          />
        </StyledTreeItem> */}
        <StyledTreeItem
          nodeId='3'
          labelText='Sharing a Message'
          name='sharing_message'
          labelIcon={Label}
          labelInfo='90'
        />
        <StyledTreeItem
          nodeId='4'
          labelText='With Resources to Share'
          name='resource_to_share'
          labelIcon={Label}
          labelInfo='3,566'
        />
        <StyledTreeItem
          nodeId='5'
          labelText='In need of Resources'
          name='need_resources'
          labelIcon={Label}
          labelInfo='733'
        />
        <StyledTreeItem
          nodeId='6'
          labelText='That have an Event'
          name='have_event'
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
        <StyledTreeItem nodeId='4' labelText='States' name='states' labelIcon={Label} />
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
            nodeId={item.name}
            labelText={item.name}
            labelIcon={Label}
            key={index}
            name={item.name.toLowerCase()}
          />
        ))}
      </TreeView>
    </FormProvider>
  )
}

export default withReducer('sidebar', reducer)(SidebarMenuMain)
