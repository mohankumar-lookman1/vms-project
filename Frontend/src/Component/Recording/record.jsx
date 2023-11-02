import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import VideoGridControls from '../Global/videocontrol';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import VideoGrid from '../Global/videogrid';

const App = ({ videoUrls }) => {
  const [numCols, setNumCols] = useState(3);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [number, setNumber] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [fetchedVideoUrl, setFetchedVideoUrl] = useState(null);

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const handleNumColsChange = (cols) => {
    setNumCols(cols);
  };

  const handleCardClick = (data) => {
    setOpenDialog(true);
    setNumber(data.name);
  };

  const playVideo = () => {
    const hlsUrl = `http://192.168.1.52:3000/video-stream?cameraname=${number}&date=${startDate}&starttime=${startTime}&endtime=${endTime}`;
    setFetchedVideoUrl(hlsUrl);
    setIsVideoPlaying(true);
    setOpenDialog(false);
    console.log("HLS URL:", hlsUrl);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsVideoPlaying(false);
    setFetchedVideoUrl(null);
    if (playerRef.current) {
      playerRef.current.destroy();
    }
  };
  useEffect(() => {
    console.log("Fetched Video URL:", fetchedVideoUrl);
    console.log("Video Ref:", videoRef.current);
    if (fetchedVideoUrl && isVideoPlaying) {
      playerRef.current = new JSMpeg.Player(fetchedVideoUrl, {
        canvas: videoRef.current, 
        autoplay: true, 
        loop: true 
      });
    }
  }, [fetchedVideoUrl, isVideoPlaying]);

  return (
    <Container>
      <div className='body'>
        <VideoGridControls handleNumColsChange={handleNumColsChange} numCols={numCols} />
      </div>
      <div style={{ cursor: 'pointer' }}>
      {!isVideoPlaying && (
        <VideoGrid numCols={numCols} videoUrls={videoUrls} onCardClick={handleCardClick} enableClick={true} />
      )}
      </div>
      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ background: "#1c1919", color: "white" }}>Stream Details</DialogTitle>
        <DialogContent sx={{ background: "#1c1919" }}>
          <br />
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
          <Button
            onClick={playVideo}
            sx={{ marginLeft: "10px", marginBottom: "20px", background: "black", color: "white" }}
          >
            Retrieve Data
          </Button>
      
        </DialogContent>
      </Dialog>
      {fetchedVideoUrl && isVideoPlaying && (
      <canvas
         ref={videoRef}
         className="jsmpeg-player"
         width="640"
         height="480"
      ></canvas>
)}
    </Container>
  );
};

export default App;
