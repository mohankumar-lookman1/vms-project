import React from "react";
import {
  Button,
  Card,
  CardContent,
  Fab,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./styles.css";

const validationSchema = Yup.object().shape({
  cameraName: Yup.string().required("Camera Name is required"),
  cameraIP: Yup.string().required("Camera IP is required"),
  username: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed").required("Username is required"),
  password: Yup.string().matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,/^[A-Za-z\s]+$/).required("Password is required"),
});

const App = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleFabClick = () => {
    setShowForm(true);
  };

  const handleFabClose = () => {
    setShowForm(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("http://192.168.1.52/stream", {
        cameraName: values.cameraName,
        cameraIP: values.cameraIP,
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        setSuccessMessage("Data stored successfully");
        resetForm();
      }
    } catch (error) {
      console.error("Error storing data:", error);
      setSuccessMessage("Error storing data");
    }
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
          onClick={showForm ? handleFabClose : handleFabClick}
        >
          <AddIcon />
        </Fab>
      </div>

      {showForm && (
        <Card className="card" >
          <CardContent>
            <Formik
              initialValues={{
                cameraName: "",
                cameraIP: "",
                username: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Typography>Stream Details</Typography>
                <Field name="cameraName">
                  {({ field, form }) => (
                    <FormControl fullWidth>
                      <InputLabel >Camera Name</InputLabel>
                      <Input
                        {...field}
                        required
                      />
                      {form.touched.cameraName && form.errors.cameraName && (
                        <div className="error-message">
                          {form.errors.cameraName}
                        </div>
                      )}
                    </FormControl>
                  )}
                </Field>
                <br />
                <br />

                <Field name="cameraIP">
                  {({ field, form }) => (
                    <FormControl fullWidth>
                      <InputLabel >Camera IP</InputLabel>
                      <Input
                        {...field}
                        required
                        
                      />
                      {form.touched.cameraIP && form.errors.cameraIP && (
                        <div className="error-message">
                          {form.errors.cameraIP}
                        </div>
                      )}
                    </FormControl>
                  )}
                </Field>
                <br />
                <br />

                <Field name="username">
                  {({ field, form }) => (
                    <FormControl fullWidth>
                      <InputLabel >Username</InputLabel>
                      <Input
                        {...field}
                        required
                      />
                      {form.touched.username && form.errors.username && (
                        <div className="error-message">
                          {form.errors.username}
                        </div>
                      )}
                    </FormControl>
                  )}
                </Field>
                <br />
                <br />

                <Field name="password">
                  {({ field, form }) => (
                    <FormControl fullWidth>
                      <InputLabel >Password</InputLabel>
                      <Input
                        {...field}
                        required
                      />
                      {form.touched.password && form.errors.password && (
                        <div className="error-message">
                          {form.errors.password}
                        </div>
                      )}
                    </FormControl>
                  )}
                </Field>
                <br />
                <br />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="button"
                  sx={{ marginLeft: "10px" }}
                >
                  Save Stream
                </Button>
                <span> </span>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFabClose}
                  className="button"
                >
                  Cancel Stream
                </Button>
              </Form>
            </Formik>


            {successMessage && (
              <p style={{ color: "white" }}>{successMessage}</p>
            )}
          </CardContent>
        </Card>
      )}

      
    </div>
  );
};

export default App;