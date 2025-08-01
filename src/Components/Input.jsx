import React from "react";
import FormikHOC from "./FormikHOC";

function Input({ label,
    id,
    name,
    className,
    ...rest
}) {

    return (
        <>
            <label htmlFor={id} className='sr-only'>{label}</label>
            <input
                id={id}
                name={name}
                className={'w-full focus:outline-none ' + className}
                {...rest}
            />
        </>
    );
}
const FormikInput = FormikHOC(Input);
export {Input};
export default FormikInput;