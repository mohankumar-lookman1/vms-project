<<<<<<< HEAD
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
=======
import React ,{useState} from 'react';
import { Container,Button, Dialog, DialogTitle, DialogContent,  TextField, Alert } from '@mui/material';
import VideoGrid from '../Reusable/videogrid';
import VideoGridControls from '../Reusable/videocontrol';

const App = ({videoUrls}) => {
  const [numCols, setNumCols] = useState(3);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [number, setNumber] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const isStep1Valid = startTime !== '' && endTime !== '' && endTime > startTime;
>>>>>>> 28153e93304a09767a9c7589d35f25cddf573f5b

  const handleNumColsChange = (cols) => {
    setNumCols(cols);
  };

<<<<<<< HEAD
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

=======
  const handleCardClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  return (
    <Container>
      <div className='body'>
        <VideoGridControls handleNumColsChange={handleNumColsChange} numCols={numCols} style={{marginRight:"0"}}/>
      </div>
      <VideoGrid numCols={numCols} videoUrls={videoUrls} onCardClick={handleCardClick} enableClick={true} />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ background: "#1c1919", color: "white" }}>Stream Details</DialogTitle>
        <DialogContent sx={{ background: "#1c1919" }}>
          <br/>
          <TextField
            label="Camera Name"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            fullWidth
            InputLabelProps={{
              shrink: true,
              style: { color: 'white' }
            }}
            InputProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: "20px", }}
            required
          />
              <TextField
        label=" Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        type="date"
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: { color: 'white' }
        }}
        InputProps={{ style: { color: 'white' } }}
        sx={{ marginBottom: "20px", color: "white" }}
        required
      />
      <TextField
        label="Starting Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        type="time"
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: { color: 'white' }
        }}
        InputProps={{style: { color: 'white' }}}
        sx={{ marginBottom: "20px", color: "white" }}
        required
      />
       <TextField
        label="Ending Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        type="time"
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: { color: 'white' }
        }}
        InputProps={{style: { color: 'white' }}}
        sx={{ marginBottom: "20px", color: "white" }}
        required
      />
          {!isStep1Valid && (
            <Alert severity="error" sx={{ background: "#1c1919", color: "white" }}> Please fill in the required details and ensure that the end date is after the start date.</Alert>
          )}
          <Button
            onClick={isStep1Valid ? null : () => alert('Please fill the required details and ensure that to give a proper timing.')}
            sx={{ marginLeft: "10px", marginBottom: "20px", background: "black", color: "white" }}
          >
            Retrieve Data
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
>>>>>>> 28153e93304a09767a9c7589d35f25cddf573f5b
};

export default App;
