import { useEffect, useState } from 'react';

import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import { uploadfile } from '../../../service/api';


const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)'
`;


const Footer = ({sendtext,setvalue,msg,file,setfile,setimage}) => {
    useEffect(() => {
        const uploadImage = async () => {
            try {
                if (file) {
                    const data = new FormData();
                    data.append("name", file.name);
                    data.append("file", file);

                    const response = await uploadfile(data);
setimage(response.data.imageUrl)
console.log(response)
                    // Handle the response from the server as needed
                    console.log('Upload response:', response.data);
                }
            } catch (error) {
                // Handle errors during the upload process
                console.error('Error uploading image:', error);
            }
        };
 
        uploadImage();
    }, [file]);
  
    const onfilechange=(e)=>{
        console.log(e)
setfile(e.target.files[0]);
setvalue(e.target.files[0].name);
    }
 return (
     <Container>
            <EmojiEmotions />
            <label htmlFor='fileinput'>
                  <ClipIcon />
            </label>
              
      <input type='file' style={{display:'none'}} id='fileinput' onChange={(e)=>onfilechange(e)} />

            <Search>
                <InputField
                    placeholder="Type a message"
                  onChange={(e)=>setvalue(e.target.value)}
onKeyDown={(e)=>{sendtext(e)}}
value={msg}

/>
            </Search>
            <Mic />
        </Container>
    )
}

export default Footer;