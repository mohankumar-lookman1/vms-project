import React, { useState, useEffect } from 'react';
import VideoPlayer from '../Reusable/videoplayer';
import { 
  Container, Grid, IconButton, Card, CardContent, Typography, 
  Button, Dialog, DialogTitle, DialogContent,  TextField, Alert 
} from '@mui/material';
import WindowSharpIcon from '@mui/icons-material/WindowSharp';
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import './styles.css';
import axios from 'axios';

const App = () => {
  const [numCols, setNumCols] = useState(3);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [number, setNumber] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [videoUrls, setVideoUrls] = useState([]);

  const isStep1Valid = startTime !== '' && endTime !== '' && endTime > startTime;

  const handleNumColsChange = (cols) => {
    setNumCols(cols);
  };

  const handleCardClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          {[1, 2, 3].map(cols => (
            <IconButton
              key={cols}
              onClick={() => handleNumColsChange(cols)}
              className={cols === numCols ? 'icon-button-active' : 'icon-button'}
              sx={{ color: "white" }}
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
              <Card className="custom-card" style={{ backgroundColor: '#111115', color: 'white', cursor: 'pointer' }} onClick={() => handleCardClick(videoUrl)}>
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
};

export default App;