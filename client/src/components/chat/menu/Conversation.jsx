import React, { useContext, useEffect, useState } from 'react';
import { styled, Box, Typography } from "@mui/material";
import { emptyProfilePicture } from '../../../constants/data';
import { AccountContext } from '../../../Context API/AccountProvider';
import { getconversations, getmessage, setconversations } from '../../../service/api';
import { formatDate } from '../../../utils/common-utils';

const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
`;

const Container = styled(Box)`
    display: flex;
`;
const Image = styled('img') ({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px'
});

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #00000099;
    margin-right: 20px;
`;

const Text = styled(Typography)`
    display: block;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
`;
const Conversation = ({ user }) => {
    const { setperson, account, newMessageFlag } = useContext(AccountContext);
    const [message, setmessage] = useState({});
    const [mess, setmess] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            try {
                const data = await getconversations({ senderId: account.sub, receiverId: user.sub });
                console.log('API Response:', data);
                if (data) {
                    setmessage(data);
                } else {
                    console.log('Empty data received from the API');
                    // Handle the case when data is empty
                }
            } catch (error) {
                console.error('Error fetching conversation details:', error);
            }
        };

        const getLatestMessage = async () => {
            try {
                const response = await getmessage(message?._id);
                const latestMessage = response[response.length - 1]; // Get the latest message
             setmess({ text: latestMessage?.text, timestamp: latestMessage?.updatedAt });
    console.log(latestMessage);
            } catch (error) {
                console.error('Error fetching latest message:', error);
            }
        };

        getConversationDetails();
        getLatestMessage();
    }, [newMessageFlag]);

    const getUser = async () => {
        setperson(user);
        await setconversations({ senderId: account.sub, receiverId: user.sub });
    };
        
    const url = user.picture || emptyProfilePicture;

    return (
        <Component onClick={getUser}>
            <Box>
                <Image src={url} alt="display picture" />
            </Box>
            <Box style={{ width: '100%' }}>
                <Container>
                <Typography>{user.name}</Typography>
                    { 
                        mess?.text && 
                        <Timestamp>{formatDate(mess?.timestamp)}</Timestamp>        
                    }
                </Container>
                <Box>
                    <Text>{mess?.text?.includes('localhost') ? 'media' : mess.text}</Text>
                </Box>
            </Box>
        </Component>
    );
};

export default Conversation;
