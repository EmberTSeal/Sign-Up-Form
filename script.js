const allInputs = document.querySelectorAll('input');
const submitButton = document.querySelector('button');
const form = document.querySelector('form');
const errorMessageHolder = document.querySelector('#errorMessageHolder')

let submissionAttempt = false;
let validateResult = 0;

allInputs.forEach(input => {
    input.value = '';
})

document.addEventListener('click', () => {
    validateInputs();
})

document.addEventListener('keydown', (e) => {
    if (e.key === "Tab") {
        validateInputs();
    }
})


function validateInputs() {
    if(submissionAttempt === false){
        if(allInputs[0]!='' || allInputs[1]!='')
            namesValidate();
        if(allInputs[2]!='')
            emailValidate();
        if(allInputs[3]!='')
            phoneNumberValidate();
        if(allInputs[4]!='' ||allInputs[5]!='')
            passwordValidate();
    }    
    else{
        const name = namesValidate();
        const email = emailValidate();
        const pass = passwordValidate();
        const phn = phoneNumberValidate();
        return name && pass && email && phn;
    }
}

function validateBeforeSubmission(){
    submissionAttempt = true;
    validateResult = validateInputs();
}

function validateForm() {
    validateBeforeSubmission();
    if (validateResult) {
        errorMessageHolder.style.display = 'none';
        setTimeout(function(){alert('Form submitted!')}, 10);
        submissionAttempt = false;
        return true;
    }
    else {
        if (errorMessageHolder.childNodes.length === 0) {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "Errors detected. Please try again after fixing them.";
            errorMessage.style.color = 'rgb(218,27,27)'
            errorMessageHolder.append(errorMessage);
        }
        window.history.back();
        submissionAttempt = false;
        return false;
    }
}

function phoneNumberValidate() {
    let phoneNumber = allInputs[3];
    if (phoneNumber.value != '') {
        if (useRegexPhoneNumber(phoneNumber.value)) {
            checkPassedUpdateDisplay(phoneNumber);
            return 1;
        }
        else {
            errorUpdateDisplay(phoneNumber);
            return 0;
        }
    }
    else if (phoneNumber.value === '' && submissionAttempt === true) {
        errorUpdateDisplay(phoneNumber);
        return 0;
    }
}

function emailValidate() {
    const email = allInputs[2];
    if (email.value != '') {
        if (useRegexEmail(email.value)) {
            checkPassedUpdateDisplay(email);
            return 1;
        }
        else {
            errorUpdateDisplay(email);
            return 0;
        }
    }
    else if (email.value === '' && submissionAttempt === true) {
        errorUpdateDisplay(email);
        return 0;
    }
}

function passwordValidate() {
    const password1 = allInputs[4];
    const password2 = allInputs[5];
    if (password1.value !== '' && password2.value !== ''){
        if (password1.value !== password2.value) {
            errorUpdateDisplay(password1);
            errorUpdateDisplay(password2);
            return 0;
        }
        else {
            checkPassedUpdateDisplay(password1);
            checkPassedUpdateDisplay(password2);
            return 1;
        }
    }
    else if (password1.value === '' && password2.value === '' && submissionAttempt === true) {
        errorUpdateDisplay(password1);
        errorUpdateDisplay(password2);
        return 0;
    }
}

function namesValidate() {
    const firstName = allInputs[0];
    const lastName = allInputs[1];
    let result = nameIndividuallyValidate(firstName)*nameIndividuallyValidate(lastName);
    return result;
    
}

function nameIndividuallyValidate(input) {
    if (input.value !== '') {
        if (useRegexName(input.value)) {
            checkPassedUpdateDisplay(input);
            return 1;
        }
        else {
            errorUpdateDisplay(input);
            return 0;
        }
    }
    else if (input.value === '' && submissionAttempt === true) {
        errorUpdateDisplay(input);
        return 0;
    }
}

function useRegexName(input) {
    let regex = /^[A-Za-z]+$/;
    return regex.test(input);
}

// regex from https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript

function useRegexEmail(input) {
    let regex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
    return regex.test(input);
}

function useRegexPhoneNumber(input) {
    let regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    return regex.test(input);
}

function errorUpdateDisplay(input) {
    input.classList.add('error');
    input.classList.remove('checkPassed');
}

function checkPassedUpdateDisplay(input) {
    input.classList.add('checkPassed');
    input.classList.remove('error');
}