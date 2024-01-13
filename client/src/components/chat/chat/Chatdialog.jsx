import React, { useContext } from 'react'
import { Dialog, styled, Box } from '@mui/material';
import { AccountContext } from '../../../Context API/AccountProvider';
import Menu from '../menu/Menu';
import EmptyChat from './EmptyChat';
import ChatBox from './ChatBox';
const Component = styled(Box)`
    display: flex;
    // height:245%;
    margin:'20px';
`;
    
const LeftComponent = styled(Box)`
    min-width: 350px;
`;
    
const RightComponent = styled(Box)`
    width: 73%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid rgba(0, 0, 0, 0.14);
`;
const dialogStyle = {
  height: '95%',
  width: '100%',
  // margin: '20px',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: 0,
  boxShadow: 'none',
  overflow: 'hidden'
};

const Chatdialog = () => {
  const{person}=useContext(AccountContext);
  return (
    <div>   <Dialog open={true} 
    backdropprops={{style: {backgroundColor: 'unset'}}}
    PaperProps={{ sx: dialogStyle }}
    hideBackdrop={true}
    maxWidth={'md'}
>

<Component>

  <LeftComponent>
<Menu/>
  </LeftComponent>
  <RightComponent>
   { Object.keys(person).length ? 
<ChatBox/> : <EmptyChat/>}
  </RightComponent>
</Component>

  </Dialog>
</div>
  )
}

export default Chatdialog