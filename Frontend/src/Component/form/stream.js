import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Fab,
  FormControl,
  InputLabel,
  Input
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./styles.css"; // Import the CSS file

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [streamData, setStreamData] = useState({
    streamName: "",
    streamType: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Save data to localStorage
    const savedData = JSON.parse(localStorage.getItem("streamData")) || [];
    savedData.push(streamData);
    localStorage.setItem("streamData", JSON.stringify(savedData));

    // Reset the form and show success message
    setStreamData({ streamName: "", streamType: "" });
    setSuccessMessage("Stream data saved successfully!");
  };
  const handleFabClick = () => {
    setShowForm(true);
  };

  const handleFabClose = () => {
    setShowForm(false);
  };
  return (
    <div>
        <div className="container">
        <Fab
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
          }}
          onClick={showForm ? handleFabClose : handleFabClick} // Toggle showForm
        >
          <AddIcon />
        </Fab>
      </div>

      {showForm && (
        <Card className="card" sx={{ backgroundColor: "black" }}>
          <CardContent>
            <form onSubmit={handleFormSubmit}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "white" }}>Stream Name</InputLabel>
                <Input
                  required
                  value={streamData.streamName}
                  onChange={(e) =>
                    setStreamData({
                      ...streamData,
                      streamName: e.target.value,
                    })
                  }
                  sx={{ color: "white" }} // Set input text color
                />
              </FormControl>
              <br />
              <br />

              <FormControl fullWidth className="form-control">
                <InputLabel sx={{ color: "white" }}>Stream URL</InputLabel>
                <Input
                  required
                  value={streamData.streamUrl}
                  onChange={(e) =>
                    setStreamData({
                      ...streamData,
                      streamUrl: e.target.value,
                    })
                  }
                  sx={{ color: "white" }} // Set input text color
                />
              </FormControl>
              <br />
              <br />

              <Button
                variant="contained"
                color="error"
                type="submit"
                className="button"
                sx={{background:'red',marginLeft:"10px"}} >
                Save Stream
              </Button>
              <span> </span>
              <Button
                variant="contained"
                color="error"
                onClick={() => setShowForm(false)}
                className="button"
                sx={{background:'red',marginLeft:"20px" }} >
                Cancel Stream
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {successMessage && (
        <Card className="card">
          <CardContent>{successMessage}</CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;
