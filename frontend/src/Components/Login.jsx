import Button from './Button';
import * as Yup from 'yup';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoCartOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { withFormik } from 'formik';
import Input from './Input';
import axios from 'axios';
import {withAlert, withUser} from './withProvider';
import API_BASE_URL from '../config.js'

function callLoginApi(values, { setSubmitting, props }) {
  
  axios.post(`${API_BASE_URL}/auth/login`,{
    email:values.email,
    password:values.password
  }).then((response)=>{
    const {token, _id, fullName, username, email} = response.data;
    localStorage.setItem("token",token);
    props.setUser({_id, fullName, username, email});
    props.setAlert({type:"success",message:"Login Successful!"});
    setTimeout(() => {
      props.navigate("/");
    }, 1000);
    setSubmitting(false);
  }).catch((error)=>{
    const errorMessage = error.response?.data?.message || "Invalid Credentials";
    props.setAlert({type:"error",message:errorMessage});
    setSubmitting(false);
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
const FormikLogin = myHOC(Login);

function LoginWithRouter(props) {
  const navigate = useNavigate();
  return <FormikLogin {...props} navigate={navigate} />;
}

const EasyLogin = withAlert(withUser(LoginWithRouter));
export default EasyLogin;