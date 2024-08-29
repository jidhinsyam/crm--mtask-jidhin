 
const express = require('express');
const Interaction = require('../models/Interaction');
const router = express.Router();

// Create a new interaction
// router.post('/', async (req, res) => {
//   try {
//     const interaction = new Interaction(req.body);
//     await interaction.save();
//     res.status(201).send(interaction);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

router.post('/post', async (req, res) => {
  console.log(req.body);
    const Data = new Interaction({
  customerId: req.body.customerId,
  type: req.body.type,
  date:  req.body.date,
  notes:  req.body.notes,
   
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
    const interactions = await Interaction.find();
    res.status(200).send(interactions);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
router.get('/:id', async (req, res) => {
  try {
    const interaction = await Interaction.findById(req.params.id);
    if (!interaction) return res.status(404).send();
    res.status(200).send(interaction);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
router.patch('/:id', async (req, res) => {
  try {
    const interaction = await Interaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!interaction) return res.status(404).send();
    res.status(200).send(interaction);
  } catch (err) {
    res.status(400).send(err);
  }
});
 
router.delete('/:id', async (req, res) => {
  try {
    const interaction = await Interaction.findByIdAndDelete(req.params.id);
    if (!interaction) return res.status(404).send();
    res.status(200).send(interaction);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
