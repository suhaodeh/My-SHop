import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Slide,toast } from 'react-toastify';

import style from './Register.module.css'

export default function Register() {
  const [isLoading,setIsloading]=useState(false);
  const[serverError,setSereverError]=useState(null);
  const {register,handleSubmit,formState:{errors}} = useForm();
  const Navigate=useNavigate();
  const registerUser= async(value)=>{
    setIsloading(true);
    try{
    const response = await axios.post (`https://ecommerce-node4.onrender.com/auth/signup`,value);
    
    if(response.status === 201){
      toast.info('please, check your email', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        });
      Navigate('/login');
    }
    console.log(response);

  }catch(error){
    if(error.response.status===409){
      setSereverError("email already in use");
    
    }else{
      setSereverError("server Error");
    }
    console.log(error);
  }finally{
    setIsloading(false);
  }

  }
  return (
  <>
 
<div className={` ${style.formdiv}`}>

  <Form onSubmit={handleSubmit(registerUser)} className={`d-flex flex-column mt-5 pt-5 ${style.form}`} >
   {serverError?<div className='text-danger'>{serverError}</div>:null}
   <h2>Register</h2>
  <FloatingLabel
        controlId="floatingInput"
        label="user name"
        className={`mb-3 ${style.input1}`}
        
      >
        <Form.Control type="text" placeholder=" "  {...register("userName",{required:"username is required"})}  />
        {errors.userName?<div className='text-danger'>{errors.userName.message}</div> :null} 
      </FloatingLabel>

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
     
      <Button className={`${style.loginbtn}`}  type='submit' variant="primary" disabled={isLoading}>{isLoading?"Loading...":"Register"}</Button>
      </Form>
     </div>
      </>
      
  )
}
