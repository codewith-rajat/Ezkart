import { useEffect, useState } from 'react';
import Loading from '../Loading';
import axios from 'axios';
import { UserContext } from '../Contexts';
import API_BASE_URL from '../../config.js'

function UserProvider({children}){
    const [user, setUser] = useState();
    const [loadingUser, setLoadingUser] = useState(true);

    const token = localStorage.getItem("token");

      useEffect(() => {
        if (token) {
          axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            setUser(response.data);
            setLoadingUser(false);
          }).catch(()=>{
            localStorage.removeItem("token");
            setLoadingUser(false);
          })
        } else {
          setLoadingUser(false);
        }
      }, []);

      if (loadingUser) {
    return <Loading />
  }
  return <>
    <UserContext.Provider value={{ isLoggedIn:!!token,user, setUser }}>{children}</UserContext.Provider>
  </>
}

export default UserProvider