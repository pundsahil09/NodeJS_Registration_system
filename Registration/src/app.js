const express = require("express");
const mongoose = require('mongoose')
const app = express();
require("./db/connection")
const PORT = 5000;
const path = require('path');
const empschema = require('./model/model')
const template_path = path.join(__dirname, './template/views')
const { registerValidation } = require('./validation/validation')

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'hbs');
app.set('views', template_path)


app.use(express.json())
app.get("/", (req, res) => {
    res.render('register')
})

// Register Functionality
app.post("/empdata", async (req, res) => {

    const password = req.body.password
    const Cpassword = req.body.Cpassword
    if (password !== Cpassword) return res.status(404).send("Password and confirm Password are not same.")

    const { error } = await registerValidation(req.body)
    if (error) return res.status(404).send(error.details[0].message);

    const emailExist = await empschema.findOne({ email: req.body.email })
    if (emailExist) return res.status(404).send("Email Already Exists..")

    const empData = new empschema({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: password,
        Cpassword: Cpassword
    });

    try {
        const saveData = await empData.save({ new: true });
        // res.send(saveData)
        res.send('Registration Successful')
    } catch (error) {
        console.log(error)
    }
})

// Login function
app.get("/login", (req, res) => {
    res.render('login')
})

app.post("/loginPage", async (req, res) => {
    const emailExist = await empschema.findOne({ email: req.body.email })
    if (!emailExist) return res.status(400).send("Email does not exist..")

    if (emailExist.password === req.body.password) {
        res.render('index')
    }
    else {
        return res.status(401).send("Invalid Password")
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})

