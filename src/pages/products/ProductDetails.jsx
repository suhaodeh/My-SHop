import React, { useEffect, useState } from 'react'
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams,Link } from 'react-router-dom'
import axios from 'axios';

import style from './Products.module.css'
export default function ProductDetails() {
    const {productId}=useParams();
    const navigate=useNavigate();
      const [product,setProduct]=useState({});
      const [isloading,setisLoading]=useState(true);
      const getproduct=async()=>{
        try{
            const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
            setProduct(data.product)
        }catch(error){
            console.log(error);
        }finally{
            setisLoading(false)
        }

      }

      const addProductToCart =async ()=>{
  
        
      
      
       try{
        const token =localStorage.getItem("userToken");
        const response = await axios.post('https://ecommerce-node4.onrender.com/cart',
       {
        productId:productId
       },
       {
        headers:{
          Authorization: `Tariq__${token}`,
        }
       } 
    
       );
      
       
       if(response.status==201){
        toast.info('product added succesfully', {
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
          navigate('/cart');
       }
    
       }catch(error){
    console.log("error",error);
       }
    
      }
      useEffect( ()=>{
        getproduct();
      },[]);


  return (
    <section className='bg-white'>
     <div >
  

      <div className={`d-flex align-items-center mt-5 ${style.details1}`}>
    
      
      <div>
      <div>
      <h5 className='mt-5 pb-3'>Product Name:{product.name}</h5>
      </div>
      <h3 > Price:<span className='text-decoration-line-through'>{product.price}</span></h3> 
      <h3> Discount:{product.discount}</h3> 
      <h3> FinalPrice:{product.finalPrice}</h3>
      <button onClick={addProductToCart} className='btn btn-primary'>Add to cart</button>
      </div> 
      </div>

      </div>
  

    </section>
  )
}
