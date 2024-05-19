import  { useEffect, useState,useRef } from 'react'
import axios from "axios"
import './orderdetails.css'
import {useReactToPrint} from "react-to-print";

function PaymentDetails(){
    const componentPDF=useRef();
    const [showdiscounts,setshowdiscounts]=useState([]);
    const [searchkey,setsearchkey]=useState('');

//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:5000/_payment")
    console.log(data.data.success)
    if(data.data.success){
        setshowdiscounts(data.data.data)
    }
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])

//delete
const handledelete= async(id)=>{
    const data=await axios.delete("http://localhost:5000/delete_payment/"+id)
    if(data.data.success){
        getfetchdata()
        console.log(data.data.message)
        alert("Order item deleted Successfully!")
    }
}
//generatePDF
const generatePDF=useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"show services ",
    onAfterPrint:()=>alert("data save in pdf")
})
//serach
const handlesearch = (e) => {

    filterdata(searchkey);
}
const filterdata = (searchKey) => {
    const filteredData = showdiscounts.filter(customer =>
        customer.U_name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setshowdiscounts(filteredData);
}

    return(
        <div className="showorders">
             <div className='searchbtn'>
        <input  type="search" onChange={(e)=>setsearchkey(e.target.value)} placeholder='search' className='in'/> <t></t> 
       
        <button  id='search-btn'  onClick={(e)=>handlesearch(e)}> search </button>
        </div>   
                <div ref={componentPDF} style={{width:'100%'}}>
 <table>
              
              <tr>
              <th>User Name</th>
              <th>Card Number</th>
              <th>Card Holder</th>
              <th>Expiry Date</th>
              <th>CVC</th>
              <th>Coupon Date</th>
              <th>Action</th>
 
              </tr>

     
              <tbody>
                  { 
                     showdiscounts.map((e1)=>{
                      return(
                          <tr> 
                            <td> {e1.U_name}</td> 
                            <td> {e1.card_number}</td> 
                            <td> {e1.card_holder}</td> 
                            <td> {e1.expir_date}</td> 
                            <td> {e1.cvc}</td> 
                            <td> {e1.coupon_code}</td> 
                         
                           
                            <td>
                              <a href={`/updatepayment/${e1._id}`}>Edit Payment </a>
                              <button onClick={()=>handledelete(e1._id)}>Reject </button>
                            </td>
                          </tr>
                      )

              })
                  }
              </tbody>
  </table>
  </div>
  <button onClick={generatePDF}>Download Repoart</button>
        </div>
    )
}
export default PaymentDetails;