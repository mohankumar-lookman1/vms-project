import React, { useState, useEffect } from 'react';
import VideoPlayer from './videoplayer';
import { Container, Grid, IconButton, Card, CardContent, Typography } from '@mui/material';
import WindowSharpIcon from '@mui/icons-material/WindowSharp';
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import './styles.css';
import axios from 'axios';
import Form from "../form/stream"

const App = () => {
  const [numCols, setNumCols] = useState(3);
  const [videoUrls, setVideoUrls] = useState([]);

  const handleNumColsChange = (cols) => {
    setNumCols(cols);
  };

  useEffect(() => {
    axios.get('http://192.168.1.52:3000/available-ports')
      .then(response => {
        setVideoUrls(response.data.availablePorts);
      })
      .catch(error => {
        console.error('Error fetching video URLs:', error);
      });
  }, []);

  return (
    <Container>
      <div className='body'>
        <div className='icons'>
          {[1, 2, 3].map((cols) => (
            <IconButton
              key={cols}
              onClick={() => handleNumColsChange(cols)}
              className={cols === numCols ? 'icon-button-active' : 'icon-button'}
              sx={{color:"white"}}
            >
              {cols === 1 ? <ViewAgendaSharpIcon /> : cols === 2 ? <WindowSharpIcon /> : <ViewModuleSharpIcon />}
            </IconButton>
          ))}
        </div>
      </div>
      <div>
        <Grid container spacing={2}>
          {videoUrls.map((videoUrl, index) => (
            <Grid item xs={12 / Math.min(numCols, videoUrls.length)} key={index}>
              <Card className="custom-card" style={{backgroundColor:'#111115', color:'white'}}>
                <div className="video-container">
                  <VideoPlayer videoUrl={videoUrl} />
                </div>
                <CardContent>
                  <Typography>{`Stream ${index + 1}`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="add-icon">
        <Form />
      </div>
    </Container>
  );
};

export default App;
