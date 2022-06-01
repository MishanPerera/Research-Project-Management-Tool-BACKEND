const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateSupervisorLoginInput = (data) => {
    let errors = {}
    data.supervisorID = !isEmpty(data.supervisorID) ? data.supervisorID : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.supervisorID, { min: 10, max: 10 })) {
        errors.supervisorID = 'Supervisor ID must be 10 characters';
    }

    if (Validator.isEmpty(data.supervisorID)) {
        errors.supervisorID = 'Supervisor ID is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateSupervisorLoginInput