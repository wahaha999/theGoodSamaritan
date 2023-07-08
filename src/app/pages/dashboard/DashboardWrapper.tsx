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
  backgroundImage: 'url("/media/misc/feedback-opinion-28072609.webp")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: 300,
  height: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
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
            <Grid item md={2} sx={{ position: 'fixed', right: 250 }}>
              <BoxWithBackground />
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
