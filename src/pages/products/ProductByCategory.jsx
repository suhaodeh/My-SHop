import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import CustomLoader from '../../components/user/CustomLoader/CustomLoader';
import style from './Products.module.css'
export default function ProductByCategory() {
    const {categoryId}=useParams();
      const [products,setProducts]=useState([{}]);
      const [isloading,setisLoading]=useState(true)

      const getProducts= async()=>{
        try{
        const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`)
    console.log(data);
    setProducts(data.products);
          
    }catch(error){
      console.log(error);
    
    }finally{
      setisLoading(false)
    }
      }
      useEffect( ()=>
      {getProducts();},[])
    
      if(isloading){
        return <div>
              
                <CustomLoader loading={isloading}/>
            </div>
      }

  return (
    <>
    <section className='ms-5'>
     <div className='row mt-5'>
       {products.map((product,index)=>
         <div className='col-md-4 col-sm-6' key={product._id}>
           <div className={`pt-5 ${style.products}`} style={{ animationDelay: `${index * 0.3}s` }}> 
             <img src={product.mainImage.secure_url} />
             <h6 className={`mt-5 ${style.h6}`}>{product.name}</h6>
             <h5 className={`${style.price}`}>Price:{product.price}</h5>
           </div>
         </div>
       )}
     </div>
    </section>
    </>
  )
}
