import React from 'react';
//import MyPostsDashboard from 'src/app/pages/dashboard/components/MyPostsDashboard';

interface YouTubePlayerProps {
  channelID: string;
}
 
const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ channelID }) => {
  const embedUrl = `https://www.youtube.com/embed/?listType=user_uploads&list=${channelID}`;
  return (
  <div>
    <iframe
      id="ytplayer" 
      width="640" height="360"
      src="{embedUrl}"            
    ></iframe>
    </div>
  );
};


const MyComponent = () => {
  const channelID = 'UUm9C6bqd05CQOVdOSC6fV2g';
  const apiKey = 'AIzaSyD7vmPCkx_HO78o4126S2l1N_MeUPESanE';

  return (
    <div>
      <h1>Welcome to My YouTube Channel</h1>
      <YouTubePlayer channelID={channelID} />
    </div>
  );
};

export default MyComponent;
