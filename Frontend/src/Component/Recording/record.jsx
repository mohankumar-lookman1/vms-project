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

  const handleFetchData = () => {
    // Here you can make an API request to fetch data based on the selected streamKey, startDate, endDate, startTime, and endTime.
    // If data is available, set `dataAvailable` to true; otherwise, set it to false.
    // For this example, let's assume data is available.
    setDataAvailable(true);
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
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                label="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                type="time"
                fullWidth
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
              {/* Add code to display fetched data */}
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
