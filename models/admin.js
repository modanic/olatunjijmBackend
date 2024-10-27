const mongoose = require("mongoose")


const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  contact: {

    phoneNumber: [String],
    address: String,
    email: [String],
    location: {
      lat: String,
      log: String
    },

  },
  gallary: [{
    image_url: String,
    image_name: String,
    public_id: String
  }],
  equipmentRental: [{
    image_url: String,
    image_name: String,
    public_id: String
  }],
  concreteProducts: [{
    image_url: String,
    image_name: String,
    public_id: String
  }],
  salesSupply: [{
    image_url: String,
    image_name: String,
    public_id: String
  }],
})


adminSchema.set('toJSON', {
    transform: (document, returnedObject) => {

      returnedObject.id = returnedObject._id.toString()

      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password

    }
})


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
