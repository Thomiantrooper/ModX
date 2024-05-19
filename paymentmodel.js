const mongoose=require("mongoose")
const customersschema=mongoose.Schema({
    U_name:String,
    card_number:String,
    card_holder:String,
    expir_date:String,
    cvc:String,
    coupon_code:String,

  
   
   
   

},{
    timestamps:true

})

const customermodel=mongoose.model("Payments",customersschema)
module.exports = customermodel;