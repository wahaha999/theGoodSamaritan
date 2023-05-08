import React, {useState} from 'react'
import {Typography, Grid, ButtonBase, styled, Box, ButtonBaseProps} from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Controller, useFormContext} from 'react-hook-form'
type Props = {}
interface BorderButtonProps extends ButtonBaseProps {
  clicked: boolean
}
const BorderButton = styled((props: BorderButtonProps) => {
  const {...other} = props
  return <ButtonBase {...other} />
})(({theme, clicked}) => ({
  border: clicked ? `1px dashed ${theme.palette.primary.main}` : '1px dashed grey',
  borderRadius: '4px',
  width: 100,
  height: 50,
  fontWeight: 600,
  backgroundColor: clicked ? 'rgba(105, 39, 183, 0.3)' : '',
  transition: theme.transitions.create('backgroundColor', {
    duration: theme.transitions.duration.standard,
  }),
}))
const params = [0, 50, 100, 200, 500, 1000]
const AboutNonProfit = (props: Props) => {
  const methods = useFormContext()
  const {
    control,
    formState: {errors},
  } = methods
  return (
    <>
      <Typography>
        How many people do you have in your non-profit(please include congregations as well)
      </Typography>
      <Grid container justifyContent='space-between' gap={4} sx={{my: 3}}>
        <Controller
          name='organize'
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <>
                {params.map((param, index) => (
                  <BorderButton
                    clicked={value == index + 1}
                    key={index}
                    onClick={() => {
                      onChange(index + 1)
                    }}
                  >
                    {params[index] === 1000
                      ? `${params[index]} +`
                      : `${params[index] + 1} - ${params[index + 1]}`}
                  </BorderButton>
                ))}
              </>
            )
          }}
        />
      </Grid>
      {errors.organize && (
        <Typography color='red'>{errors.organize.message?.toString()}</Typography>
      )}
      <Box sx={{display: 'flex', mb: 3}}>
        <Typography paddingRight={4}>Tell us about your Non-Profit Organization</Typography>
        <Typography>
          Tell us about your Mission. This information will be displayed by other users to learn
          more about you and your organization
        </Typography>
      </Box>
      <Controller
        name='mission'
        control={control}
        render={({field: {onChange, value}}) => (
          <ReactQuill
            theme='snow'
            style={{height: '250px', marginTop: 2}}
            value={value}
            onChange={(e) => {
              onChange(e)
            }}
          />
        )}
      />
    </>
  )
}

export default AboutNonProfit
