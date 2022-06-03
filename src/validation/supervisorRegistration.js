const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateSupervisorRegisterInput = (data) => {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.faculty = !isEmpty(data.faculty) ? data.faculty : '';
    data.mobileNumber = !isEmpty(data.mobileNumber) ? data.mobileNumber : '';

    if (!Validator.isLength(data.name, { min: 5, max: 30 })) {
        errors.name = 'Name must be between  and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }


    if (Validator.isEmpty(data.department)) {
        errors.department = 'Department field is required';
    }

    if (Validator.isEmpty(data.faculty)) {
        errors.faculty = 'Faculty field is required';
    }

    if (Validator.isEmpty(data.mobileNumber)) {
        errors.mobileNumber = 'Mobile number field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateSupervisorRegisterInput