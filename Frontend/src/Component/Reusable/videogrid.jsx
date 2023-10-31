import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import VideoPlayer from './videoplayer'; 

const VideoGrid = ({ numCols, onCardClick, enableClick }) => {
  const [videoData, setVideoData] = useState([]);
  
  useEffect(() => {
    axios.get('http://192.168.1.52:3000/available-ports')
      .then(response => {
        setVideoData(response.data.availablePorts);
      })
      .catch(error => {
        console.error('Error fetching video URLs:', error);
      });
  }, []);
  
  return (
    <Grid container spacing={2}>
      {videoData.map((data, index) => (
        <Grid item xs={12 / Math.min(numCols, videoData.length)} key={index}>
          <Card 
            className="custom-card" 
            style={{ backgroundColor: '#111115', color: 'white' }} 
            onClick={enableClick ? () => onCardClick(data) : null}
          >
            <div className="video-container">
              <VideoPlayer videoUrl={data.url} />
            </div>
            <CardContent>
              <Typography>{`${data.name}`}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoGrid;
