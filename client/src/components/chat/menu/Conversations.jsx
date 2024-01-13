import React, { useContext, useEffect, useState } from 'react'
import { getusers } from '../../../service/api.js';
import { Box, Divider, styled } from '@mui/material';
import Conversation from './Conversation.jsx';
import { AccountContext } from '../../../Context API/AccountProvider.jsx';
const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = ({text}) => {
    const {account,socket,setActiveUsers}=useContext(AccountContext);

    const[users,setusers]=useState([]);
    useEffect(() => {
     const fetchdata= async()=>{
let response =await getusers();
let filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
setusers(filteredData);

     }
     fetchdata();
    }, [text])
    useEffect(() => {
        socket.current.emit("addUser", account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
            
        })
    }, [account,setActiveUsers,socket])
  return (
    <Component>
    {users.map((user) => (
        user.sub !== account.sub &&
        <React.Fragment key={user._id}>
            <Conversation user={user} />
            <StyledDivider />
        </React.Fragment>
    ))}
</Component>
  )
}

export default Conversations