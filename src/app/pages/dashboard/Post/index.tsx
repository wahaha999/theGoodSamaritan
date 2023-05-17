import React, {memo, useMemo} from 'react'
import {Controller, FormProvider, useForm, useFormContext} from 'react-hook-form'
import PostEditor from './PostEditor'
import PostOptions from './PostOptions'
import TopImage from './TopImage'
import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import {useAppSelector} from 'src/app/store/hook'

type Props = {}
const labels = [
  {id: 1, color: 'red', title: 'Sharing Message'},
  {id: 2, color: 'green', title: 'With Resources to Share'},
  {id: 3, color: 'yellow', title: 'In need of Resources'},
  {id: 4, color: 'grey', title: 'That have an Event'},
]

const Post = (props: Props) => {
  const methods = useFormContext()
  const {
    control,
    formState: {errors},
  } = methods
  const {category} = useAppSelector(({sidebar}) => sidebar)
  const all_category = useMemo(() => {
    let temp: any = []
    category.map((item: any, index: number) => {
      temp.push(item.name)
    })
    return temp
  }, [category])
  return (
    <>
      <Grid container alignItems='center' my={4}>
        <Grid item md={4}>
          <Typography>Select the Purpose*</Typography>
        </Grid>
        <Grid item md={8}>
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
                      <Box
                        className='w-12 h-12 shrink-0 rounded-full'
                        sx={{backgroundColor: label.color}}
                      />
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
                    onChange(value)
                  }}
                  value={typeof value == 'string' ? JSON.parse(value) : value}
                  sx={{mx: 4, mb: 2}}
                  multiple
                  id='tags-outlined'
                  options={all_category}
                  // isOptionEqualToValue={(option, value) => option.id == value}
                  getOptionLabel={(option: any) => option}
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
      <PostEditor />
      <Box sx={{my: 2}} />
      <PostOptions />
      <TopImage />
    </>
  )
}

export default memo(Post)
