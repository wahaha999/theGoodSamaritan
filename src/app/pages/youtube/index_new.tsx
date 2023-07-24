import React, { useEffect, useState } from 'react';
import axios from 'axios';

//import MyPostsDashboard from 'src/app/pages/dashboard/components/MyPostsDashboard';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const YoutubePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/playlistItems',
          {
            params: {
              part: 'snippet',
              playlistId: 'PLchZmuz9l4wJAf3puJ_hXIwEIHiABGqGM',
              maxResults: 50,
              key: 'AIzaSyD7vmPCkx_HO78o4126S2l1N_MeUPESanE',
            },
          }
        );

        const fetchedVideos = response.data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
        }));

        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

  fetchVideos();
}, []);
return (
  <div>
    <h1>YouTube Playlist</h1>
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  </div>
);
};

export default YoutubePage;
