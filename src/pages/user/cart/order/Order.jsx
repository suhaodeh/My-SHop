import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer,toast, Slide } from 'react-toastify';
import CustomLoader from '../../../../components/user/CustomLoader/CustomLoader';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Order() {
      const {register,handleSubmit} = useForm();
     const [isLoading,setIsloading]=useState(false);
     
     const navigate =useNavigate();
        const placeOrder=async(value)=>{
            const token =localStorage.getItem("userToken");
            if (!token){
              alert("Please,Login to create order");
              return; 
          }

        
            setIsloading(true);
         
            try{
           
                const response= await axios.post('https://ecommerce-node4.onrender.com/order',value,
                    {
                        headers:{
                          Authorization:`Tariq__${token}`
                        }
                      } 
                );
                console.log(response.data);
                if(response.data.message ==="success"){

                  toast.info('Your order have been placed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                  })
                  navigate('/products')
                }
             
            }catch(error){
                console.log("error placing order",error);
            }finally{
                setIsloading(false);
            }
        }
    
    
  return (
    <>
    <div>
        <Form onSubmit={handleSubmit(placeOrder)}>
        <FloatingLabel
        controlId="floatingInput"
        label="couponName"
        className="mb-3"
      >
        <Form.Control type="text" {...register("couponName")}  />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label=" address"
        className="mb-3"
      >
        <Form.Control type="text" {...register("address",{required:"address is required"})} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="phone"
        className="mb-3 "
      >
        <Form.Control type="number" {...register("phone",{required:"phone is required"})} />
      </FloatingLabel>

      <Button className='bg-danger border border-danger ' type='submit' disabled={isLoading}>{isLoading?"Loading...":"Place Order"}</Button>

        </Form>
        </div>
        </>
  )
}
