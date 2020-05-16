import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";

function LoginForm() {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const doSubmit = function () {
    // Call the server
    console.log("Submitted");
  };

  const validate = function () {
    const options = { abortEarly: false };
    const { error: joiError } = Joi.validate(data, schema, options);
    if (!joiError) return null;

    const newErrors = {};
    for (let item of joiError.details) {
      newErrors[item.path[0]] = item.message;
    }
    return newErrors;
  };

  const validateProperty = function ({ name, value }) {
    const obj = { [name]: value };
    const propSchema = { [name]: schema[name] };
    const { error: joiError } = Joi.validate(obj, propSchema);
    return joiError ? joiError.details[0].message : null;
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors || {});
    if (newErrors) return;

    doSubmit();
  };

  const handleChange = function ({ currentTarget: input }) {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];

    const newAccount = { ...data };
    newAccount[input.name] = input.value;
    setData(newAccount);
    setErrors(newErrors);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          error={errors.username}
          value={data.username}
          onChange={handleChange}
          autoFocus
        />
        <Input
          name="password"
          label="Password"
          error={errors.password}
          value={data.password}
          type="password"
          onChange={handleChange}
        />
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
