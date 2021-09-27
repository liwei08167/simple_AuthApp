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
  Typography,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

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
  cardContent: {
    minHeight: "15vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const DashBoard = (props) => {
  const { currentUser } = useAuth();
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState("");
  console.log({ currentUser });
  // console.log(props);
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
                <Avatar aria-label="Dashboard" className={classes.headerIcon}>
                  D
                </Avatar>
              }
              title={<h1 style={{ margin: "0" }}>Dashboard</h1>}
            />
            <Divider />
            <CardContent className={classes.cardContent}>
              <Typography variant="body1" style={{ marginTop: "1rem" }}>
                User Name: {currentUser?.displayName}
              </Typography>
              <Typography variant="body1" style={{ margin: "1rem 0" }}>
                Email: {currentUser && currentUser.email}
              </Typography>
              <Button
                variant="contained"
                className={classes.submitBtn}
                size="small"
                fullWidth
                // onClick={() => updatePerson("HAPPY PIGS22", null)}
              >
                Update Profile
              </Button>
            </CardContent>
          </Card>
          <div style={{ marginTop: ".5rem" }}>
            <Link to="/update-profile">Log out</Link>
          </div>
        </Grid>
        <Grid item xs={3}>
          <Paper></Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashBoard;
