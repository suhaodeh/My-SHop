import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast, Slide } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import style from './Login.module.css'


import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Forgotpassword() {
    const{register,handleSubmit}=useForm();
      const [isLoading,setIsloading]=useState(false);
      const Navigate = useNavigate();
    const sendCode=async(value)=>{
        setIsloading(true);
try{
    const response= await axios.patch('https://ecommerce-node4.onrender.com/auth/sendcode',value);
    console.log(response);
    if(response.status==200){
      toast.info('please check your email', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
        Navigate('/auth/setpassword');
    }
}catch(error){
    console.log(error);
}finally{
    setIsloading(false);
}


    }
  return (
    <>
   

    <div className='p-5 mt-5'>
  
  <Form onSubmit={handleSubmit(sendCode)} >
<p className={`${style.forgetP}`}>please, enter your email to send you code</p>
<FloatingLabel
        controlId="floatingInput"
        label="Email address" 
        className={` pb-3 ${style.email}`}
      >
        <Form.Control type="email" {...register("email",{required:"email is required"})} /> 
      </FloatingLabel>
      <Button type='submit' className={`${style.fbtn}`}> {isLoading?"Loading...":"Submit"}

      </Button>
  </Form>
  </div>
  </>
  ) 
}
