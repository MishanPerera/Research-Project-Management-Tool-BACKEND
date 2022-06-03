const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateOTP = (data) => {
    let errors = {}
    data.otp = !isEmpty(data.otp) ? data.otp : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';


    if (!Validator.isLength(data.newPassword, { min: 5, max: 20 })) {
        errors.newPassword = 'Password must contain at least five characters';
    } 

    if (!Validator.isLength(data.otp, { min: 6, max: 6})) {
        errors.otp = 'OTP must contain six characters ';
    } 

    if (Validator.isEmpty(data.otp)) {
        errors.otp = 'OTP is required';
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'New Password is required';
    }

    if (Validator.isEmpty(data.confirmNewPassword)) {
        errors.confirmNewPassword = 'Confirmation is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

module.exports = validateOTP