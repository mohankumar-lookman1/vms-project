import React ,{useState} from 'react';
import { Container } from '@mui/material';
import VideoGrid from '../Global/videogrid';
import VideoGridControls from '../Global/videocontrol';
import Form from "../form/stream"
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
    <div>
      <Form/>
    </div>
    </Container>
  );
};

export default App;
