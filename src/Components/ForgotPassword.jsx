import { useFormik } from "formik";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import * as Yup from 'yup'
import Button from "./Button";
import { Link } from "react-router-dom";

function ForgotPassword() {
    function callForgotPassword(values) {
        console.log(values.email);
    }

    const schema = Yup.object().shape({
        email: Yup.string()
            .required()
            .email("Invalid email format")
    });

    const { handleSubmit,
        values,
        errors,
        handleBlur,
        handleChange,
        touched,
        isValid,
        dirty,
    } = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: schema,
        onSubmit: callForgotPassword,
        validateOnMount:true
    });

    return (
        <>
            <div className="bg-blue-800 h-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col">
                    <IoCartOutline className='text-white text-7xl self-center' />
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
                    {touched.email && errors.email && (<div className="text-red-400 mt-1">{errors.email}</div>)}
                    <Button type="submit" className="text-blue-800" disabled={!isValid || !dirty}>Request password reset</Button>
                </form>
                <Link to="/login" className="mt-2 text-white">Back to Login</Link>
            </div>
        </>
    );
}

export default ForgotPassword;