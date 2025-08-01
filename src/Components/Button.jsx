import React, { memo } from 'react';

function Button({children,type,onClick,disabled,className}){
    return (
      <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={"bg-white text-center mt-4 p-2 shadow-md font-medium rounded-md " + className} >{children}</button> 
    );
} 
export default memo(Button);