import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import style from './Login.module.css'
import CustomLoader from '../../../components/user/CustomLoader/CustomLoader';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Setpassword() {
      const{register,handleSubmit}=useForm();
        const [isLoading,setIsloading]=useState(false);
        const Navigate = useNavigate();
        const setPassword =async(value)=>{
          setIsloading(true)
          try{
           const response =await axios.patch('https://ecommerce-node4.onrender.com/auth/forgotPassword',value);
       
           if(response.status===200){
       localStorage.getItem('userToken');
          Navigate('/auth/login');
          }
          console.log(response);
          console.log(response.data);
          
          }catch(error){
            console.log(error,"error fetching data");

          }finally{
            setIsloading(false);
          }
        }
        if (isLoading){
          { return <div>
                  
                    <CustomLoader loading={isLoading}/>
                </div>}
        }
  return (
  
    <>


  
    <div className={` ${style.formdiv}`}>

<Form onSubmit={handleSubmit(setPassword)} className={`d-flex flex-column mt-5 pt-5 ${style.form}`} >


 <h2>Set Your Password</h2>
    <FloatingLabel
      controlId="floatingInput"
      label="Email "
      className={`mb-3 ${style.input2}`}
    >
      <Form.Control type="email" placeholder=" " {...register("email",{required:"email is required"})}/>
       
    </FloatingLabel>

    <FloatingLabel
      controlId="floatingInput"
      label="password"
      className={`mb-3 ${style.input3}`}
    >
      <Form.Control type="password" placeholder=" "  {...register("password",{required:"password is required"})} />
   
    </FloatingLabel>

    <FloatingLabel
      controlId="floatingInput"
      label="code"
      className={`mb-3 ${style.input3}`}
    >
      <Form.Control type="text" placeholder=" "  {...register("code",{required:"code is required"})} />
   
    </FloatingLabel>
    
  
   
    <Button className={`${style.loginbtn}`}  type='submit' variant="primary" disabled={isLoading}>{isLoading?"Loading...":"Submit"}</Button>
    </Form>
    </div>
        
        </>
  )
}
