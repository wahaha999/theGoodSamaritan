import {styled} from '@mui/material'
import React from 'react'

type Props = {}

const SupportIcon = (props: Props) => {
  const Box_Support = styled('div')({
    backgroundImage: 'url("/media/misc/support.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: 120,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '0px solid black', // Add border styles here
    position: 'relative', // Add position relative to create a new stacking context
    '&::before': {
      content: '"Need Help? Click here"',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '0.8rem',
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '4px',
      borderRadius: '2px',
      visibility: 'hidden',
      opacity: 0,
      transition: 'visibility 0s, opacity 0.3s linear',
    },
    '&:hover::before': {
      visibility: 'visible',
      opacity: 1,
      backgroundColor: '#F9BF3B',
    },
    // '@media (max-width: 1800px)': {
    //   width: 200,
    //   height: 200,
    // },
    // '@media (max-width: 400px)': {
    //   width: 150,
    //   height: 150,
    // },
    '@media (max-width: 1300px)': {
      width: 100,
      height: 100,
    },
  })

  const BoxWithBackground_support = () => {
    const handleLinkClick = () => {
      // Replace 'https://www.example.com' with your desired external website URL
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSc83BeNQnjY9HaTLZvrJJxbuEmzw4DmWBQr_gZKjIG7g32H4w/viewform?usp=sf_link',
        '_blank'
      )
    }

    return (
      <Box_Support onClick={handleLinkClick}>
        {/* You can add content inside the box if needed */}
      </Box_Support>
    )
  }
  return <BoxWithBackground_support />
}

export default SupportIcon
