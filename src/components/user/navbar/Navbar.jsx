import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css'
import { CartContext } from '../../../pages/user/context/CartContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../../../pages/user/context/UserContext';


export default function CustomNavbar() {
  const navigate= useNavigate();
 const {cartCount}=useContext(CartContext);
 const {user,loading,setUser}= useContext(UserContext);
 const logout=()=>{
  localStorage.removeItem('userToken');
  setUser(null);
  navigate('/auth/login');

 }

  return (
    <Navbar expand="lg"  className={` ${style.navbar} `}>
    
      <Navbar.Brand href="#home" style={{ color: "white" }}>
        <img src={`/src/assets/images/logo2.png`} width={50} className='pe-2' />
        Trolley-SHOP</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={` ms-auto `}>
        <Nav.Link  as={Link} to={'/'} className={`${style.navlink}`}>Home </Nav.Link>
          <Nav.Link as={Link} to={'/categories'} className={`${style.navlink}`}>category</Nav.Link>
          <Nav.Link  as={Link} to={'/products'} className={`${style.navlink}`}>products </Nav.Link>
          <Nav.Link  as={Link} to={'/cart'} className={`${style.navlink}`}>My Cart{cartCount} </Nav.Link>
          <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic" style={{ backgroundColor: "black" ,border:'2px solid red' }}>
     Welcome {loading?"...":user.userName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={'/Profile'}>Profile</Dropdown.Item>
        <Dropdown.Item  onClick={logout}>Logout </Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
         
        
        </Nav>
      </Navbar.Collapse>
    
  
  </Navbar>

  )
}
