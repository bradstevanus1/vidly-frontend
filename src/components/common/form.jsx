// import React, { useState } from "react";
// import Joi from "joi-browser";

// function Form({ name, label, handleChange, buttonLabel, children }) {
//   const [data, setData] = useState({});
//   const [errors, setErrors] = useState({});

//   const validate = function () {
//     const options = { abortEarly: false };
//     const { error: joiError } = Joi.validate(data, schema, options);
//     if (!joiError) return null;
//     const newErrors = {};
//     for (let item of joiError.details) {
//       newErrors[item.path[0]] = item.message;
//     }
//     return newErrors;
//   };
//   const validateProperty = function ({ name, value }) {
//     const obj = { [name]: value };
//     const propSchema = { [name]: schema[name] };
//     const { error: joiError } = Joi.validate(obj, propSchema);
//     return joiError ? joiError.details[0].message : null;
//   };
//   const handleSubmit = function (e) {
//     e.preventDefault();
//     const newErrors = validate();
//     setErrors(newErrors || {});
//     if (newErrors) return;
//     doSubmit();
//   };
//   const handleChange = function ({ currentTarget: input }) {
//     const newErrors = { ...errors };
//     const errorMessage = validateProperty(input);
//     if (errorMessage) newErrors[input.name] = errorMessage;
//     else delete newErrors[input.name];
//     const newAccount = { ...data };
//     newAccount[input.name] = input.value;
//     setData(newAccount);
//     setErrors(newErrors);
//   };
//   return (
//     <>
//       <Input
//         name={name}
//         label={label}
//         value={data[name]}
//         error={errors[name]}
//         onChange={handleChange}
//         autoFocus
//       />
//       <button disabled={validate()} className="btn btn-primary">
//         {buttonLabel}
//       </button>
//     </>
//   );
//   return null;
// }

// export default Form;
