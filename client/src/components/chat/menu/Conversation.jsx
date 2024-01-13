import React, { useContext } from 'react'

import { styled, Box, Typography } from "@mui/material";
import { emptyProfilePicture } from '../../../constants/data';
import { AccountContext } from '../../../Context API/AccountProvider';
import { setconversations } from '../../../service/api';
const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
`;
    
const Image = styled('img') ({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px'
});
const Conversation = ({user}) => {
  const{setperson,account}=useContext(AccountContext);
  const getUser = async () => {
    setperson(user);
    await setconversations({ senderId: account.sub, receiverId: user.sub });
}

const url = user.picture || emptyProfilePicture;
  return (
    <Component onClick={getUser}>
    <Box>
        <Image src={url} alt="display picture" />
    </Box>
    <Box style={{width: '100%'}}>
        
            <Typography>{user.name}</Typography>
         
    </Box>
</Component>
   
  )
}

export default Conversation