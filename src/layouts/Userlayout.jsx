import React from 'react'
import CustomNavbar from '../components/user/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Nav from '../components/user/navbar/Nav'
import Footer from '../components/user/footer/Footer'
export default function Userlayout() {
  return (
   <>
   
   
   <CustomNavbar/>
   <Outlet/>
   
   </>
  )
}
