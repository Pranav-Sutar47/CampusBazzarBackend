const mongoose = require('mongoose');

const MAINURL = String(process.env.MAIN_URL);

const MainDB = mongoose.createConnection(MAINURL);

MainDB.on('connected',()=>{
    console.log('Main DB Connected');
})

MainDB.on('error',(err)=>{
    console.log('Main DB error',err);
})


module.exports = {
    MainDB
}