import React, { useState } from "react";
import { useField } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import classes from "./myForm.module.css";

const MyForm = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [revealPassword, setRevealPassword] = useState(false);

  const togglePasswordShowing = () => {
    setRevealPassword(!revealPassword);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor={props.id || props.name}>{label}</label>

      <div className={classes.inputDiv}>
        {props.type === "Password" ? (
          <>
            {!revealPassword ? (
              <VisibilityIcon
                sx={{ position: "absolute", paddingRight: "1rem" }}
                onClick={togglePasswordShowing}
              />
            ) : (
              <VisibilityOffIcon
                sx={{ position: "absolute", paddingRight: "1rem" }}
                onClick={togglePasswordShowing}
              />
            )}
            <input
              type={revealPassword ? "text" : "Password"}
              {...field}
              name={props.name}
            />
          </>
        ) : (
          <>
            <input {...field} {...props} />
          </>
        )}
      </div>

      {meta.touched && meta.error ? (
        <div style={{ color: "red", marginTop: ".5rem" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyForm;
