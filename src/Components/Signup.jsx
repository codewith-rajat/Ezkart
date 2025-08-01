import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import Button from "./Button";
import { Link } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline, MdOutlineMail, MdOutlinePersonOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import FormikInput from "./Input";

function Signup() {

    function callSignupApi(values) {
        console.log(values.fullname, values.username, values.email, values.password, values.confirmPassword);
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
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={callSignupApi}
                validateOnMount
                validationSchema={schema}
            >
                {() => (
                    <div className="bg-blue-800 h-full flex flex-col items-center justify-center">
                        <Form
                            className="flex flex-col"
                        >
                            <IoCartOutline className='text-white text-7xl self-center' />
                            <FormikInput
                                label="Full Name"
                                type="text"
                                required
                                name="fullname"
                                id="fullname"
                                placeholder="ENTER FULL NAME"
                                autoComplete="name"
                                icon={MdOutlineDriveFileRenameOutline}
                            />
                            <FormikInput
                                label="Email"
                                type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="ENTER EMAIL"
                                autoComplete="email"
                                icon={MdOutlineMail}
                            />
                            <FormikInput
                                label="Username"
                                type="text"
                                required
                                name="username"
                                id="username"
                                placeholder="USERNAME"
                                autoComplete="username"
                                icon={MdOutlinePersonOutline}
                            />
                            <FormikInput
                                label="Password"
                                type="password"
                                required
                                name="password"
                                id="password"
                                placeholder="PASSWORD"
                                autoComplete="new-password"
                                icon={RiLockPasswordFill}
                            />
                            <FormikInput
                                label="Confirm Password"
                                type="password"
                                required
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="CONFIRM PASSWORD"
                                autoComplete="new-password"
                                icon={RiLockPasswordFill}
                            />
                            <Button type="submit" className="text-blue-800 mt-4" >Sign Up</Button>
                        </Form>
                        <h1 className='mt-2 text-white'>Already have an account?
                            <Link to="/login" > Login</Link>
                        </h1>
                    </div>
                )}
            </Formik >
        </>
    )
}
export default Signup;