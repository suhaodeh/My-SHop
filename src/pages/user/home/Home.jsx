import React from 'react'
import style from './Home.module.css';
import { useEffect } from 'react';
import Footer from '../../../components/user/footer/Footer';
import Category from '../../../components/categoryComponent/Category';
import { useNavigate } from 'react-router-dom';

import { Card,Button } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
export default function Home() {
 const navigate= useNavigate()
  const shopNow=()=>{
navigate('/products')
  }

  const reviews = [
    {
      id: 1,
      name: " Ahmad",
      text: "High quality products and fast delivery and amazing offers",
      rating: 5,
      image: "/src/assets/images/ahmad.jpg",
    },
    {
      id: 2,
      name: "Sara",
      text: "Fast delivery, and the quality is better than I expected",
      rating: 4,
      image: "/src/assets/images/sara.jpg",
    },
    {
      id: 3,
      name: "Omar",
      text: "Best store I have ever dealt with! amazing quality and best price",
      rating: 5,
      image: "/src/assets/images/omar.jpg",
    },
  ];


  
  return (
<>

  <div className='row'>
<div className={`col-sm-12 ${style.homeBg}`}>

<img src={`/src/assets/images/mainBg.jpg`} alt="Shop Background" className={` ${style.bgimg}`} />
<h3 className={style.welcomeText}>WELCOME TO OUR SHOP</h3>
</div>
</div>

<section className='bg-white '>
<div className='row'>
<div className={`  d-flex mt-5 p-5 mb-5 ${style.homeP}`}>
 <div className='col-sm-10'>
  <h4 className='text-center pb-3'>" Welcome To trolley  Shop "</h4>
<p>Welcome to the perfect shopping world!
 Where quality meets elegance, and exclusive offers await you! 
 Enjoy an unparalleled shopping experience and get the best products at the best prices!</p>
</div>
</div  >

</div>

<Category/>


<section className={`mb-5 ${style.section}`}>
  
    <p>Customer satisfaction is our goal, and we are keen for you to have the best shopping experience</p>
  
  
    <div class={`row  ${style.features}`}>
        <div className={` col-sm-2 ${style.featurebox}`}>  Fast Delevarey </div>
        <div className={` col-sm-2 ${style.featurebox}`}>Good Price</div>
        <div className={`col-sm-2 ${style.featurebox}`}>Special Offers</div>
        <div className={`col-sm-2 ${style.featurebox}`}>High Quality</div>
        <div className={` col-sm-2 ${style.featurebox}`}> Latest trends</div>
   
    </div>
</section>



<div>
  <div >
    <div className='row'>
      <div className='col-md-8' >
        <div className={`  mt-5  ${style.imgContainer}`}>
        <img className={`${style.img1}`} src={`/src/assets/images/iphones3.jpg`}/>
        <img className={`${style.img2}`} src={`/src/assets/images/iphone1.jpg`}/>
        </div>
        </div>
      <div className={` col-md-4 ${style.freeContainer}`}>
       <p>Shop Our Best Sellers &  Get <span className={`${style.free}`}>FREE Delivery</span></p>
       <div className={`d-flex justify-content-center p-5  ${style.btn}`}>
<button  onClick={shopNow} className={` mt-5 ${style.shopNowBtn}`}>Shop Now</button>
</div>
      </div>

    </div>
  </div>
</div>
</section>

<section className={`${style.reviewsSection}`}>
  <h2 className='text-center pb-5 '>Our Happy Customers</h2>
  <div className='container'>
    <div className='row'>
    {reviews.map((review) => (
            <div key={review.id} className="col-md-4">
              <Card className={style.reviewCard}>
                <Card.Img variant="top" src={review.image} className={style.userImage} />
                <Card.Body>
                  <Card.Title>{review.name}</Card.Title>
                  <Card.Text>"{review.text}"</Card.Text>
                  <div className={style.rating}>
                             
                               {Array.from({ length: 5 }, (_, i) =>
                                 i < review.rating ? <FaStar key={i} color="gold" /> : <FaRegStar key={i} color="gray" />
                               )}
                          
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}

    </div>

  </div>
</section>
<Footer/>
</>
    
  )
}
