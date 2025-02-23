import React, { useEffect, useState } from 'react'
import axios from 'axios';

import CustomLoader from '../user/CustomLoader/CustomLoader';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation ,Autoplay} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';


export default function Category() {





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
  return (
    <>
        <Swiper
      className='m-5 '
          modules={[Navigation]}
      spaceBetween={50}
      navigation
    loop={true}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
      slidesPerView={3.5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >{categories.map(category=> <SwiperSlide key={category._id}>
        <img src={category.image.secure_url} width={250} />
    </SwiperSlide>)}

    </Swiper>
    </>
  )
}
