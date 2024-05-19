import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './orderupdate.css'

function UpdatePayment(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({
        c_first_name:"",
        c_last_name:"",
        c_phone:"",
        c_email:"",
        c_password:"",
      
    
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/order_payment/${id}`);
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
          const response = await fetch(`http://localhost:5000/update_payment`, {
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


<lable>User Name:</lable>
    <input type="text" id="U_name" name="U_name" onChange={handleInputChange} value={updateorder?.U_name }/><br></br>
    <lable>Card  Number:</lable>
    <input type="text" id="card_number" name="card_number" onChange={handleInputChange} value={updateorder?.card_number }/><br></br>
    <lable>Card Holder:</lable>
    <input type="text" id="card_holder" name="card_holder"onChange={handleInputChange} value={updateorder?.card_holder }/><br></br>
    <lable>Expiry Date:</lable>
    <input type="date" id="expir_date" name="expir_date" onChange={handleInputChange} value={updateorder?.expir_date }/><br></br> 
    
    <lable>CVC:</lable>
    <input type="text" id="cvc" name="cvc" onChange={handleInputChange} value={updateorder?.cvc }/><br></br> 
   
    <lable>Coupon Code:</lable>
    <input type="text" id="coupon_code" name="coupon_code" onChange={handleInputChange} value={updateorder?.coupon_code }/><br></br> 
    <button>Update</button>

    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 
    
        </div>
    )
}
export default UpdatePayment;