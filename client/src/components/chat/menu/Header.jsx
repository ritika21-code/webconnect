import React, { useContext, useState } from 'react'
import { AccountContext } from '../../../Context API/AccountProvider'
import { Box, styled } from '@mui/material';
import { Chat as MessageIcon } from '@mui/icons-material';
import HeaderMenu from './HeaderMenu';
import Infodrawer from '../drawer/Infodrawer';
const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;

const Wrapper = styled(Box)`
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :-:first-of-type {
        font-size: 22px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;

const Image = styled('img')({
    height: 40,
    width: 40,
    borderRadius: '50%'
})

const Header = () => {
    const { account } = useContext(AccountContext);
    const [draw,setdraw]=useState(false);
    return (
        <>
        <Component>
        <Image src={account.picture} alt='dp' onClick={()=>setdraw(true)}>
        </Image>
        <Wrapper>
            <MessageIcon/>
           <HeaderMenu setdraw={setdraw}/>
        </Wrapper>
        </Component>
        <Infodrawer open={draw} setopen={setdraw}/>
        </>
    )
}

export default Header