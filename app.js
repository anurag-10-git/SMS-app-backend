const dotenv = require('dotenv');
const express = require('express');
const cors =  require('cors'); 

const UserRoutes = require('./routes/userRoutes.js');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use('/api/user',UserRoutes);

app.listen(port,()=>{
    console.log(`Server is listening on the port ${port}`)
});