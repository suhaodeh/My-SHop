import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer,toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams,Link } from 'react-router-dom'
import axios from 'axios';
import { FaStar, FaRegStar } from "react-icons/fa";
import CustomLoader from '../../components/user/CustomLoader/CustomLoader';
import style from './Products.module.css'
import { CartContext } from '../user/context/CartContext';
export default function ProductDetails() {
    const {productId}=useParams();
    const navigate=useNavigate();
    const{cartCount,setCartCount}=useContext(CartContext);
      const [product,setProduct]=useState({});
      const [isloading,setisLoading]=useState(true);
      const getproduct=async()=>{
        setisLoading(true);
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
        console.log(token);
        const cartResponse = await axios.get('https://ecommerce-node4.onrender.com/cart', {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        });
    
       
        const isProductInCart = cartResponse.data.products.some(item => item.productId === productId);
    
        if (isProductInCart) {
          toast.info('This product is already in your cart', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
          return; 
        }
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
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
          });
          setCartCount(cartCount+1)
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
    <section className={`  ${style.detailssec}`}>
     <div className='container pt-5 ' >
  
<div className='row'>
     
     <div className='col-md-4 col-sm-10 '>
      <img src={product.mainImage?.secure_url} className={`${style.mainimg}`}/>
      </div>

      <div className='col-md-2'>
{product.subImages && product.subImages.length > 0 ? (
  product.subImages.map((subImage, index) => (
    <img 
      key={index} 
      src={subImage.secure_url} 
     width={100}
      className={`${style.subimgs}`} 
    />
  ))
) : (
  <p>No sub images available</p>
)}
      </div>

      <div className='col-md-6 col-sm-10'>
      <h5 className='mt-5 pb-3'>Product Name:{product.name}</h5>
      
      <h5> Price:<span className='text-decoration-line-through'>{product.price}</span></h5> 
      <h5> Discount:{product.discount}</h5> 
      <h5> FinalPrice:{product.finalPrice}</h5>
      <button onClick={addProductToCart} className={`${style.addcart}`}>Add to cart</button>
      </div>
     
      </div>
      </div>
      <div className='ms-5 p-5'>
      <div className='row '>
        <div className='col-md-12 text-center '>
          <p className={`${style.productDescription}`}><h5>Description:</h5>{product.description}</p> </div>
      </div>
      </div>
      <div className={`  ${style.reviews} p-5 m-5`}>
        <div className='row '>
        <h3 className='text-center'>Product Reviews</h3>
        {product.reviews&&product.reviews.length>0 ?(
          product.reviews.map((review,index)=>
            
       <div className='col-md-4 col-sm-12 ' key={index}>
        <div  className={`m-2 p-3 ${style.userReview}`}>
        <h6>User Name:{review.createdBy.userName}</h6>
        <span> Rating:  
            {Array.from({ length: 5 }, (_, i) =>
              i < review.rating ? <FaStar key={i} color="gold" /> : <FaRegStar key={i} color="gray" />
            )}
          </span>
            
             <p> Comment:{review.comment}  </p>
             
       </div>
       </div>)
        ) :<div>''</div> }
        </div>
      </div>
      
  

    </section>
  )
}
