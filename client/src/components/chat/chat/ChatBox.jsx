import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'

import { AccountContext } from '../../../Context API/AccountProvider';
import { getconversations } from '../../../service/api';
import IncomingVideoCall from '../../call/IncomingVideoCall';
import IncomingVoiceCall from '../../call/IncomingVoiceCall';
import VideoCall from '../../call/VideoCall';
import VoiceCall from '../../call/VoiceCall';
import { useStateProvider } from '../../../Context API/StateContext';
const ChatBox = () => {
  const{person,account}=useContext(AccountContext);
  const[convo,setconvo]=useState({});
  useEffect(() => {
    const getConversationDetails = async () => {
       try {
          let data = await getconversations({ senderId: account.sub, receiverId: person.sub });
         setconvo(data);
       } catch (error) {
          console.error('Error fetching conversation details:', error);
       }
    };
 
    getConversationDetails();
 }, [person.sub,account.sub]);
 
 const [
  {
   
    videoCall,
    voiceCall,
    incomingVoiceCall,
    incomingVideoCall,
  },
  dispatch,
] = useStateProvider();
  return (
    <div>
       {/* {incomingVideoCall && <IncomingVideoCall/>}
      {incomingVoiceCall && <IncomingVoiceCall />} */}
      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}
      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}
     
      <ChatHeader person={person}/>
<Messages person={person} convo={convo}/>
    </div>
  )
}

export default ChatBox