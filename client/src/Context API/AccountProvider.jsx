import React, { useEffect, useRef, useState } from 'react'
import { createContext } from 'react'
import { io } from 'socket.io-client';

export const AccountContext=createContext(null);
const AccountProvider = ({children}) => {
    const [account,setaccount]=useState();
    const [person,setperson]=useState({});
    const [ActiveUsers, setActiveUsers] = useState([]);
    const socket = useRef();
    const [newMessageFlag, setNewMessageFlag] = useState(false);

    useEffect(() => {
        socket.current = io('ws://localhost:9000');
    }, [])

  return (
   <AccountContext.Provider value={{
account,setaccount,person,setperson,socket,ActiveUsers,setActiveUsers,newMessageFlag,setNewMessageFlag
   }}>
{children}
   </AccountContext.Provider>
  )
}

export default AccountProvider