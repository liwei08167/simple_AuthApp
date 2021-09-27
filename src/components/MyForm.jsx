import React from "react";
import { Field, useField } from "formik";

const MyForm = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // console.log(field, props);

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
      {/* {field.name === "Password" ? (
        <Field type={field.value ? "text" : "password"} name={field.name} />
      ) : (
        <input className="text-input" {...field} {...props} />
      )} */}
      <input
        style={{ width: "100%", height: "1.5rem" }}
        className="text-input"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div style={{ color: "red", marginTop: ".5rem" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyForm;
