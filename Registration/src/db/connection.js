const mongoose = require('mongoose');


mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://sahil:Sahilpund100@cluster0.vlajov8.mongodb.net/Registration?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connection Successful..");
})
.catch((error)=>{
    console.log(`There is a error while connecting ${error}`);
})
