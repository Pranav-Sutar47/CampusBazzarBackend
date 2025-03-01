const mongoose = require('mongoose');

const USERURL = String(process.env.USER_URL);

const UserDB = mongoose.createConnection(USERURL);

UserDB.on('connected',()=>{
    console.log('User DB Connected');
})

UserDB.on('error',(err)=>{
    console.log('User DB error:',err);
});

module.exports = {
    UserDB
}