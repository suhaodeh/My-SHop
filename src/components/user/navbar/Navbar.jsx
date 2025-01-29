import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css'


export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
    <Container>
      <Navbar.Brand href="#home">MY-SHOP</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={` ms-auto `}>
          <Nav.Link as={Link} to={'/categories'} className={`${style.navlink}`}>category</Nav.Link>
          <Nav.Link  as={Link} to={'/products'} className={`${style.navlink}`}>products </Nav.Link>
          <Nav.Link  as={Link} to={'/cart'} className={`${style.navlink}`}>My Cart </Nav.Link>
         
         
        
        </Nav>
      </Navbar.Collapse>
    </Container>
  
  </Navbar>

  )
}
