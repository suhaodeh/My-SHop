import React, { useEffect, useState ,useContext} from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import style from './Cart.module.css'
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import CustomLoader from '../../../components/user/CustomLoader/CustomLoader';
export default function Cart() {
   const{cartCount,setCartCount}=useContext(CartContext);
  const [cart,setCart]= useState(null);

  const[isloading,setisIoading]=useState(true);
const navigate= useNavigate();

  const getCart =async()=>{
    setisIoading(true);
    try{
      const token= localStorage.getItem('userToken');
      const response =await axios.get("https://ecommerce-node4.onrender.com/cart",
        {
          headers:{
 Authorization: `Tariq__${token}`
          }
         
        }
      );
      console.log(response);
      setCart(response.data.products);
      console.log(response.data);
    

    }catch(error){
console.log("error",error);
    }finally{
      setisIoading(false);
    }
  }
  useEffect( ()=>{
    getCart();
  },[])
  if(isloading){ return <div>
        
          <CustomLoader loading={isloading}/>
      </div>}

  const incQty=async(productId)=>{
  setisIoading(true);
    try{
    const token =localStorage.getItem("userToken");
    const soso = await axios.patch('https://ecommerce-node4.onrender.com/cart/incraseQuantity',
      {productId:productId},
      {
        headers:{
          Authorization:`Tariq__${token}`
        }
      }
    );
    setCart(prevCart=>{
      return prevCart.map(item =>{
        if(item.productId == productId){
          return{...item,quantity:item.quantity+1};
        }
        return item;
     
      })
    })}catch(error){
      console.log("error",error);
    }finally{
      setisIoading(false);
    }
  }
  if(isloading){ return <div>
        
    <CustomLoader loading={isloading}/>
</div>}

const decQty = async (productId) => {
  setisIoading(true);
  try {
    const token = localStorage.getItem("userToken");
    const item = cart.find(item => item.productId === productId);
    if (item.quantity > 1) {
      await axios.patch('https://ecommerce-node4.onrender.com/cart/decraseQuantity',
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setCart(prevCart => prevCart.map(item => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item));
    }
  } catch (error) {
    console.log("Error decreasing quantity", error);
  } finally {
    setisIoading(false);
  }
};
if(isloading){ return <div>
        
  <CustomLoader loading={isloading}/>
</div>}




  const remove =async(productId)=>{
    setisIoading(true);
    try{
    const token =localStorage.getItem("userToken");
    const Data= await axios.patch('https://ecommerce-node4.onrender.com/cart/removeItem',
      {productId:productId},
      {
        headers:{
          Authorization:`Tariq__${token}`
        }
      }  
    );
   console.log(Data);

    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    setCartCount(cartCount-1)

  }catch(error){
    console.log("erroe",error);
  }finally{
    setisIoading(false);
  }
  }
  if(isloading){ return <div>
        
    <CustomLoader loading={isloading}/>
  </div>}


   const clear=async(productId)=>{
    setisIoading(true);
    try{
    const token =localStorage.getItem("userToken");
    const daTa= await axios.patch('https://ecommerce-node4.onrender.com/cart/clear',
      {productId:productId},
      {
        headers:{
          Authorization:`Tariq__${token}`
        }
      } 
     );
     setCart([]); 
     setCartCount(0)
     
    }catch(error){
      console.log("erroe",error);

    }finally{
      setisIoading(false);
    }}
    if(isloading){ return <div>
        
      <CustomLoader loading={isloading}/>
    </div>}
    



 
  return (
   <section>

 
        <div className='container-fluid  mt-5' >
        
        {cart && cart.length>0 ?(
    <Table striped bordered hover className={`${style.table}`}>
      <thead>
        <tr>
        
          <th>Image</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
  
          <th>Total</th>
          
        </tr>
      </thead>
      
      <tbody>
  {cart?.map(item=>
    <tr key={item._id}>
        <td><img src={item.details.mainImage?.secure_url} width='50px'  /></td>
    <td>   {item.details.name}</td>
    <td>{item.details.finalPrice}$</td>
   
    <td >
    <button className='bg-secondary' onClick={()=>incQty(item.productId)}>+</button> 
    {item.quantity}
    <button className='bg-secondary' onClick={()=>decQty(item.productId)}>-</button> 
    <button className='bg-danger' onClick={()=>remove(item.productId)}> <FaTrash /></button> 

    </td>
   
    <td>{item.quantity*item.details.finalPrice}</td>

    </tr>
  )  }
        
         <tr>
    <td colSpan="6" className="text-center ">
      <button onClick={()=>clear()} className='btn bg-danger '> clear Cart</button>
      </td>
    </tr>
     

<Link to={'/order'} className='p-3 m-3  link-danger' >Checkout </Link>

 

 




      
      </tbody>
    </Table>
  ):(
    <p className={`mt-5 pt-5 ${style.empty}`}> 
     " your cart is empty go to shop and add products "
    </p>
  )}

        </div>

   



   </section>
  )
}
