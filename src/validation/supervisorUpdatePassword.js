const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateSupervisorUpdatePassword = (data) => {
    let errors = {}
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';
   
    if (data.newPassword !== data.confirmNewPassword) {
        errors.confirmNewPassword = 'Password mismatch ! Please check again.';
    }

    if (Validator.isEmpty(data.confirmNewPassword)) {
        errors.confirmNewPassword = 'Confirm New Password is required';
    }

    if (Validator.isEmpty(data.oldPassword)) {
        errors.oldPassword = 'Old Password is required';
    }

    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = 'Password should contain at least six character';
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'New Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateSupervisorUpdatePassword
