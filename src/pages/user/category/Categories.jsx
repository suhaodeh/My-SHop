import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Categories.module.css'
import { Link } from 'react-router-dom';
export default function Categories() {
  const [categories,setCategories]=useState([{}]);
  const [isloading,setisLoading]=useState(true);

  const getCategories =async()=>{
    try{ 
      const {data}= await axios.get(`https://ecommerce-node4.onrender.com/categories/active`);
    console.log(data.categories);
    setCategories(data.categories)

    }
    catch(error){
console.log(error);
    }finally{
      setisLoading(false )
    }
  }
  useEffect( ()=>{
    getCategories();
  },[])

  if(isloading){
    return <h2>Loading....</h2>
  }

  return(
<>
<section className='categories container mt-5 pt-5'>
  <div className='row'>
{categories.map(category=>(
<div className='col-md-3' key={category._id}>
  <div className={`${style.categories} d-flex flex-column`}>
  <img src={category.image.secure_url}/>
  <Link to={`/categories/${category._id}`}> Products</Link>
  </div>
  </div>

))}
</div>
</section>
</>
 
  )
}    
     
   
  

