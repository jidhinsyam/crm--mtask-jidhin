 
const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Create a new contact
// router.post('/', async (req, res) => {
//   try {
//     const contact = new Contact(req.body);
//     await contact.save();
//     res.status(201).send(contact);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
router.post('/post', async (req, res) => {
  console.log(req.body);
    const Data = new Contact({
  name: req.body.name,
  email: req.body.email,
  phone:  req.body.phone,
  Position:  req.body.Position,
   
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
 
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send();
    res.status(200).send(contact);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
router.patch('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).send();
    res.status(200).send(contact);
  } catch (err) {
    res.status(400).send(err);
  }
});

 
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).send();
    res.status(200).send(contact);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
