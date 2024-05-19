const mongoose = require("mongoose");

// Declare the Schema of the Mongo model for Manager
const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assuming each manager has a unique email
  },
  contact: {
    type: String,
    required: true,
  },
  // Assuming you want to store the enquiries replied by this manager
  repliedEnquiries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enquiry'
  }]
});

// Export the model
module.exports = mongoose.model("Manager", managerSchema);
