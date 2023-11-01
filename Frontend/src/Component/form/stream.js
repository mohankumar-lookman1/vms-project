import React from "react";
import {
  Button,
  Card,
  CardContent,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./styles.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Camera Name is required"),
  ip: Yup.string().required("Camera IP is required"),
  username: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed").required("Username is required"),
  password: Yup.string().required("Password is required"),
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
      const response = await axios.post("http://192.168.1.52:3000/add-stream", {
        name: values.name,
        ip: values.ip,
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
        <Card className="card"  sx={{background:"#1c1919",color:"white"}}>
          <CardContent>
            <Formik
              initialValues={{
                name: "",
                ip: "",
                username: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form  >
                <Typography>Stream Details</Typography>
                <br/>
                <Field name="name">
               {({ field, form }) => (
              <TextField
               {...field}
               fullWidth
               label="Camera Name"
               sx={{ color: 'white' }}
               required
               InputLabelProps={{
               style: { color: 'white' } }}
               InputProps={{ style: { color: 'white' }}}
               error={form.touched.name && !!form.errors.name}
               helperText={form.touched.name ? form.errors.name : ''}  />
               )}
              </Field>
                <br />
                <br/>
              <Field name="ip">
                {({ field, form }) => (
               <TextField
               {...field}
               fullWidth
               label="Camera IP"
               sx={{ color: 'white' }}
               required
               InputLabelProps={{
               style: { color: 'white' } }}
               InputProps={{ style: { color: 'white' }}}
               error={form.touched.ip && !!form.errors.ip}
               helperText={form.touched.ip ? form.errors.ip : ''} />
               )}
              </Field>
                <br />
                <br />

                <Field name="username">
                {({ field, form }) => (
                   <TextField
                   {...field}
                   fullWidth
                   label="Username"
                   sx={{ color: 'white' }}
                   required
                   InputLabelProps={{
                   style: { color: 'white' }
                    }}
                   InputProps={{ style: { color: 'white' }}}
                   error={form.touched.username && !!form.errors.username}
                   helperText={form.touched.username ? form.errors.username : ''}/>
                    )}
                  </Field>
                <br />
                <br />

                <Field name="password">
                   {({ field, form }) => (
                    <TextField
                   {...field}
                   fullWidth
                   label="Password"
                   type="password"
                   sx={{ color: 'white' }}
                   required
                   InputLabelProps={{
                   style: { color: 'white' }
                   }}
                   InputProps={{ style: { color: 'white' }}}
                   error={form.touched.password && !!form.errors.password}
                   helperText={form.touched.password ? form.errors.password : ''} />
                    )}
                  </Field>
                <br />
                <br />

                <Button
                  type="submit"
                  className="button"
                  sx={{ background:"black",color:"white"}}
                >
                  Save Stream
                </Button>
                <Button
                 
                  onClick={handleFabClose}
                  className="button"
                  sx={{background:"black",color:"white", width:"13vw",marginLeft:"10px"}}
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
