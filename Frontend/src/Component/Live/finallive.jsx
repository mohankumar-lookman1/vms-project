import React ,{useState} from 'react';
import { Container } from '@mui/material';
import VideoGrid from '../Reusable/videogrid';
import VideoGridControls from '../Reusable/videocontrol';

const App = ({videoUrls}) => {
  const [numCols, setNumCols] = useState(3);
  const handleNumColsChange = (cols) => {
    setNumCols(cols);
  };
  return (
    <Container>
      <div className='body'>
        <VideoGridControls handleNumColsChange={handleNumColsChange} numCols={numCols} />
      </div>
      <VideoGrid numCols={numCols} videoUrls={videoUrls} />
    
    </Container>
  );
};

export default App;
