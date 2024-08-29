const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/customers');
const contactRoutes = require('./routes/contacts');
const opportunityRoutes = require('./routes/opportunities');
const interactionRoutes = require('./routes/interactions');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/crm', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));
const mongoDburl="mongodb+srv://jidhinsyam:am123@cluster0.p6u8y.mongodb.net/"
mongoose.connect(mongoDburl,{
    useNewurlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected");
}).catch((error)=>{
    console.log(error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

 
 
app.use('/api/customers', routes);
// app.use('/api/customers', customerRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/interactions', interactionRoutes);



 