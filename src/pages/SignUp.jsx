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
  },
  cardFooter: {
    marginTop: ".5rem",
  },
});

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
  const { signUp, currentUser, updatePerson } = useAuth();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorFromAuth, setErrorFromAuth] = useState(null);
  console.log(initValue.userName);

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
            title={<h3 style={{ margin: "0" }}>Sign Up</h3>}
            subheader="please enter your details here"
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
                    <MyForm label="Password" name="password" type="Password" />
                    <MyForm
                      label="Confirm Password"
                      name="confirmPassword"
                      type="Password"
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
        <div className={classes.cardFooter}>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignUp;