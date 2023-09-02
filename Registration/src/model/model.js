const mongoose = require('mongoose');

const empschema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        unique : true,
        required : true
    },    
    phone :{
        type : Number,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    Cpassword :{
        type : String,
        required : true
    },
    date :{
        type : Date,
        default : Date.now()
    }, 
});

module.exports = new mongoose.model("empcollection", empschema)