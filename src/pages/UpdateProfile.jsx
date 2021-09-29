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
  Avatar,
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

  cardFooter: {
    marginTop: ".5rem",
  },
  linkText: {
    textDecoration: "none",
  },
});

const validationSchema = yup.object({
  email: yup.string().email().required().default(""),
  userName: yup
    .string()
    .min(3, "please provide username longer then 3 letters!")
    .required(),

  //   password: yup
  //     .string()
  //     .nullable()
  //     .min(6, "should be min 6 characters")
  //     .transform((_, val) => {
  //       return val === "" ? null : val;
  //     })
  //    ,
  //   confirmPassword: yup
  //     .string()
  //     .oneOf([yup.ref("password"), null], "passwords don't match")
  //     .nullable()
  //     .min(6, "should be min 6 characters")
  //     .transform((_, val) => {
  //       return val === "" ? null : val;
  //     })
  //     ,
});

const initValue = validationSchema.cast();

const UpdateProfile = (props) => {
  console.log(props);
  const classes = useStyles();
  const { updateEmail, updatePerson, currentUser } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  console.log({ currentUser });

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
            avatar={
              <Avatar aria-label="Dashboard" className={classes.headerIcon}>
                {currentUser?.displayName.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={<h3 style={{ margin: "0" }}>Update Profile</h3>}
            subheader="please enter your new email and/or new password below"
          />
          <Divider />
          <CardContent>
            <Formik
              initialValues={{
                userName: currentUser?.displayName,
                email: currentUser?.email,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                try {
                  if (values.email !== currentUser.email) {
                    await updateEmail(values.email);
                  }

                  if (values.userName !== currentUser.displayName) {
                    await updatePerson(values.userName, "");
                  }
                  props.history.push("/");
                  console.log({ values });
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
                    <MyForm label="User Name" name="userName" type="text" />

                    <MyForm
                      label="Email"
                      name="email"
                      type="text"
                      placeholder="hello@hello.com"
                    />

                    {/* <MyForm label="Password" name="password" type="Password" />
                    <MyForm
                      label="Confirm Password"
                      name="confirmPassword"
                      type="Password"
                    /> */}

                    <Button
                      variant="contained"
                      sx={{ marginTop: "1rem" }}
                      size="small"
                      fullWidth
                      type="submit"
                    >
                      Update Profile
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
        <div className={classes.cardFooter}>
          <Link className={classes.linkText} to="/">
            Cancel
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default UpdateProfile;
