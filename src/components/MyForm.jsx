import React, { useState } from "react";
import { Field, useField } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const MyForm = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [revealPassword, setRevealPassword] = useState(false);

  const togglePasswordShowing = () => {
    setRevealPassword(!revealPassword);
  };

  console.log(field, props);

  return (
    <div style={{ margin: "1rem 0" }}>
      <label
        style={{
          marginRight: ".5rem",
          display: "block",
          marginBottom: ".3rem",
          textAlign: "left",
        }}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      {props.type === "Password" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
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
            style={{ width: "100%", height: "1.5rem" }}
            className="text-input"
            type={revealPassword ? "text" : "Password"}
            {...field}
            name={props.name}
          />
        </div>
      ) : (
        <input
          style={{ width: "100%", height: "1.5rem" }}
          className="text-input"
          {...field}
          {...props}
        />
      )}

      {meta.touched && meta.error ? (
        <div style={{ color: "red", marginTop: ".5rem" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyForm;
