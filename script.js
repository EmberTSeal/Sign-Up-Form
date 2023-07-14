const allInputs = document.querySelectorAll('input');
const submitButton = document.querySelector('button');

allInputs.forEach(input => {
    input.value = '';
})

document.addEventListener('click', () => {
    validateForm();
})

submitButton.addEventListener('click', () =>{
    validateForm();
})


function validateForm(){
    passwordValidate();
    namesValidate();
    emailValidate();
    phoneNumberValidate();
}
// document.addEventListener('keydown', e => {
//     if (e.key === 'Tab') {
//         const focused = document.querySelector(':focus');
//         console.log(focused);
//     }
// })

function phoneNumberValidate(){
    let phoneNumber = allInputs[3];
    if(phoneNumber.value!=''){
        if(useRegexPhoneNumber(phoneNumber.value)){
            phoneNumber.classList.add('checkPassed');
            phoneNumber.classList.remove('error');
        }
        else{
            phoneNumber.classList.add('error');
            phoneNumber.classList.remove('checkPassed');
        }
    }

}

function emailValidate() {
    const email = allInputs[2];
    if (email.value != '') {
        if (useRegexEmail(email.value)) {
            email.classList.add('checkPassed');
            email.classList.remove('error');
        }
        else {
            email.classList.add('error');
            email.classList.remove('checkPassed');
        }
    }
}

function passwordValidate() {
    const password1 = allInputs[4];
    const password2 = allInputs[5];
    if (password1.value != '' && password2.value != '') {
        if (password1.value != password2.value) {
            password1.classList.add('error');
            password1.classList.remove('checkPassed');
            password2.classList.add('error');
            password2.classList.remove('checkPassed');
        }
        else {
            password1.classList.remove('error');
            password1.classList.add('checkPassed');
            password2.classList.remove('error');
            password2.classList.add('checkPassed');
        }
    }
}

function namesValidate() {
    const firstName = allInputs[0];
    const lastName = allInputs[1];
    if (firstName.value != '') {
        if (useRegexName(firstName.value)) {
            firstName.classList.add('checkPassed');
        }
        else {
            firstName.classList.remove('checkPassed');
            firstName.classList.add('error');
        }
    }
    if (lastName.value != '') {
        if (useRegexName(lastName.value)) {
            lastName.classList.add('checkPassed');
        }
        else {
            lastName.classList.remove('checkPassed');
            lastName.classList.add('error');
        }
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

function useRegexPhoneNumber(input){
    let regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/   
    return regex.test(input);
}