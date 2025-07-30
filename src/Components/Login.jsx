import React,{ useState } from 'react';
import Button from './Button';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoCartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Login() {

  function callLoginApi(values) {
    console.log(values.username, values.password);
  }

  const schema = Yup.object().shape({
    username: Yup.string().matches(/^[a-zA-Z0-9_]+$/,"Only letters, numbers and underscore are allowed").required(),
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
    });

  return (
    <>
      <div className='flex flex-col items-center justify-center h-full bg-blue-800'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col'>
          <IoCartOutline className='text-white text-7xl self-center'/>
          <div className='mt-10 w-72 flex items-center border-2 border-white rounded-sm p-2'>
            <label htmlFor="username" className='sr-only'>Username</label>
            <MdOutlinePersonOutline className='mr-2 text-white text-lg'/>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              name="username"
              id='username'
              type="text"
              required
              className='w-full focus:outline-none text-white'
              placeholder='USERNAME'
            />
          </div>
            {touched.username && errors.username && (<div className='text-red-400 mt-1 text-sm' >{errors.username}</div>)}
          <div className='mt-4 w-72 flex items-center border-2 border-white rounded-sm p-2'>
            <label htmlFor="password" className='sr-only'>Password</label>
            <RiLockPasswordFill className='mr-2 text-white text-lg'/>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name='password'
              id='password'
              type="password"
              required
              className='w-full focus:outline-none text-white'
              placeholder='PASSWORD'
            />
          </div>
            {touched.password && errors.password && (<div className='text-red-400 mt-1 text-sm' >{errors.password}</div>)}
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