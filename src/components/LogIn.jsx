import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  Paper,
  Divider,
  Avatar,
} from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { blue } from "@material-ui/core/colors";
import * as yup from "yup";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import MyForm from "./MyForm";

const useStyles = makeStyles((theme) => ({
  divContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  headerIcon: {
    backgroundColor: blue[500],
    color: theme.palette.getContrastText(blue[500]),
  },
  submitBtn: {
    backgroundColor: blue[500],
    color: "white",
  },
  forgetPsDiv: {
    textAlign: "center",
    marginTop: "1rem",
  },
}));

const validationSchema = yup.object({
  email: yup.string().email().required().default(""),
  password: yup.string().required().default(""),
});

const initValue = validationSchema.cast();

const LogIn = (props) => {
  console.log(props);
  const classes = useStyles();
  const { logIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className={classes.divContainer}>
      <Grid container spacing={2} style={{ textAlign: "center" }}>
        <Grid item xs={3}>
          <Paper></Paper>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="LogIn" className={classes.headerIcon}>
                  L
                </Avatar>
              }
              title={<h1 style={{ margin: "0" }}>Log In</h1>}
              subheader="please fill in your details here"
            />
            <Divider />
            <CardContent>
              <Formik
                initialValues={initValue}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  try {
                    await logIn(values.email, values.password);
                    console.log(values);
                    props.history.push("/");
                    actions.resetForm(initValue);
                  } catch (err) {
                    setErrorMsg(err.message);
                    console.log(err);
                  }
                }}
              >
                {(formik) => {
                  console.log(formik);
                  return (
                    <Form>
                      {errorMsg !== "" && (
                        <Alert severity="warning">{errorMsg}</Alert>
                      )}

                      <MyForm
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="hello@hello.com"
                      />
                      <MyForm label="Password" name="password" type="text" />
                      <Button
                        variant="contained"
                        className={classes.submitBtn}
                        size="small"
                        fullWidth
                        type="submit"
                      >
                        Log In
                      </Button>
                      <div className={classes.forgetPsDiv}>
                        <Link to="/forgot-password">Forgot Password?</Link>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </CardContent>
          </Card>
          <div style={{ marginTop: ".5rem" }}>
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Grid>
        <Grid item xs={3}>
          <Paper></Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LogIn;
