const mongoose = require("mongoose");
const schemaData = mongoose.Schema({
    name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   reason: {
      type: String,
      required: true
   },
   start :{
      type: Date,
      required: true
   },
   end :{
      type: Date,
      required: true
   },
   },{
      timestamps : true
   })
   
   const employeeModel = mongoose.model("employee",schemaData)
  