import React, { useEffect, useRef, useState } from 'react'
import { createContext } from 'react'
import { io } from 'socket.io-client';

export const AccountContext=createContext(null);
const AccountProvider = ({children}) => {
    const [account,setaccount]=useState();
    const [person,setperson]=useState({});
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);

    const [ActiveUsers, setActiveUsers] = useState([]);
    const socket = useRef();
    const [newMessageFlag, setnewMessageFlag] = useState(true);

    useEffect(() => {
        socket.current = io('ws://localhost:9000');
    }, [])

  return (
   <AccountContext.Provider value={{
account,setaccount,person,setperson,socket,ActiveUsers,setActiveUsers,newMessageFlag,setnewMessageFlag,  showloginButton,
setShowloginButton,
showlogoutButton,
setShowlogoutButton,
   }}>
{children}
   </AccountContext.Provider>
  )
}

export default AccountProvider