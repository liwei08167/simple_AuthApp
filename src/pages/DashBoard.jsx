import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  Divider,
  Avatar,
  Typography,
  Alert,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link, useHistory, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const useStyles = makeStyles({
  headerIcon: {
    backgroundColor: blue[500],
    color: blue[500],
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
});

const DashBoard = (props) => {
  const { currentUser, logOut } = useAuth();
  const { history } = useHistory();
  const pig = useLocation();
  console.log({ pig });
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogOut = async () => {
    setErrorMsg("");
    try {
      await logOut();
      history.push("/signup");
    } catch (err) {
      setErrorMsg(err);
    }
  };
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
                D
              </Avatar>
            }
            title={<h1 style={{ margin: "0" }}>Dashboard</h1>}
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            <Typography variant="body1" style={{ marginTop: "1rem" }}>
              Username: {currentUser?.displayName}
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
          <Button varient="text" onClick={handleLogOut}>
            Log out
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default DashBoard;
