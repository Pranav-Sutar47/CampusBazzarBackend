const express = require('express');

require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

require('./Models/Config');

const PORT = process.env.PORT || 5000;

// User Routes
app.use('/api/user',require('./Routes/User'));

app.use('/api/posts',require('./Routes/Posts'));

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server Up and Listen on ${PORT}`)
});