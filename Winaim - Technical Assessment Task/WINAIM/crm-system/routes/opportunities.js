 
const express = require('express');
const Opportunity = require('../models/Opportunity');
const router = express.Router();

// Create a new opportunity
// router.post('/', async (req, res) => {
//   try {
//     const opportunity = new Opportunity(req.body);
//     await opportunity.save();
//     res.status(201).send(opportunity);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
router.post('/post', async (req, res) => {
  console.log(req.body);
    const Data = new Opportunity({
      customerId:req.body.customerId,
      title: req.body.title,
      description: req.body.description,
      value: req.body.value,
      stage: req.body.stage,  
      expectedCloseDate: req.body.expectedCloseDate,
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
    const opportunities = await Opportunity.find();
    res.status(200).send(opportunities);
  } catch (err) {
    res.status(500).send(err);
  }
});
 
router.get('/:id', async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).send();
    res.status(200).send(opportunity);
  } catch (err) {
    res.status(500).send(err);
  }
});
 
router.patch('/:id', async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!opportunity) return res.status(404).send();
    res.status(200).send(opportunity);
  } catch (err) {
    res.status(400).send(err);
  }
});

 
router.delete('/:id', async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
    if (!opportunity) return res.status(404).send();
    res.status(200).send(opportunity);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
