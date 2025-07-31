import React, { useState } from 'react';
import Button from './Button';
import { useFormik } from "formik";
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
    username: Yup.string().matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscore are allowed").required(),
    password: Yup.string().min(8).required(),
  });

  const { handleSubmit,
    values,
    handleChange,
    resetForm,
    errors,
    handleBlur,
    touched,
    isValid,
    dirty } = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit: callLoginApi,
      validationSchema: schema,
      validateOnMount:true 
    });

  return (
    <>
      <div className='flex flex-col items-center justify-center h-full bg-blue-800'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col'>
          <IoCartOutline className='text-white text-7xl self-center' />
          <Input
            label="Username"
            id="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            name="username"
            type="text"
            required
            autoComplete="username"
            placeholder="USERNAME"
            touched={touched.username}
            error={errors.username}
            icon={MdOutlinePersonOutline}
          />
            
          <Input
            label="Password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name='password'
            type="password"
            required
            placeholder='PASSWORD'
            autoComplete="password"
            touched={touched.password}
            error={errors.password} 
            icon={RiLockPasswordFill}/>
          <Button type="button" className="mt-8" onClick={resetForm}>Reset</Button>
          <Button type="submit" className="text-blue-800 mt-4" disabled={!isValid || !dirty}>Login</Button>
        </form>
        <h1 className='mt-2 text-white'>Don't have an account?
          <Link to="/signup" > Sign Up</Link>
        </h1>
        <Link className='text-white' to="/forgot-password">Forgot Password?</Link>
      </div>
    </>
  )
}

export default Login;