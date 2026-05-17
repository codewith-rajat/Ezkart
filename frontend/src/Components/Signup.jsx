import { IoCartOutline } from "react-icons/io5";
import { withFormik } from "formik";
import * as Yup from 'yup';
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline, MdOutlineMail, MdOutlinePersonOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Input from "./Input";
import axios from "axios";
import { withAlert, withUser } from './withProvider';
import API_BASE_URL from '../config.js'

function callSignupApi(values, bag) {
    axios.post(`${API_BASE_URL}/auth/signup`,{
        username:values.username,
        email:values.email,
        password:values.password,
        confirmPassword:values.confirmPassword,
        fullName:values.fullname
    }).then((response)=>{
        const {token, _id, fullName, username, email} = response.data;
        localStorage.setItem("token",token);
        if (bag.props?.setUser) {
            bag.props.setUser({_id, fullName, username, email});
        }
        if (bag.props?.navigate) {
            bag.props.navigate("/");
        }
    }).catch((error)=>{
        if (bag.props?.setAlert) {
            bag.props.setAlert({type:"error",message: error.response?.data?.message || "Signup failed"});
        }
    });
}

const schema = Yup.object().shape({
    username: Yup.string()
        .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscore are allowed")
        .required("username is a required field"),
    password: Yup.string()
        .min(8)
        .required("password is a required field")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[@$!%*?&]/, "Must contain at least one special character"),
    confirmPassword: Yup.string()
        .required("this is a required field")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    fullname: Yup.string()
        .required("name is a required field"),
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format")
});

const initialValues = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    fullname: ""
}
function Signup({ handleSubmit, handleChange, handleBlur, touched, errors, values }) {

    return (
        <>
            <div className="bg-blue-800 h-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col"
                >
                    <IoCartOutline className='text-white text-7xl self-center' />
                    <Input
                        value={values.fullname}
                        error={errors.fullname}
                        touched={touched.fullname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Full Name"
                        type="text"
                        required
                        name="fullname"
                        id="fullname"
                        placeholder="ENTER FULL NAME"
                        autoComplete="name"
                        icon={<MdOutlineDriveFileRenameOutline/>}
                    />
                    <Input
                        value={values.email}
                        error={errors.email}
                        touched={touched.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Email"
                        type="email"
                        required
                        name="email"
                        id="email"
                        placeholder="ENTER EMAIL"
                        autoComplete="email"
                        icon={<MdOutlineMail/>}
                    />
                    <Input
                        value={values.username}
                        error={errors.username}
                        touched={touched.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Username"
                        type="text"
                        required
                        name="username"
                        id="username"
                        placeholder="USERNAME"
                        autoComplete="username"
                        icon={<MdOutlinePersonOutline/>}
                    />
                    <Input
                        value={values.password}
                        error={errors.password}
                        touched={touched.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Password"
                        type="password"
                        required
                        name="password"
                        id="password"
                        placeholder="PASSWORD"
                        autoComplete="new-password"
                        icon={<RiLockPasswordFill/>}
                    />
                    <Input
                        value={values.confirmPassword}
                        error={errors.confirmPassword}
                        touched={touched.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Confirm Password"
                        type="password"
                        required
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="CONFIRM PASSWORD"
                        autoComplete="new-password"
                        icon={<RiLockPasswordFill/>}
                    />
                    <Button type="submit" className="text-blue-800 mt-4 bg-white" >Sign Up</Button>
                </form>
                <h1 className='mt-2 text-white'>Already have an account?
                    <Link to="/login" > Login</Link>
                </h1>
            </div>
        </>
    )
}

const myHOC = withFormik({ validationSchema: schema, initialValues: initialValues, handleSubmit: callSignupApi })
const FormikSignup = myHOC(Signup)

function SignupWithRouter(props) {
  const navigate = useNavigate();
  return <FormikSignup {...props} navigate={navigate} />;
}

const EasySignup = withAlert(withUser(SignupWithRouter))
export default EasySignup;