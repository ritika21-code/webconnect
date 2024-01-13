import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'

import { AccountContext } from '../../../Context API/AccountProvider';
import { getconversations } from '../../../service/api';
const ChatBox = () => {
  const{person,account}=useContext(AccountContext);
  const[convo,setconvo]=useState({});
  const[text,settext]=useState("");
  useEffect(() => {
    const getConversationDetails = async () => {
       try {
          let data = await getconversations({ senderId: account.sub, receiverId: person.sub });
         setconvo(data);
         console.log(data);
       } catch (error) {
          console.error('Error fetching conversation details:', error);
       }
    };
 
    getConversationDetails();
 }, [person.sub,account.sub]);
 
  return (
    <div>
  
    
      <ChatHeader person={person} settext={settext}/>
<Messages person={person} convo={convo} text={text}/>
    </div>
  )
}

export default ChatBox