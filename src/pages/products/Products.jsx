import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './products.module.css'
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'bootstrap';
export default function Products() {
  const {productId}=useParams();
  const navigate =useNavigate();
  const [products,setProducts]=useState([{}]);
  const [isloading,setisLoading]=useState(true)
  const getProducts= async()=>{
    try{
    const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products?page=1&limit=10`)
console.log(data);
setProducts(data.products);
      
}catch(error){
  console.log(error);

}finally{
  setisLoading(false)
}
  }

  const addProductToCart =async (id)=>{
    console.log(id)
   
   
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
  useEffect( ()=>
  {getProducts();},[])

  if(isloading){
    return <h2>Loading....</h2>
  }
  
  return (
   <>
   <section className='container p-5 m-5 '>
    <div className='row grid gap-0 row-gap-5'>
      {products.map((product,index)=>
        <div className='col-md-4' key={product._id} >
          <div className={`${style.products}`} style={{ animationDelay: `${index * 0.3}s` }}>
            <img src={product.mainImage.secure_url} />
            <h2 className='mt-3'>{product.name}</h2>
           
           <h5 className={`${style.price}`}>Price:{product.price}</h5>
           <div>
            <Link className='btn mt-2 bg-secondary' to={`/product/${product._id}`}>Details</Link>
            </div>
            <button onClick={()=>addProductToCart(product._id)} className='btn btn-primary'>Add to cart</button>
          </div>
        </div>
      )}
    </div>
   </section>
   </>
  )
  }
