import React, { useState } from 'react'
import Header from './Header'
import Search from './Search'
import Conversations from './Conversations'

const Menu = () => {
  const[text,settext]=useState('');
  return (
    <div><Header/>
    <Search settext={settext}/>
    <Conversations text={text}/></div>
  )
}

export default Menu