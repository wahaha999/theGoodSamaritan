import React from 'react'
import {Grid, Paper} from '@mui/material'
//import MyPostsDashboard from 'src/app/pages/dashboard/components/MyPostsDashboard';

// interface YouTubePlayerProps {
//   channelID: string
// }

// const YouTubePlayer: React.FC<YouTubePlayerProps> = ({channelID}) => {
//   const embedUrl = `https://www.youtube.com/embed/?listType=user_uploads&list=${channelID}`
//   return (
//     <div>
//       <iframe id='ytplayer' width='640' height='360' src={embedUrl}></iframe>
//     </div>
//   )
// }

const YoutubePage = () => {
  // const channelID = 'UUm9C6bqd05CQOVdOSC6fV2g'
  // const apiKey = 'AIzaSyD7vmPCkx_HO78o4126S2l1N_MeUPESanE'

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      style={{height: '100vh', overflow: 'hidden'}}
    >
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            width: '100%',
            paddingtop: '160px', // 16:9 aspect ratio (height/width * 100%)
            height: 'calc(100vh - 10px)', // Adjust the value as needed
          }}
        >
          <div style={{textAlign: 'center', marginBottom: '0px'}}>
            <h1>Training - Select the hamburger icon on the right to view all training videos</h1>
          </div>
          <iframe
            title='YouTube video player'
            style={{
              paddingTop: '10px',
              position: 'relative',
              top: '0',
              left: '10%',
              right: '10%',
              width: '80%',
              height: '80%',
            }}
            src='https://www.youtube.com/embed/videoseries?list=PLchZmuz9l4wJAf3puJ_hXIwEIHiABGqGM'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default YoutubePage
