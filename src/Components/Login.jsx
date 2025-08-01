import React, { useState } from 'react';
import Button from './Button';
import * as Yup from 'yup';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoCartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import Input from './Input';

function callLoginApi(values) {
  console.log(values.username, values.password);
}

const schema = Yup.object().shape({
  username: Yup.string().matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscore are allowed").required("username is a required field"),
  password: Yup.string().min(8).required("password is a required field"),
});

const initialValues = {
  username: "",
  password: "",
}

function Login({ handleSubmit, values, errors, touched, handleChange, handleBlur }) {
  console.log("data", values, errors);
  return (
    <>
      <div className='flex flex-col items-center justify-center h-full bg-blue-800'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col'>
          <IoCartOutline className='text-white text-7xl self-center' />
          <Input
            value={values.username}
            error={errors.username}
            touched={touched.username}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Username"
            id="username"
            name="username"
            type="text"
            required
            autoComplete="username"
            placeholder="USERNAME"
            icon={<MdOutlinePersonOutline/>}
          />

          <Input
            value={values.password}
            error={errors.password}
            touched={touched.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password"
            id="password"
            name='password'
            type="password"
            required
            placeholder='PASSWORD'
            autoComplete="current-password"
            icon={<RiLockPasswordFill/>} />
          <Button type="submit" className="text-blue-800 mt-4">Login</Button>
        </form>
        <h1 className='mt-2 text-white'>Don't have an account?
          <Link to="/signup" > Sign Up</Link>
        </h1>
        <Link className='text-white' to="/forgot-password">Forgot Password?</Link>
      </div>
    </>
  )
}
const myHOC = withFormik({ initialValues: initialValues, validationSchema: schema, handleSubmit: callLoginApi });
const EasyLogin = myHOC(Login);
export default EasyLogin;