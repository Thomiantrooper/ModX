const mongoose=require("mongoose")
const cartschema=mongoose.Schema({
    name:String,
    color:String,
    brand:String,
    quantity:String,
 
 
     
 
   

},{
    timestamps:true

})

const cartmodel=mongoose.model("cart",cartschema)

module.exports = cartmodel;
