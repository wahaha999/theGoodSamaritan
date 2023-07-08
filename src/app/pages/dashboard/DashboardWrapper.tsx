import { Grid, useTheme, Hidden, styled } from '@mui/material';
import { FC, memo } from 'react';
import FollowingDashboard from './components/FollowingDashboard';
import MyPostsDashboard from './components/MyPostsDashboard';
import PostTitleItem from './components/PostTitleItem';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/app/store/hook';
import { getPosts } from './store/postSlice';


const container = {
  show: {
    transition: {
      staggerChildren: 2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

const Box = styled('div')({
  backgroundImage: 'url("/media/misc/balanced-feedback.webp")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: 300,
  height: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '0px solid black', // Add border styles here
  position: 'relative', // Add position relative to create a new stacking context
  '&::before': {
    content: '"We embrace your feedback. Click here"',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '8px',
    borderRadius: '4px',
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s, opacity 0.3s linear',
  },
  '&:hover::before': {
    visibility: 'visible',
    opacity: 1,
    backgroundColor: '#F9BF3B',
  },
});

const Box_Support = styled('div')({
  backgroundImage: 'url("/media/misc/support.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: 300,
  height: 300,
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
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '8px',
    borderRadius: '4px',
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s, opacity 0.3s linear',
  },
  '&:hover::before': {
    visibility: 'visible',
    opacity: 1,
    backgroundColor: '#F9BF3B',
  },
});

const BoxWithBackground = () => {
  const handleLinkClick = () => {
    // Replace 'https://www.example.com' with your desired external website URL
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSc83BeNQnjY9HaTLZvrJJxbuEmzw4DmWBQr_gZKjIG7g32H4w/viewform?usp=sf_link', '_blank');
  };

  return (
    <Box onClick={handleLinkClick}>
      {/* You can add content inside the box if needed */}
    </Box>
  );
};


const BoxWithBackground_support = () => {
  const handleLinkClick = () => {
    // Replace 'https://www.example.com' with your desired external website URL
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSc83BeNQnjY9HaTLZvrJJxbuEmzw4DmWBQr_gZKjIG7g32H4w/viewform?usp=sf_link', '_blank');
  };

  return (
    <Box_Support onClick={handleLinkClick}>
      {/* You can add content inside the box if needed */}
    </Box_Support>
  );
};

const DashboardPage: FC = () => {
  const theme = useTheme();
  // const media = useMediaQuery()
  return (
    <>
      <motion.div variants={container} initial='hidden' animate='show'>
        <Grid container columnSpacing={4} sx={{ mt: 4 }}>
          <Grid item xs={1}></Grid>
          <Grid item md={10} xl={6}>
            <motion.div variants={item} initial='hidden' animate='show'>
              <MyPostsDashboard />
            </motion.div>
          </Grid>
          <Hidden xlDown>
            <Grid item md={2} sx={{ position: 'fixed', right: 350 }}>
              <BoxWithBackground />
              <BoxWithBackground_support />
            </Grid>
            
          </Hidden>
          
        </Grid>
        
      </motion.div>
    </>
  );
};

const DashboardWrapper: FC = () => {
  return (
    <>
      <DashboardPage />
    </>
  );
};

export default memo(DashboardWrapper);
