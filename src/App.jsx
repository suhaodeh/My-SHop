import React from 'react'
import CustomNavbar from './components/user/navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authlayout from './layouts/Authlayout';
import Dashboardlayout from './layouts/Dashboardlayout';
import Register from './pages/user/register/Register';
import Login from './pages/user/login/Login';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

import Userlayout from './layouts/Userlayout';
import Categories from './pages/user/category/Categories';
import Home from './pages/user/home/Home';
import Products from './pages/products/Products';
import ProductByCategory from './pages/products/ProductByCategory';
import ProductDetails from './pages/products/ProductDetails';
import Cart from './pages/user/cart/Cart';
import ProtectedRoute from './components/user/ProtectedRoute';
import CartContextProvider from './pages/user/context/CartContext';
import Profile from './pages/user/profile/Profile';
import Info from './pages/user/profile/Info';
import Orders from './pages/user/profile/Orders';
import UserContextProvider from './pages/user/context/UserContext';
import Image from './pages/user/profile/Image';
import AuthProtectedRoute from './components/user/AuthProtectedRoute';
import Forgotpassword from './pages/user/login/Forgotpassword';
import Setpassword from './pages/user/login/Setpassword';
import Order from './pages/user/cart/order/Order';



export default function App() {
  const router = createBrowserRouter(
    [
{
  path:"/auth",
  element:
  <AuthProtectedRoute>
  <Authlayout/>
  </AuthProtectedRoute>,

  children:[
    {
      path:"register",
      element:<Register/>
    },
    {
      path:"login",
      element: <Login/>
    },
    {
      path:"/auth/forgotpassword",
      element:<Forgotpassword/>
    },
    {
      path:"/auth/setpassword",
      element:<Setpassword/>
    }
 
  ]

},
{
  path:"/",
  element:
  <UserContextProvider>
       <CartContextProvider>
     <ProtectedRoute>
  <Userlayout/>
  </ProtectedRoute>
  </CartContextProvider>
  </UserContextProvider>,
  children:[
    {
      path:"/",
      element:<Home/>,
    },
  
    {
path:"products",
element:<Products/>,
    },
    {
      path:"categories",
      element:<Categories />,
     
    },
    {
path:'categories/:categoryId',
element:<ProductByCategory/>
    },
    {
      path:'product/:productId',
      element:<ProductDetails/>
    },
         
  
    {
      path:'cart',
      element:<Cart/>,
    },
        {
          path:'order',
          element:<Order/>
        },
      
   
  
  
    {
      path:'profile',
      element:<Profile/>,
      children:[
        {
          path:'info',
          element:<Info/>,
        },
        {
          path:'orders',
          element:< Orders/>
        },
        {
          path:'image',
          element:< Image/>
        }
   
      ]
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
  );
}
