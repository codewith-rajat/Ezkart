import React from "react";
import { MdOutlinePersonOutline } from "react-icons/md";

function Input({ label,
    id,
    value,
    touched,
    error,
    icon: Icon,
    ...rest
}) 
{
    let borderClass="border-whitex"
    if(error && touched){
        borderClass="border-red-400"
    }
    return (
        <>
            <div className={'mt-5 w-72 flex items-center border-2 rounded-sm p-2 ' + borderClass}>
                <label htmlFor={id} className='sr-only'>{label}</label>
                {Icon && <Icon className="text-white text-lg mr-2" />}
                <input
                    id={id}
                    className='w-full focus:outline-none text-white'
                    {...rest}
                />
            </div>
            {touched && error && (<div className='text-red-400 mt-1 text-sm' >{error}</div>)}
        </>
    );
}
export default Input;