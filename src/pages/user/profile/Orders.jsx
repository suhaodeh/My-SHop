import React from 'react'
import { useEffect, useState  } from 'react';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';

import axios from 'axios';
export default function Orders() {
  const [isLoading,setIsloading]=useState(false);
  const [orders,setOrders]=useState([]);
  const getOrders= async()=>{
    const token =localStorage.getItem("userToken");
    setIsloading(true);
    try{
      const response=await axios.get('https://ecommerce-node4.onrender.com/order',
        {
          headers:{
            Authorization:`Tariq__${token}`
          }
        }  );
        console.log(response);
        console.log(response.data);
        if(response.status==200){
          setOrders(response.data.orders);
        }

    }catch(error){
      console.log("error fetching data",error);

    }finally{
setIsloading(false);
    }

  }
  useEffect( ()=>{
    getOrders();
  },[])
  if(isLoading){ return <h2>Loading...</h2>}
  return (
  <>
<container>
  <h2 className='m-4 text-danger'> 
    All Orders
  </h2>
  <Row>
    {orders.length>1?(
      orders.map(order=>(
        <Col md={6} lg={4} key={order._id}>
  <Card className='m-3'>
    <Card.Body>
      <Card.Title className='text-danger'>OrderID:{order._id}</Card.Title>
      <Card.Subtitle>total Price:{order.finalprice}$ |  Address: {order.address}</Card.Subtitle>
      <h6 className='pt-5'>Products:</h6>
      {order.products.length> 0 ? (
                    order.products.map(product => (
                      <div key={product._id} className="d-flex align-items-center mb-3">
                        <img
                          src={product.
                            productId
                            .mainImage?.secure_url}
                          alt={product.name}
                          width="50"
                          height="50"
                          className="me-3 rounded"
                        />
                        <div>
                          <p className="mb-1"><strong>{product.name}</strong></p>
                          <p className="mb-0">Qty: {product.quantity} | Price: ${product.finalPrice}</p>
                        </div>
                      </div>
                    ))
                  ):(
                    <p className="text-muted">No orders available.</p>
                  )}
    </Card.Body>
  </Card>
        </Col>
      ))
      ):(<p className="text-center">No orders available.</p>
    )}
  </Row>
</container>
  </>
  );
}
