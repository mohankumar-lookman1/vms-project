import React from 'react';
import { IconButton } from '@mui/material';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import WindowSharpIcon from '@mui/icons-material/WindowSharp';
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp';

const VideoGridControls = ({ handleNumColsChange, numCols }) => {
  return (
    <div className='icons'>
      {[1, 2, 3].map((cols) => (
        <IconButton
          key={cols}
          onClick={() => handleNumColsChange(cols)}
          className={cols === numCols ? 'icon-button-active' : 'icon-button'}
          sx={{ color: "black" }}
        >
          {cols === 1 ? <ViewAgendaSharpIcon  /> : cols === 2 ? <WindowSharpIcon /> : <ViewModuleSharpIcon />}
        </IconButton>
      ))}
    </div>
  );
};

export default VideoGridControls;
