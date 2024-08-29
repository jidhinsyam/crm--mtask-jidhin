 
const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

 
router.post('/post', async (req, res) => {
  console.log(req.body);
    const Data = new Customer({
  name: req.body.name,
  email: req.body.email,
  phone:  req.body.phone,
  address:  req.body.address,
  industry:  req.body.industry,
    });
Data.save()
.then((Data)=>{
  return res.status(200).json({
    success:ture,
    error:false,
    message:"success",
    data:Data
  })
})
    
 .catch ((err)=>console.log(err));
});
// router.post('/', async (req, res) => {
//   try {
//     const { name, email, phone } = req.body;
//     const newCustomer = new Customer({ name, email, phone });
//     await newCustomer.save();
//     res.status(201).json({ message: 'Customer added successfully!', data: newCustomer });
//   } catch (error) {
//     console.error('Error adding customer:', error);
//     res.status(500).json({ message: 'Failed to add customer.' });
//   }
// });




 
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).send(customers);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send();
    res.status(200).send(customer);
  } catch (err) {
    res.status(500).send(err);
  }
});
 
router.patch('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).send();
    res.status(200).send(customer);
  } catch (err) {
    res.status(400).send(err);
  }
});

 
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send();
    res.status(200).send(customer);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
