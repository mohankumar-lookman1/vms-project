import React, { useState } from 'react';
import VideoPlayer from './videoplayer';
import videoUrls from '../../Data/source.json';
import { Container, Grid, IconButton, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, Stepper, Step, StepLabel, TextField, Alert } from '@mui/material';
import WindowSharpIcon from '@mui/icons-material/WindowSharp';
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import './styles.css'; // Import the styles

const App = () => {
  const [numCols, setNumCols] = useState(3);
  const [selectedStreamKey, setSelectedStreamKey] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dataAvailable, setDataAvailable] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [content, setContent] = useState('');

  const isStep1Valid = startDate !== '' && endDate !== '' && endDate > startDate;

  const handleNumColsChange = (cols) => {
    setNumCols(cols);
  };

  const handleCardClick = (streamKey) => {
    setSelectedStreamKey(streamKey);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep(activeStep - 1);
  };

  const dummyApiData = {
    stream1: {
      dataAvailable: true,
      content: "This is sample data for Stream 1.",
    },
    stream2: {
      dataAvailable: false,
      content: "Data not found for Stream 2.",
    },
    // Add data for other streams as needed
  };
  
  const handleFetchData = async () => {
    // Simulate fetching data from the dummy API based on the selected streamKey.
    const response = dummyApiData[selectedStreamKey];
    
    if (response) {
      const { dataAvailable, content } = response;
      // Update the state based on the dummy API response.
      setDataAvailable(dataAvailable);
      setContent(content); // Set the content to be used in rendering.
    }
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
              sx={{ color: "white" }}
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
              <Card className="custom-card" style={{ backgroundColor: '#111115', color: 'white', cursor: 'pointer' }} onClick={() => handleCardClick(streamKey)}>
                <div className="video-container">
                  <VideoPlayer streamKey={streamKey} />
                </div>
                <CardContent>
                  <Typography>{streamKey.toUpperCase()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Stream Details</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step key="SelectDates">
              <StepLabel>Select Dates</StepLabel>
            </Step>
            <Step key="SelectTimes">
              <StepLabel>Select Times</StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 && (
            <div>
              <TextField
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className="text-field"
                sx={{ marginBottom: "20px" }}
                required
              />
              <TextField
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className="text-field"
                sx={{ marginBottom: "20px" }}
                required
              />
              {!isStep1Valid && (
                <Alert severity="error">Please fill in the required details and ensure that the end date is after the start date.</Alert>
              )}
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <TextField
                label="Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type="time"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                label="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                type="time"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className="text-field"
                sx={{ marginBottom: "20px" }}
                
              />
              
            </div>
            
          )}
          <div>
            {activeStep === 0 && (
              <Button
                onClick={isStep1Valid ? handleNextStep : () => alert('Please fill the required details and ensure that the end date is after the start date.')}
                variant="contained"
                
                sx={{ marginLeft: "10px", marginBottom: "20px" }}
              >
                Next
              </Button>
            )}
            {activeStep === 1 && (
              <div>
                <Button className="form-button" onClick={handleBackStep} variant="contained"  sx={{ marginLeft: "10px", marginBottom: "20px" }}>
                  Back
                </Button>
                <Button className="form-button" onClick={handleFetchData} variant="contained" sx={{ marginLeft: "30px", marginBottom: "20px" }}>
                  Fetch Data
                </Button>
              </div>
            )}
          </div>
          {dataAvailable ? (
  <div>
    <Typography>Data is available for {selectedStreamKey} from {startDate} {startTime} to {endDate} {endTime}</Typography>
    <Typography>{content}</Typography>
  </div>
) : (
  <Typography>Data not found for {selectedStreamKey} from {startDate} {startTime} to {endDate} {endTime}</Typography>
)}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default App;
