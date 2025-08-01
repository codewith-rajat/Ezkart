import React from "react";
import { useField } from "formik";

function FormikHOC(IncomingComponent) {
    return function ({id,label,name,icon,...rest}) {
        const field = useField(name);
        const [data, meta] = field;
        const { value, onBlur, onChange } = data;
        const { error, touched } = meta;
        console.log(name, field)
        let borderClass = "border-white"
        if (error && touched) {
            borderClass = "border-red-400"
        }
        return (
            <>
                <div className={'mt-5 w-72 flex items-center border-2 rounded-sm p-2 ' + borderClass}>
                    <label htmlFor={id} className='sr-only'>{label}</label>
                    {icon && <span className="text-white text-lg mr-2">{icon}</span>}
                    <IncomingComponent
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        touched={touched}
                        error={error}
                        name={name}
                        className='w-full focus:outline-none text-white'
                        {...rest}
                    />
                </div>
                {touched && error && (<div className='text-red-400 mt-1 text-sm' >{error}</div>)}
            </>
        );
    }
}
export default FormikHOC; 