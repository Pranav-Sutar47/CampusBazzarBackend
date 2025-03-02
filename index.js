const express = require('express');

require('dotenv').config();

const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

require('./Models/Config');

const PORT = process.env.PORT || 5000;

const SERVER_URL = `http://localhost:${PORT}/ping`;

// User Routes
app.use('/api/user',require('./Routes/User'));

//Posts Routes
app.use('/api/posts',require('./Routes/Posts'));

//Search Routes
app.use('/api/search',require('./Routes/Search'));

app.get('/ping', (req, res) => {
    res.send('Server is alive');
});



app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server Up and Listen on ${PORT}`);
    setInterval(() => {
            axios
            .get(SERVER_URL)
            .then(() => console.log("Self-ping successful"))
            .catch((err) => console.error("Self-ping failed:", err.message));
    }, 3 *60*1000);
});