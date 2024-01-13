import { Box, Drawer, Typography, styled } from '@mui/material'
import { ArrowBack } from '@mui/icons-material';

import React from 'react'
import Profile from './Profile';
const drawerstyle={
    left:20,
top:14,
width:'30%',
height:'95%',
boxShadow:'none',

}
const Header = styled(Box)`
  background: #008069;
  height: 110px;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
`;

const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`;

const Text = styled(Typography)`
    font-size: 18px;
`
const Infodrawer = ({open,setopen}) => {
  return (
    <Drawer
   
    open={open}
    PaperProps={{sx:drawerstyle}}
    onClose={()=>setopen(false)}
        style={{ zIndex: 1500 }}
  >
    <Header>
       <ArrowBack onClick={()=>setopen(false)}/>
<Text>Profile</Text>
    </Header>
    <Component>
    <Profile/>
    </Component>
    </Drawer>
  )
}

export default Infodrawer