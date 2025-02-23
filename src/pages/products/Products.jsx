import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './Products.module.css'
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Footer from '../../components/user/footer/Footer';
import CustomLoader from '../../components/user/CustomLoader/CustomLoader';

import { Button } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import { div } from 'framer-motion/client';
export default function Products() {
  const {register,handleSubmit}=useForm();
  const {productId}=useParams();
  const navigate =useNavigate();
  const [products,setProducts]=useState([{}]);
  const [isloading,setisLoading]=useState(true);
  const [activePage, setActivePage] = useState(1); 
  const [sortValue, setSortValue] = useState("");
  const [searchWord,setSearchWord]=useState("");



  const getProducts= async(page,sort,search)=>{
    try{
    const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products?page=${page}&limit=5&sort=${sort}&search=${search}`);
console.log(data);
setProducts(data.products);
      
}catch(error){
  console.log(error);

}finally{
  setisLoading(false)
}
  }

  useEffect(() => {
    getProducts(activePage, sortValue,searchWord);
  }, [activePage, sortValue]);

  if(isloading){
    return <div>
          
            <CustomLoader loading={isloading}/>
        </div>
 
  }

  const handlePageChange=(page)=>{
    setActivePage(page);
  };
  let items = [];
  for (let number = 1; number <= 2; number++) {
    items.push(
      <Pagination.Item className={`pagenation`} key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }
const handleSortChange=(event)=>{
  setSortValue(event.target.value);
}
const handleSearchChange = (event) => {
  setSearchWord(event.target.value);
};
const search=()=>{
  getProducts(1,sortValue,searchWord);
  setActivePage(1);
}




  
  return (
   <>
   <div>
    <div className={` d-flex gap-3 p-3 ${style.filterContainer}`}>
      
    <FloatingLabel className='w-25'  controlId="floatingSelect" label="Works with selects ">
      <Form.Select aria-label="Floating label select example" {...register("sortInput")} onChange={handleSortChange}>
     
        <option value="">Default</option>
        <option value="price">price:low to height</option>
        <option value="-price">price:height to low</option>
        <option value="name">name:Z-A</option>
        <option value="-name">name:A-Z</option>
      </Form.Select>
    </FloatingLabel>
<div>
    <FloatingLabel
        controlId="floatingInput"
        label="Search"
        className="mb-3 w-25"
      >
        <Form.Control type="text" value={searchWord} onChange={handleSearchChange} className={`${style.formcontrol}`}/>
      </FloatingLabel>

  <Button onClick={()=>search()}>Search</Button>

   </div>
      </div>
       </div>
       
   <section className='container p-5 m-5 '>
    <div className='row grid gap-0 row-gap-5'>
      {products.map((product,index)=>
        <div className='col-md-4' key={product._id} >
          <div className={`${style.products}`} style={{ animationDelay: `${index * 0.3}s` }}>
            <img src={product.mainImage?.secure_url} />
            <h2 className='mt-3 pt-2'>{product.name}</h2>
           
           <h5 className={`${style.price}`}>Price:{product.price}</h5>
           <div>
            <Link className={`btn mt-2 bg-white ${style.link}`} to={`/product/${product._id}`}>Details</Link>
            </div>

          </div>
        </div>
      )}
    </div>
    <Pagination>{items}</Pagination>
   </section>

   <Footer/>
   </>
  )
  }
