const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  type: String, 
  date: Date,
  notes: String,
});

module.exports = mongoose.model('Interaction', interactionSchema);
