import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Button from "./Button";
import { Link } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline, MdOutlineMail, MdOutlinePersonOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function Signup() {

    function callSignupApi(values) {
        console.log(values.fullname, values.username, values.email, values.password, values.confirmPassword);
    }

    const schema = Yup.object().shape({
        username: Yup.string()
            .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscore are allowed")
            .required(),
        password: Yup.string()
            .min(8)
            .required()
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
            .required()
            .email("Invalid email format")
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
                email: "",
                confirmPassword: "",
                fullname: ""
            },
            onSubmit: callSignupApi,
            validationSchema: schema,
        });
    return (
        <>
            <div className="bg-blue-800 h-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col"
                >
                    <IoCartOutline className='text-white text-7xl self-center' />
                    <div className="mt-6 w-72 flex items-center border-2 border-white rounded-sm p-2">
                        <label htmlFor="fullname" className="sr-only">Full Name</label>
                        <MdOutlineDriveFileRenameOutline className="mr-2 text-white text-lg" />
                        <input
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            name="fullname"
                            value={values.fullname}
                            id="fullname"
                            className="w-full focus:outline-none text-white"
                            placeholder="ENTER FULL NAME"
                        />
                    </div>
                    {touched.fullname && errors.fullname && (<div className="text-red-400 mt-1 text-sm">{errors.fullname}</div>)}
                    <div className="mt-4 w-72 flex items-center border-2 border-white rounded-sm p-2">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <MdOutlineMail className="mr-2 text-white text-lg" />
                        <input
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            name="email"
                            value={values.email}
                            id="email"
                            className="w-full focus:outline-none text-white"
                            placeholder="ENTER EMAIL"
                        />
                    </div>
                    {touched.email && errors.email && (<div className="text-red-400 mt-1 text-sm">{errors.email}</div>)}
                    <div className="mt-4 w-72 flex items-center border-2 border-white rounded-sm p-2">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <MdOutlinePersonOutline className='mr-2 text-white text-lg' />
                        <input
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            name="username"
                            value={values.username}
                            id="username"
                            className="w-full focus:outline-none text-white"
                            placeholder="USERNAME"
                        />
                    </div>
                    {touched.username && errors.username && (<div className="text-red-400 mt-1 text-sm">{errors.username}</div>)}
                    <div className="mt-4 w-72 flex items-center border-2 border-white rounded-sm p-2">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <RiLockPasswordFill className='mr-2 text-white text-lg' />
                        <input
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            name="password"
                            value={values.password}
                            id="password"
                            className="w-full focus:outline-none text-white"
                            placeholder="PASSWORD"
                        />
                    </div>
                    {touched.password && errors.password && (<div className="text-red-400 mt-1 text-sm">{errors.password}</div>)}
                    <div className="mt-4 w-72 flex items-center border-2 border-white rounded-sm p-2">
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <RiLockPasswordFill className='mr-2 text-white text-lg' />
                        <input
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            name="confirmPassword"
                            value={values.confirmPassword}
                            id="confirmPassword"
                            className="w-full focus:outline-none text-white"
                            placeholder="CONFIRM PASSWORD"
                        />
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (<div className="text-red-400 mt-1 text-sm">{errors.confirmPassword}</div>)}
                    <Button type="button" className="mt-4" onClick={resetForm}>Reset</Button>
                    <Button type="submit" className="text-blue-800 mt-4" disabled={!isValid || !dirty}>Sign Up</Button>
                </form>
                <h1 className='mt-2 text-white'>Already have an account?
                    <Link to="/login" > Login</Link>
                </h1>
            </div>
        </>
    )
}
export default Signup;