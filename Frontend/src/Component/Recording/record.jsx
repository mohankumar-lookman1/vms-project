import React, { useState } from 'react';
import VideoPlayer from './videoplayer';
import videoUrls from '../../Data/source.json';
import { Container, Grid, IconButton, Card, CardContent, Typography } from '@mui/material';
import WindowSharpIcon from '@mui/icons-material/WindowSharp';
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import './styles.css'; // Import the styles

const App = () => {
  const [numCols, setNumCols] = useState(3);

  const handleNumColsChange = (cols) => {
    setNumCols(cols);
  };

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
          {Object.keys(videoUrls).map((streamKey, index) => (
            <Grid item xs={12 / Math.min(numCols, Object.keys(videoUrls).length)} key={index}>
              <Card className="custom-card" style={{backgroundColor:'#111115', color:'white'}}>
                <div className="video-container">
                  <VideoPlayer streamKey={streamKey} />
                </div>
                <CardContent>
                  <Typography>{streamKey.toUpperCase()}</Typography>
                  {/* Add your content here */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
     
    </Container>
  );

};

export default App;
