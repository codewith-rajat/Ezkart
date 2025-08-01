import React, { useState } from 'react';
import Button from './Button';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoCartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Input from './Input';

function Login() {

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

  return (
    <>
      <Formik initialValues={initialValues}
        onSubmit={callLoginApi}
        validationSchema={schema}
        validateOnMount>
        {() => (
          <div className='flex flex-col items-center justify-center h-full bg-blue-800'>
            <Form
              className='flex flex-col'>
              <IoCartOutline className='text-white text-7xl self-center' />
              <Input
                label="Username"
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="USERNAME"
                icon={MdOutlinePersonOutline}
              />

              <Input
                label="Password"
                id="password"
                name='password'
                type="password"
                required
                placeholder='PASSWORD'
                autoComplete="current-password"
                icon={RiLockPasswordFill} />
              <Button type="submit" className="text-blue-800 mt-4">Login</Button>
            </Form>
            <h1 className='mt-2 text-white'>Don't have an account?
              <Link to="/signup" > Sign Up</Link>
            </h1>
            <Link className='text-white' to="/forgot-password">Forgot Password?</Link>
          </div>
        )}
      </Formik>
    </>
  )
}

export default Login;