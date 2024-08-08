const express = require('express');
const cors  = require('cors');
const authRoutes = require('./routes/auth.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin : '*',
    methods : ['GET','POST','PUT','DELETE']
}));
 

app.use(express.json()); // This will allow us to pass json payloads from front end to backend.
app.use(express.urlencoded());

// Routes
app.get('/',(req,res)=>{
    res.send('Hello, World!');
})

app.use('/auth', authRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port localhost:${PORT}`);
})
