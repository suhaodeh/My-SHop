import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Categories.module.css'
import Footer from '../../../components/user/footer/Footer';
import CustomLoader from '../../../components/user/CustomLoader/CustomLoader';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
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
    return <div>
      
        <CustomLoader loading={isloading}/>
    </div>
  
  }

  return(
<>

<section className={`container m-5 ${style.categoriesSec}`}>
  <h2 className="text-center mb-4">SHOP BY CATEGORY</h2>
  <p className={`text-center  ${style.categoryP}`}>Choose from a wide range of categories and enjoy the best offers.</p>

  <div className="container">
    <div className="row">
      {categories.map((category, index) => (
        <motion.div
          key={category._id}
          className="col-md-6 d-flex justify-content-center" // توسيط العناصر
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: index * 0.5 }}
        >
          <div className={`mb-4 ${style.categoryCard} text-center p-4`}> 
            <img className="mt-3 img-fluid" src={category.image.secure_url} alt={category.name} />
            <p className="mt-2">"Discover the best products in this category!"</p>
            <Link to={`/categories/${category._id}`} className="btn btn-dark mt-2">
              Show Products
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      

<Footer/>
</>
 
  )
}    
     
   
  

