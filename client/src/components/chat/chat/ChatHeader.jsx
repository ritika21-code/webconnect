import React, { useContext } from 'react'

import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { defaultProfilePicture } from '../../../constants/data';
import { AccountContext } from '../../../Context API/AccountProvider';
import { useStateProvider } from '../../../Context API/StateContext';
import { reducerCases } from '../../../utils/common-utils';

const Header = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;
    
const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 22px;
        color: #000;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px !important;
`;

const ChatHeader = ({person}) => {
    const [dispatch] = useStateProvider();
    const url =  person.picture || defaultProfilePicture;
  const {ActiveUsers}=useContext(AccountContext);
  const handleVoiceCall = () => {
    console.log("call")
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: {
        ...person,
        type: "out-going",
        callType: "voice",
        roomId: Date.now(),
      },
    });
  };
  const handleVideoCall = () => {
    console.log("call")
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...person,
        type: "out-going",
        callType: "video",
        roomId: Date.now(),
      },
    });
  };
    return (
        <Header>
            <Image src={url} alt="display picture" />     
            <Box>
                <Name>{person.name}</Name>
                <Status>{ActiveUsers?.find(user=>user.sub===person.sub)? 'Online' : 'Offline'}</Status>    
            </Box>   
            <RightContainer>
                <Search /> < CallIcon  onClick={handleVoiceCall}/>
                <VideoCallIcon  onClick={handleVideoCall}/>
                <MoreVert />    
               
            </RightContainer> 
        </Header>

  )
}

export default ChatHeader