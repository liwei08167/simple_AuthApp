import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const NotFound = () => {
  return (
    <div>
      <h3>page Not found!</h3>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained">go back</Button>
      </Link>
    </div>
  );
};
