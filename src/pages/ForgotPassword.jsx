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
  submitBtn: {
    backgroundColor: blue[500],
    color: "white",
    marginTop: "2rem",
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
});

const initValue = validationSchema.cast();

const ForgotPassword = (props) => {
  console.log(props);
  const classes = useStyles();
  const { resetPassword } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [resetPsw, setResetPsw] = useState(false);

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
            title={<h3 style={{ margin: "0" }}>Forgot Password</h3>}
            subheader="please enter your email here"
          />
          <Divider />
          <CardContent>
            <Formik
              initialValues={initValue}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                setResetPsw(false);
                try {
                  await resetPassword(values.email);
                  setResetPsw(true);

                  actions.resetForm(initValue);
                } catch (err) {
                  setResetPsw(false);
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

                    {errorMsg === "" && resetPsw && (
                      <Alert severity="success">please check your email</Alert>
                    )}
                    <Button
                      variant="contained"
                      sx={{ marginTop: "1rem" }}
                      size="small"
                      fullWidth
                      type="submit"
                    >
                      Reset Password
                    </Button>
                    <div className={classes.forgetPsDiv}>
                      <Link className={classes.linkText} to="/login">
                        Log In
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

export default ForgotPassword;
