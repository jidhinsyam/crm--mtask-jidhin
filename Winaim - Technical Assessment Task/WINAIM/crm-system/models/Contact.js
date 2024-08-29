const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  name: String,
  position: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('Contact', contactSchema)