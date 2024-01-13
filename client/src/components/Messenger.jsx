import React, { useContext } from 'react'
import Logindialog from './account/Logindialog'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Box, styled } from '@mui/material'
import Chatdialog from './chat/chat/Chatdialog'
import { AccountContext } from '../Context API/AccountProvider'
const LoginHeader = styled(AppBar)`
height:220px;
background-color:#00bfa5;
box-shadow:none;
`;
const Header = styled(AppBar)`
    background-color: #00A884;
    height: 125px;
    box-shadow: none;
`;
const Component = styled(Box)`
height:100vh;
background:#DCDCDC`;
const Messenger = () => {
  const { account } = useContext(AccountContext);
  
  return (

    <Component>
      {account ?
        <>
          <Header>
            <Toolbar></Toolbar>
          </Header>
          <Chatdialog />
          </> 
          :
           <>
           <LoginHeader>
            <Toolbar></Toolbar>
          </LoginHeader>
          <Logindialog />
           </>
           }
    </Component>
  )
}

export default Messenger