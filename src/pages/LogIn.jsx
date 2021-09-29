import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  Divider,
  Alert,
} from "@mui/material";
import { Formik, Form } from "formik";
import { blue } from "@mui/material/colors";
import * as yup from "yup";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import MyForm from "../components/MyForm";

const useStyles = makeStyles({
  // headerIcon: {
  //   backgroundColor: (props) => `${blue[500]}!important`,
  //   color: blue[500],
  // },
  submitBtn: {
    backgroundColor: blue[500],
    color: "white",
  },
  forgetPsDiv: {
    textAlign: "center",
    marginTop: "1rem",
  },
  cardFooter: {
    marginTop: ".5rem",
  },
  linkText: {
    textDecoration: "none",
  },
});

const validationSchema = yup.object({
  email: yup.string().email().required().default(""),
  password: yup
    .string()
    .min(4, "please enter more then 4 characters")
    .required()
    .default(""),
});

const initValue = validationSchema.cast();

const LogIn = (props) => {
  console.log(props);
  const classes = useStyles();
  const { logIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      textAlign="center"
    >
      <Grid item xs={6} lg={4}>
        <Card>
          <CardHeader
            title={<h3 style={{ margin: "0" }}>Log In</h3>}
            subheader="please enter your details here"
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
                    <MyForm label="Password" name="password" type="Password" />

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
                      <Link to="/forgot-password" className={classes.linkText}>
                        Forgot Password?
                      </Link>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
        <div className={classes.cardFooter}>
          Need an account?{" "}
          <Link className={classes.linkText} to="/signup">
            Sign Up
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default LogIn;
