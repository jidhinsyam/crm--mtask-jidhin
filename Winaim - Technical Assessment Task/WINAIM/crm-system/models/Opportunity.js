const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  title: String,
  description: String,
  value: Number,
  stage: String, // 
  expectedCloseDate: Date,
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
