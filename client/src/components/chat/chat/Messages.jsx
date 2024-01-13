import React, { useContext, useEffect, useRef, useState } from 'react';
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

const Messages = ({ person, convo, text }) => {
    const [value, setvalue] = useState();
    const [file, setfile] = useState();
    const [image, setimage] = useState();
    const [msgs, setmsgs] = useState([]);
    const [IncomingMessage, setIncomingMessage] = useState(null);
    const { account, socket, newMessageFlag, setnewMessageFlag } = useContext(AccountContext);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current.on('getMessage', (data) => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
      if(text!=""){
            const fetchdata = async () => {
                let response = await getmessage(convo._id);
                let filteredData = response.filter(user => user.text.toLowerCase().includes(text.toLowerCase()));
                setmsgs(filteredData)
                console.log(filteredData)
            }
    
            fetchdata();
        } else {  const getmessagesdetails = async () => {
            try {
                let response = await getmessage(convo?._id);
                setmsgs(response);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        getmessagesdetails();}

      
    }, [convo?._id, newMessageFlag,text]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [msgs]);

    useEffect(() => {
        IncomingMessage &&
            convo?.members?.includes(IncomingMessage.senderId) &&
            setmsgs((prev) => [...prev, IncomingMessage]);
    }, [IncomingMessage, convo]);

    // useEffect(() => {

      

    // }, [text])
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
                    text: value,
                };
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: convo._id,
                    type: 'file',
                    text: image,
                };
            }

            socket.current.emit('sendMessage', message);
            console.log('Sent message:', message);
            await newmessage(message);

            setvalue('');
            setfile();
            setimage('');
            setnewMessageFlag((prev) => !prev);
        }
    };

    return (
        <Wrapper>
            <Component ref={scrollRef}>
                {msgs &&
                    msgs.map((msg, index) => (
                        <Container key={index}>
                            <Message message={msg} />
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
    );
};

export default Messages;
