import { withFormik } from "formik";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import * as Yup from 'yup'
import Button from "./Button";
import { Link } from "react-router-dom";
import Input from "./Input";

function callForgotPassword(values) {
    console.log(values.email);
}

const schema = Yup.object().shape({
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format")
});

const initialValues = {
    email: ""
}

function ForgotPassword({handleSubmit,handleChange,handleBlur,touched,errors,values}) {

    return (
        <>
            <div className="bg-blue-800 h-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col">
                    <IoCartOutline className='text-white text-7xl self-center' />
                    <Input
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.email}
                        error={errors.email}
                        label="Email"
                        type="email"
                        required
                        name="email"
                        id="email"
                        autoComplete="email"
                        placeholder="ENTER EMAIL"
                        icon={<MdOutlineMail/>}
                    />
                    <Button type="submit" className="text-blue-800">Request password reset</Button>
                </form>
                <Link to="/login" className="mt-2 text-white">Back to Login</Link>
            </div>
        </>
    );
}
const myHOC = withFormik({initialValues:initialValues,validationSchema:schema,handleSubmit:callForgotPassword});
const EasyForgotPassword = myHOC(ForgotPassword)

export default EasyForgotPassword;