import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Slide,toast } from 'react-toastify';

import style from './Login.module.css'

export default function Login() {
  const [isLoading,setIsloading]=useState(false);
  const[serverError,setSereverError]=useState(null);
  const {register,handleSubmit,formState:{errors}} = useForm();
  const Navigate=useNavigate();
  const registerUser= async(value)=>{
    setIsloading(true);
    try{
    const response = await axios.post (`https://ecommerce-node4.onrender.com/auth/signin`,value);
    if(response.status===200){
      localStorage.setItem("userToken",response.data.token);
    Navigate('/');
    }
  
    console.log(response);

  }catch(error){
    console.log(error)
setSereverError(error.response.data.message)
   
  }finally{
    setIsloading(false);
  }

  }
  


  return (
  <>

    <img className={`${style.logo}`} src={`/src/assets/images/logo2.png`} />
    <h4 className={`${style.text}`}>Trolley-Shop</h4>
   
   
    <img className={`${style.registerBG}`} src={`/src/assets/images/registerBg.jpg`}/>
    
    
    <div>
      <p className={`p-1  ${style.p}`}>Welcome to trolley shop,thanks for joining us </p>
    </div>

  <div className={` ${style.formdiv}`}>

  <Form onSubmit={handleSubmit(registerUser)} className={`d-flex flex-column mt-5 pt-5 ${style.form}`} >
   {serverError?<div className='text-danger'>{serverError}</div>:null}

   <h2>Login</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email "
        className={`mb-3 ${style.input2}`}
      >
        <Form.Control type="email" placeholder=" " {...register("email",{required:"email is required"})}/>
        {errors.email?<div className='text-danger'>{errors.email.message}</div> :null} 
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="password"
        className={`mb-3 ${style.input3}`}
      >
        <Form.Control type="password" placeholder=" "  {...register("password",{required:"password is required"})} />
        {errors.password?<div className='text-danger'>{errors.password.message}</div> :null} 
      </FloatingLabel>
      
      
     
      <Button className={`${style.loginbtn}`}  type='submit' variant="primary" disabled={isLoading}>{isLoading?"Loading...":"Login"}</Button>
      <Link to={'/auth/forgotpassword'} className={` mb-4 ${style.forgetLink}`}>Forgot Password?</Link>
      </Form>
      </div>
      </>
      
  )
}
