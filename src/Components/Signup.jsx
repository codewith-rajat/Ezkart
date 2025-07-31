import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Button from "./Button";
import { Link } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline, MdOutlineMail, MdOutlinePersonOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Input from "./Input";

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
            validateOnMount:true
        });
    return (
        <>
            <div className="bg-blue-800 h-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col"
                >
                    <IoCartOutline className='text-white text-7xl self-center' />
                    <Input
                        label="Full Name"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        name="fullname"
                        value={values.fullname}
                        id="fullname"
                        placeholder="ENTER FULL NAME"
                        touched={touched.fullname}
                        error={errors.fullname}
                        autoComplete="fullname"
                        icon={MdOutlineDriveFileRenameOutline}
                    />
                    <Input
                        label="Email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        name="email"
                        value={values.email}
                        id="email"
                        placeholder="ENTER EMAIL"
                        touched={touched.email}
                        error={errors.email}
                        autoComplete="email"
                        icon={MdOutlineMail}
                    />
                    <Input 
                        label="Username"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        name="username"
                        value={values.username}
                        id="username"
                        placeholder="USERNAME"
                        touched={touched.username}
                        error={errors.username}
                        autoComplete="username"
                        icon={MdOutlinePersonOutline}
                    />
                    <Input 
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        name="password"
                        value={values.password}
                        id="password"
                        placeholder="PASSWORD"
                        touched={touched.password}
                        error={errors.password}
                        autoComplete="current-password"
                        icon={RiLockPasswordFill}
                    />
                    <Input 
                        label="Confirm Password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        name="confirmPassword"
                        value={values.confirmPassword}
                        id="confirmPassword"
                        placeholder="CONFIRM PASSWORD"
                        touched={touched.confirmPassword}
                        error={errors.confirmPassword}
                        autoComplete="current-password"
                        icon={RiLockPasswordFill}
                    />
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