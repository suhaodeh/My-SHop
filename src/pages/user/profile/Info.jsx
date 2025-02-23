import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { style } from 'framer-motion/client';



export default function Info() {
    const {user,loading}= useContext(UserContext);
  return (
    <div className={` p-3 ${style.info}`}>
        <h2 className='text-danger'> User Name: {user.userName}</h2>
        <h3 className='text-danger'> User Email:  {user.email}</h3>
    </div>
  )
}
