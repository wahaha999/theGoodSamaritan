import React, {memo, useEffect, useMemo, useState} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import PostEditor from './PostEditor'
import PostOptions from './PostOptions'
import TopImage from './TopImage'
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import {useAppSelector} from 'src/app/store/hook'
import PasswordIcon from '@mui/icons-material/Password'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SendTimeExtensionOutlinedIcon from '@mui/icons-material/SendTimeExtensionOutlined'
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined'
import AssistWalkerOutlinedIcon from '@mui/icons-material/AssistWalkerOutlined'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import {IPostDialog} from '../store/postDialogSlice'
type Props = {}
export const labels = [
  {
    id: 1,
    color: 'red',
    title: 'Sharing Message',
    icon: <SendTimeExtensionOutlinedIcon sx={{ml: 2}} />,
  },
  {
    id: 2,
    color: 'green',
    title: 'Resources to Share ',
    icon: <HomeRepairServiceOutlinedIcon sx={{ml: 2}} />,
  },
  {
    id: 3,
    color: 'yellow',
    title: 'In need of Resources',
    icon: <AssistWalkerOutlinedIcon sx={{ml: 2}} />,
  },
  {id: 4, color: 'grey', title: 'Event', icon: <EmojiEventsOutlinedIcon sx={{ml: 2}} />},
]

const Post = (props: Props) => {
  const methods = useFormContext()
  const {open, postType, postOption}: IPostDialog = useAppSelector(({post}) => post.postDialog)
  const {
    control,
    watch,
    setValue,
    formState: {errors},
  } = methods
  const {category} = useAppSelector(({sidebar}) => sidebar)
  const [word, setWord] = useState<string>('')
  const [isKeywordSet, SetIsKeywordSet] = useState(false)
  const keyword = watch('keyword')
  useEffect(() => {
    if (!isKeywordSet && keyword != null) {
      if (typeof keyword == 'string') {
        if (keyword == 'null') {
          setValue('keyword', [])
        } else {
          setValue('keyword', [...JSON.parse(keyword ? keyword : '[]')])
        }
        SetIsKeywordSet(true)
      }
    }
  }, [keyword, isKeywordSet, setValue])

  const all_category = useMemo(() => {
    let temp: any = []
    category.map((item: any, index: number) => {
      temp.push({name: item.name, value: item.name.toLowerCase()})
    })
    return temp
  }, [category])

  const categoryies = watch('category')
  const [category_value, setCategoryValue] = useState([])
  useEffect(() => {
    if (all_category.length > 0 && categoryies) {
      setCategoryValue(all_category.filter((item: any) => categoryies.includes(item.value)))
    }
  }, [all_category, categoryies])
  return (
    <>
      {postType.includes('post') && (
        <>
          <Grid container alignItems='center' my={4}>
            <Grid item md={4} xs={12}>
              <Typography>Select the Purpose*</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Controller
                name='purpose'
                defaultValue=''
                control={control}
                render={({field}) => (
                  <FormControl fullWidth error={!!errors.purpose}>
                    <InputLabel required id='select-label'>
                      Purpose
                    </InputLabel>
                    <Select
                      required
                      fullWidth
                      labelId='select-label'
                      placeholder='Select your purpose'
                      id='label-select'
                      {...field}
                      startAdornment={
                        <InputAdornment position='start'>
                          <ShareIcon />
                        </InputAdornment>
                      }
                      //   value={value}
                      label='Purpose'
                      //   onChange={handleChange}
                      //   ref={ref}
                      classes={{select: 'd-flex items-center space-x-12'}}
                    >
                      {labels.map((label) => (
                        <MenuItem value={label.id} key={label.id} className='space-x-12'>
                          {label.icon}
                          <span>{label.title}</span>
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors?.purpose?.message as string}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={7} xs={12}>
              <Controller
                name='category'
                defaultValue={[]}
                control={control}
                render={({field: {onChange, value}}) => {
                  return (
                    <>
                      {/* <Typography mx={4} my={2}>
                Select Your Category*
              </Typography> */}
                      <FormControl fullWidth error={!!errors.category}>
                        <Autocomplete
                          onChange={(e, value: any) => {
                            setCategoryValue(value)
                            onChange(value.map((item: any) => item.value))
                          }}
                          value={category_value}
                          sx={{mb: 2}}
                          multiple
                          id='tags-outlined'
                          options={all_category}
                          // isOptionEqualToValue={(option, value) => option.value === value}
                          isOptionEqualToValue={(option, value) => {
                            return option.value === value
                          }}
                          getOptionLabel={(option: any) => {
                            return option.name
                          }}
                          // defaultValue={[top100Films[13]]}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              required
                              error={!!errors.category}
                              helperText={errors.category?.message as string}
                              {...params}
                              label='Select Your Category'
                              placeholder='Categories'
                            />
                          )}
                        />
                      </FormControl>
                    </>
                  )
                }}
              />
            </Grid>
            <Grid item md={5} xs={12} sx={{mb: 2}}>
              <Controller
                name='keyword'
                control={control}
                defaultValue={[]}
                render={({field: {value, onChange}}) => {
                  return (
                    <>
                      <TextField
                        error={!!errors.event_name}
                        helperText={errors.event_name?.message as string}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && word.length > 1) {
                            onChange([...value, word])
                            setWord('')
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <PasswordIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                color='primary'
                                disabled={word.length < 2}
                                onClick={() => {
                                  onChange([...value, word])
                                  setWord('')
                                }}
                              >
                                <AddCircleOutlineIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        placeholder='Enter key words to help others find your post'
                        label='Keyword'
                        value={word}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setWord(e.target.value)
                          // onChange([...value, e.target.value])
                        }}
                        // {...field}
                        // disabled={purpose != 4}
                        fullWidth
                      />
                    </>
                  )
                }}
              />
            </Grid>
          </Grid>
          {typeof keyword != 'string' && keyword?.length > 0 && (
            <Grid container gap={2} mb={2} alignItems='center'>
              <Typography variant='caption'>Keyword: </Typography>
              {keyword?.map((item: string, index: number) => (
                <Chip
                  label={item}
                  key={index}
                  onDelete={() => {
                    keyword.splice(index, 1)
                    setValue('keyword', keyword)
                  }}
                />
              ))}
            </Grid>
          )}
        </>
      )}
      <PostEditor />
      <Box sx={{my: 2}} />
      <PostOptions />
      <TopImage />
    </>
  )
}

export default memo(Post)
