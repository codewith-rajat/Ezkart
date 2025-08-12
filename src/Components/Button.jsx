import { memo } from 'react';

function Button({children,type,onClick,disabled,className}){
    return (
      <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={"text-center my-2 p-2 shadow-md font-medium rounded-md " + className} >{children}</button> 
    );
} 
export default memo(Button);