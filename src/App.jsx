import React from 'react'
import CustomNavbar from './components/user/navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authlayout from './layouts/Authlayout';
import Dashboardlayout from './layouts/Dashboardlayout';
import Register from './pages/user/register/Register';
import Login from './pages/user/login/Login';
import { ToastContainer } from 'react-bootstrap';
import Userlayout from './layouts/Userlayout';
import Categories from './pages/user/category/Categories';
import Home from './pages/user/home/Home';
import Products from './pages/products/Products';
import ProductByCategory from './pages/products/ProductByCategory';
import ProductDetails from './pages/products/ProductDetails';
import Cart from './pages/user/cart/Cart';



export default function App() {
  const router = createBrowserRouter(
    [
{
  path:"/auth/",
  element:<Authlayout/>,
  children:[
    {
      path:"/auth/register",
      element:<Register/>
    },
    {
      path:"/auth/login",
      element: <Login/>
    },
 
  ]

},
{
  path:"/",
  element:<Userlayout/>,
  children:[
    {
      path:"/",
      element:<Home/>,
    },
    {
path:"/products",
element:<Products/>,
    },
    {
      path:"/categories",
      element:<Categories />,
    },
    {
path:'/categories/:categoryId',
element:<ProductByCategory/>
    },
    {
      path:'/product/:productId',
      element:<ProductDetails/>
    },
    {
      path:'/cart',
      element:<Cart/>
    }

  ]
},


{
  path:"/dashboard",
  element:<Dashboardlayout/>,
},

    ]
  );
  return (
   <>
   <ToastContainer/>
 <RouterProvider router={router} />
   
   </>
  )
}
