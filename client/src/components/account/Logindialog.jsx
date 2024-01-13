import { Dialog, Box, Typography, List, ListItem, styled } from '@mui/material'

import React, { useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { qrCodeImage } from '../../constants/data'
import { AccountContext } from '../../Context API/AccountProvider';
import { addUser } from '../../service/api.js';


const Component = styled(Box)`
display:flex;
`;

const dialogstyle = {
  height: '96%',
  marginTop: '12%',
  width: '60%',
  maxwidth: '100%',
  maxheight: '100%',
  boxshadow: 'none',
  overflow: 'hidden'
}
const Container = styled(Box)`
    padding: 45px 0 45px 45px;
`;

const QRCOde = styled('img')({
    margin: '50px 50px 0 50px',
    height: 204,
    width: 204
});

const Title = styled(Typography)`
    font-size: 23px;
    margin-bottom: 25px;
    color: #525252;
    font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
    font-weight: 300;
`;

const StyledList = styled(List)`
    &  > li {
        padding: 0;
        margin-top: 12px;
        font-size: 15px;
        line-height: 25px;
        color: #4a4a4a;
    }
`;


const Logindialog = () => {
  const {setaccount}=useContext(AccountContext);
  const onloginsuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    setaccount(decoded);
    try {
      const response = await addUser(decoded);
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error('Error while calling addUser API ', error);
    }
  };
  const onloginerror=()=>{

  }
 
  return (
    <Dialog open={true} PaperProps={{ sx: dialogstyle }} hideBackdrop={true} >
      <Component>
        <Container>
          <Title>To use WhatsApp on your computer:</Title>
          <StyledList>
            <ListItem>1. Open WhatsApp on your phone.</ListItem>
            <ListItem>2. Tap Menu Settings and select WhatsApp Web.</ListItem>
            <ListItem>3. Point your phone to this screen to capture the code.</ListItem>
          </StyledList>

        </Container>
        <Box style={{position:'relative'}}>
          <QRCOde src={qrCodeImage} alt='' />
          <Box style={{position: 'absolute', top: '50%', transform: 'translateX(14%) translateY(-100%)'}}>
            <GoogleLogin
            onSuccess={onloginsuccess}
            onError={onloginerror}
            />
          </Box>
        </Box>
      </Component>
    </Dialog>
  )
}

export default Logindialog