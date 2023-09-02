const joi = require('joi');

const registerValidation = (data) => {
    const Schema = joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().email().required(),
        phone: joi.number().integer().min(1000000000).max(9999999999).required(),
        password: joi.string().min(5).required(),
        Cpassword: joi.string().min(5).required()
    });
    return Schema.validate(data)
}

module.exports.registerValidation = registerValidation;