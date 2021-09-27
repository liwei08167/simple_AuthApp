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
}));

const validationSchema = yup.object({
  userName: yup
    .string()
    .min(3, "please provide username longer then 3 letters!")
    .required()
    .default(""),
  email: yup.string().email().required().default(""),
  password: yup
    .string()
    .min(6, "should be min 6 characters")
    .required()
    .default(""),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords don't match")
    .required()
    .min(6, "should be min 6 characters")
    .default(""),
});

const initValue = validationSchema.cast();

const SignUp = (props) => {
  console.log(props);
  const { signUp, currentUser, updatePerson } = useAuth();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorFromAuth, setErrorFromAuth] = useState(null);
  console.log(initValue.userName);

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
                <Avatar aria-label="signUp" className={classes.headerIcon}>
                  S
                </Avatar>
              }
              title={<h1 style={{ margin: "0" }}>Sign Up</h1>}
              subheader="please fill in your details here"
            />
            <Divider />
            <CardContent>
              <Formik
                initialValues={initValue}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  try {
                    await signUp(values.email, values.password);
                    await updatePerson(
                      values.userName,
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2wyDsj13YUmKZdkNpkrBovwpMFpJSWXg_EoQmKGWa6jKs1gVzQLGe5y5WnDq69XwPjM&usqp=CAU"
                    );
                    setLoading(true);
                    console.log(values);
                    props.history.push("/");
                    actions.resetForm(initValue);
                  } catch (err) {
                    setErrorFromAuth(err.message);
                    console.log(err);
                  }

                  setLoading(false);
                }}
              >
                {(formik) => {
                  // console.log(formik);

                  return (
                    <Form>
                      {errorFromAuth !== null && (
                        <Alert severity="warning">{errorFromAuth}</Alert>
                      )}

                      <MyForm label="User Name" name="userName" type="text" />
                      <MyForm
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="hello@hello.com"
                      />
                      <MyForm label="Password" name="password" type="text" />
                      <MyForm
                        label="Confirm Password"
                        name="confirmPassword"
                        type="text"
                      />
                      <Button
                        variant="contained"
                        className={classes.submitBtn}
                        size="small"
                        fullWidth
                        type="submit"
                        disabled={loading}
                      >
                        Sign up
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </CardContent>
          </Card>
          <div style={{ marginTop: ".5rem" }}>
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Grid>
        <Grid item xs={3}>
          <Paper></Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
