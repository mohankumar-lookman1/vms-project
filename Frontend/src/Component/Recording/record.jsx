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

  const handleNumColsChange = (cols) => {
    setNumCols(cols);
  };

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
      <div style={{ cursor: 'pointer' }}>
      <VideoGrid numCols={numCols} videoUrls={videoUrls} onCardClick={handleCardClick} enableClick={true}  />
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
