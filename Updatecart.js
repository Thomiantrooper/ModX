import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './cartupdate.css'

function UpdateCart(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({
      fname:"",
      lname:"",
      email:"",
      password:"",
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/order_cart/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdateorder(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdateorder({
          ...updateorder,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:5000/update_cart`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updateorder._id,
              ...updateorder,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            console.log('Order updated successfully');
           alert("Order updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='order-update'>

<h2> Update Details</h2><br></br>
    <lable>Helmet Name:</lable>
    <input type="text" id="name" name="name"     onChange={handleInputChange} value={updateorder?.name }/><br></br>
    <lable>Color:</lable>
    <input type="text" id="color" name="color"     onChange={handleInputChange} value={updateorder?.color }/><br></br> 
    <lable>Brand:</lable>
    <input type="text" id="brand" name="brand"     onChange={handleInputChange} value={updateorder?.brand }/><br></br> 
    <lable>Quentity:</lable>
    <input type="text" id="quantity" name="quantity"     onChange={handleInputChange} value={updateorder?.quantity }/><br></br>
    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 

 
        </div>
    )
}
export default UpdateCart;