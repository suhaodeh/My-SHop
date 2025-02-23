import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";
import style from './Footer.module.css'
export default function Footer() {
  return (
   
    <>
    <div className={` p-5    ${style.footer}`}>
    <div className='row'>
        <div className='col-md-6 col-sm-8 '>
          <div className='d-flex align-items-center '>
          <img src={`/src/assets/images/logo2.png`} width={50} className='pb-1' />
          <h3 className='p-2'> Trolley SHOP</h3>
          </div>

  <p className={`w-50 pt-3 ${style.footerp}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perferendis ratione quia incidunt, corporis illum nihil sit. Dignissimos optio ex nobis ipsum animi laborum aperiam, labore vel ab. Excepturi, similique?</p>

        </div>

        <div className='col-md-3 col-sm-8'>
            <div className={` d-flex flex-column  ${style.f1}`}>
          
          <Link>Categories</Link>
           <Link>Products</Link>
            <Link>About us</Link>
        <Link>Privacy & Policy </Link>
        </div>
        </div>
       

        <div className='col-md-3 col-sm-8'>
        <h4 className='pb-3'>Contact Us:</h4>
        <div className={`${style.f2}`}>
       
        
        <Link to="/facebook" >
          <FaFacebook size={30} />
        </Link>

       
        <Link to="/instagram" >
          <FaInstagram size={30} />
        </Link>

      
        <Link to="/twitter" >
          <FaTwitter size={30} />
        </Link>
      </div>

      <div className={`mt-3 ${style.f3}`}>
      <Link to="/email" >
      <FaEnvelope  size={30}/> mtshop@gmail.com
        </Link>
      </div>
      <div  className={`mt-3 ${style.f3}`}>
      <Link to="/Phone" >
      <FaPhone  size={30}/> +966580420981
        </Link> 
      </div>
        </div>
      
        </div>
        </div>
       
        </>
  )
}
