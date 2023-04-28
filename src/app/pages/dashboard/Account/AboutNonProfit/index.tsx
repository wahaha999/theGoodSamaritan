import React,{useState} from 'react'
import {Typography,Grid,ButtonBase,styled, Box,ButtonBaseProps} from '@mui/material'
import  ReactQuill  from 'react-quill';
import 'react-quill/dist/quill.snow.css';
type Props = {}
interface BorderButtonProps extends ButtonBaseProps {
  clicked: boolean
}
const BorderButton = styled((props:BorderButtonProps) => {
  const {...other} = props
  return <ButtonBase {...other} />
})(({theme,clicked}) => ({
  border: clicked?  `1px dashed ${theme.palette.primary.main}`: '1px dashed grey',
  borderRadius:'4px',
  width: 100,
  height:50,
  fontWeight: 600,
  backgroundColor: clicked ? 'rgba(105, 39, 183, 0.3)' : '',
  transition: theme.transitions.create('backgroundColor', {
    duration: theme.transitions.duration.standard,
  }),
}))
const params = [0,50,100,200,500,1000]
const AboutNonProfit = (props: Props) => {
  const [value,setValue] = useState<number>(0)
  const handleClick = (id:number) => {
    setValue(id);
  }
  return (
    <>
      <Typography>How many people do you have in your non-profit(please include congregations as well)</Typography>
      <Grid container justifyContent="space-between" gap={4} sx={{ my: 3 }}>
        {
          params.map((param,index) => (
            <BorderButton clicked={value === index+1} key={index} onClick={() => handleClick(index+1)}>{params[index]+1} -{ params[index+1]}</BorderButton>

          ))
        }
      </Grid>
      <Box sx={{display:'flex',mb:3}}>
        <Typography paddingRight={4} >Tell us about your Non-Profit Organization</Typography>
        <Typography >Tell us about your Mission. This information will be displayed by other users to learn more about you and your organization</Typography>
      </Box>
      <ReactQuill theme="snow" style={{height:'500px'}}/>
    </>
  )
}

export default AboutNonProfit