import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import style from './Sidebar.module.css'
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaCompressArrowsAlt } from "react-icons/fa";
export default function CustomSidebar() {
  const [isCollapsed,setIsCollapsed]=useState(false);
  const toggleCollapse=()=>{
    setIsCollapsed(!isCollapsed);
  }
  return (
    <Sidebar collapsed={isCollapsed}  className={`mt-1 position-fixed ${style.sidebar}`}>
      {isCollapsed? <FaExpandArrowsAlt onClick={toggleCollapse}/>:<FaCompressArrowsAlt onClick={toggleCollapse} />}
     
    <Menu >
      <MenuItem component={<Link to="/profile/info" />}> Info</MenuItem>
      <MenuItem component={<Link to="/profile/orders" />}> Orders</MenuItem>
      <MenuItem component={<Link to="/profile/image" />}>Image</MenuItem>
    </Menu>
  </Sidebar>
  )
}
