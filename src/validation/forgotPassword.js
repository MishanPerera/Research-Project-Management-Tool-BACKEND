const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateUpdateForgotPassword = (data) => {
    let errors = {}
    data.email = !isEmpty(data.email) ? data.email : '';


    if (!Validator.isEmail(data.email)) {
        errors.email = 'Inavalid Email Address. Please check !';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required. Please fill !';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateUpdateForgotPassword