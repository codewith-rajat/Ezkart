import React, { useContext, useState } from 'react';
import Button from './Button';
import * as Yup from 'yup';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoCartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import Input from './Input';
import axios from 'axios';
import withUser from './withUser';

function callLoginApi(values,bag) {
  
  axios.post("https://myeasykart.codeyogi.io/login",{
    email:values.email,
    password:values.password
  }).then((response)=>{
    const {user,token} = response.data;
    localStorage.setItem("token",token);
    bag.props.setUser(user);
    bag.props.navigate("/");
  }).catch(()=>{
    console.log("Invalid Credentials");
  })
}

const schema = Yup.object().shape({
  email: Yup.string().required("Email is a required field").email("Invalid email format"),
  password: Yup.string().min(8).required("password is a required field"),
});

const initialValues = {
  email: "",
  password: "",
}

function Login({ handleSubmit, values, errors, touched, handleChange, handleBlur}) {
  
  return (
    <>
      <div className='flex flex-col items-center justify-center h-full bg-blue-800'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col'>
          <IoCartOutline className='text-white text-7xl self-center' />
          <Input
            value={values.email}
            error={errors.email}
            touched={touched.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label="email"
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="EMAIL"
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
          <Button type="submit" className="text-blue-800 bg-white mt-4">Login</Button>
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
export default withUser(EasyLogin);