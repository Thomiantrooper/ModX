import  { useEffect, useState,useRef } from 'react'
import axios from "axios"
import './cartdetails.css'
import {useReactToPrint} from "react-to-print";

function CartDetails(){
    const componentPDF=useRef();
    const [showdiscounts,setshowdiscounts]=useState([]);
    const [searchkey,setsearchkey]=useState('');

//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:5000/_cart")
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
    const data=await axios.delete("http://localhost:5000/delete_cart/"+id)
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
        customer.name.toLowerCase().includes(searchKey.toLowerCase())
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
              <th>Helmet Name</th>
              <th>Color </th>
              <th>Brand</th>
              <th>Quentity</th>
              <th>Action</th>
              </tr>
     
    
              <tbody>
                  { 
                     showdiscounts.map((e1)=>{
                      return(
                          <tr> 
                            <td> {e1.name}</td> 
                            <td> {e1.color}</td> 
                            <td> {e1.brand}</td> 
                            <td> {e1.quantity}</td> 
                            
                         
                           
                            <td>
                              <a href={`/updatecart/${e1._id}`}>Edit Details</a>
                              <button onClick={()=>handledelete(e1._id)}>Delete Details</button>
                              <a href={`/pay`}>Pay Now</a>
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
export default CartDetails;