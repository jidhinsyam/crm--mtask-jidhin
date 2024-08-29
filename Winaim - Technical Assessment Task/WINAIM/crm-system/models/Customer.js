const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  industry: String,
});

module.exports = mongoose.model('Customer', customerSchema);