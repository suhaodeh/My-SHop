import { Button } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

export default function Image() {
   const{register,handleSubmit,formState:{errors}}= useForm();
   const{user,loading}=useContext(UserContext);
   const[isLoading,setIsLoading]=useState(false);
   const[imagePreview,setImagePreview]=useState(null);
   async function updateImage(data) {
        const token = localStorage.getItem('userToken');
        const formdata = new FormData();
        formdata.append("image", data.image[0]);
        try {
            setIsLoading(true);
            const response = await axios.put("https://ecommerce-node4.onrender.com/user/update-image", formdata,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
            console.log(response);
            if (response.status == 200) {
                toast.success("image updated successfully");
            }
        } catch (error) {
            toast.error("Error updating image");
            console.log(error);
    }finally{
        setIsLoading(false);
    }
}
const handleImageChange=(event)=>{
    console.log(event);
    const file= event.target.files[0];
    setImagePreview(URL.createObjectURL(file));
}
if(isLoading)return<h2 className='p-5 m-5'>Loading....</h2>


  return (
  
<Form onSubmit={handleSubmit(updateImage) } encType='multipart/form-data' className='m-5 p-5' >
    <Form.Group controlId='updateImage'>
        <Form.Label className='text-light'>Update profile pic      </Form.Label>
            <Form.Control type='file' {...register('image')} onChange={handleImageChange}>
                 </Form.Control>
  
    </Form.Group >
{imagePreview?<img src={imagePreview} width={200} /> :<img src={user.image.secure_url}width={200} 
/>}
    <Button type='submit' className='btn-danger '>Update</Button>
</Form>
  )
}
