import React from "react";
import { Formik } from "formik";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Tag from "antd/lib/tag";

const inputBottomMargin = { marginBottom: "10px" };
const tagStyle = {
  color: "red",
  ...inputBottomMargin,
};

const AddStudentForm = () => {
  const initialValues = { firstName: "", lastName: "", email: "", gender: "" };

  const validateHandler = (values) => {
    let errors = {};

    if (!values.firstName) {
      errors.firstName = "First Name Required";
    }

    if (!values.lastName) {
      errors.lastName = "Last Name Required";
    }

    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.gender) {
      errors.gender = "Gender Required";
    } else if (!["MALE", "male", "FEMALE", "female"].includes(values.gender)) {
      errors.gender = "Gender must be (MALE, male, FEMALE, female)";
    }

    return errors;
  };

  // to use axios
  const submitHandler = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    // prettier-ignore
    <Formik
      initialValues={initialValues}
      validate={validateHandler}
      onSubmit={submitHandler}
    >
      {
          ({values, errors, touched, handleChange,handleBlur, handleSubmit,isSubmitting,submitForm,isValid}) => (
            <form onSubmit={handleSubmit}>
                <Input
                    style={inputBottomMargin}
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder='First name. E.g John'
                />
                {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
        
                <Input
                    style={inputBottomMargin}
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder='Last name. E.g Jones'
                />
                {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}
        
                <Input
                    style={inputBottomMargin}
                    name="email"
                    type='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder='Email. E.g example@gmail.com'
                />
                {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}
        
                <Input
                    style={inputBottomMargin}
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    placeholder='Gender. E.g Male or Female'
                />
                {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}
        
                <Button 
                    onClick={() => submitForm()} 
                    type="submit" 
                    disabled={isSubmitting | (touched && !isValid)}>
                    Submit
                </Button>
        
            </form>
          )
      }
    </Formik>
  );
};

export default AddStudentForm;
