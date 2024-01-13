import React, { useContext, useEffect, useState } from 'react'
import { Box, styled } from '@mui/material';
import Footer from './Footer';
import { AccountContext } from '../../../Context API/AccountProvider';
import { getmessage, newmessage } from '../../../service/api';
import Message from './Message';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;



const Component = styled(Box)`
    height: 76vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 30px;
`;
const Messages = ({ person, convo }) => {
    const [value, setvalue] = useState()
    const [file, setfile] = useState()
    const [image, setimage] = useState()
    const[msgs,setmsgs]=useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);
     const { account,socket, newMessageFlag, setNewMessageFlag} = useContext(AccountContext);


useEffect(() => {
    const waitForSocketConnection = async () => {
        while (!socket.current.connected) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // Ensure that socket.current is defined and connected.
        socket.current.on('getMessage', (data) => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now(),
            });
        });
    };

    // Listen for the 'connect' event
    socket.current.on('connect', () => {
        waitForSocketConnection();
    });

    // Clean up event listeners when the component unmounts

}, [socket]);


useEffect(() => {
        const getmessagesdetails = async () => {
            let response = await getmessage(convo?._id);
            setmsgs(response);
        }
     getmessagesdetails()
    }, [person._id,convo?._id,newMessageFlag])


    useEffect(() => {
        incomingMessage && convo?.members?.includes(incomingMessage.senderId) && 
            setmsgs((prev) => [...prev, incomingMessage]);
        
    }, [incomingMessage, convo]);
  
    


    const sendtext = async (e) => {
        const a = e.keycode || e.which;
        if (a === 13) {
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                receiverId: person.sub,
                conversationId: convo._id,
                type: 'text',
                text: value
                };
            } else {
                message = { senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: convo._id,
                    type: 'file',
                    text: image
                };
            }

     socket.current.emit('sendMessage',message);
            await newmessage(message);

            setvalue('');
            setfile();
            setimage('');
            setNewMessageFlag(prev => !prev);

        }

    }
    
    return (
        <Wrapper>
            <Component>
               

             
{msgs&&msgs.map(msg=>(
 <Container >
    <Message message={msg}/>

   </Container>
))}  
            </Component>
            <Footer
                sendtext={sendtext}
                setvalue={setvalue}
                msg={value}
                file={file}
                setfile={setfile}
                setimage={setimage}
            />
        </Wrapper>
    )
}

export default Messages
