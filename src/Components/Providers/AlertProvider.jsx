import { useState } from 'react';
import { AlertContext } from '../Contexts';

function AlertProvider({children}){
    const [alert, setAlert] = useState();
    
  function removeAlert() {
    setAlert(undefined);
  }
  return <>
    <AlertContext.Provider value={{alert,setAlert,removeAlert}}>{children}</AlertContext.Provider>
  </>
}

export default AlertProvider