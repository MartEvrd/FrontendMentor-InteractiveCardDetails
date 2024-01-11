
function isNumber(char) {
    return /^\d$/.test(char);
}

function isNameAllowed(char) {
    return /[a-zA-ZÀ-ÖØ-öø-ÿ '-]/.test(char);
}

function showErrMsg(errMsg, input){
    errMsg.classList.add('show-msg');
    input.blur();
    input.classList.add('errShake');
    setTimeout(() => {
        input.classList.remove('errShake');
        input.focus();
    }, 500);
    setTimeout(() => {
        errMsg.classList.remove('show-msg');
    }, 3500);
}

const form = document.getElementById("cardForm");
const confirmation = document.getElementById("confirmationContainer");
function submitForm(event) {
    event.preventDefault();
    form.classList.add("hide");
    confirmation.classList.remove("hide");
}
form.addEventListener('submit', submitForm);

// * Card Name
const defaultVisualNameValue = "MARTIN EVRARD";
const cardNameInput = document.getElementById("card-name");
const cardNameVisual = document.querySelector(".card-container__front--name");
const cardNameErrMsgFormat = document.getElementById("errMess-nameFormat");
const cardNameErrMsgLength = document.getElementById("errMess-nameLength");

cardNameInput.addEventListener('input', function(event) {
    let currentInput = event.target.value;
    
    // Removing all non-allowed characters (only letters including accents, spaces, "-" and " ' "
    let cardName = event.target.value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ '-]/g, ''); 
    // Replaces all lowerCase letters to upperCase
    cardName = cardName.toUpperCase();
    // Limited lenght of Credit card name (21 according to MasterCard rules)
    cardName = cardName.slice(0, 21); 

    // Updating input value to visualy apply previous filters
    event.target.value = cardName;

    if(currentInput.length > 20){
        if(!isNameAllowed(currentInput.charAt(currentInput.length - 1))){
            showErrMsg(cardNameErrMsgFormat, cardNameInput);
        }
        showErrMsg(cardNameErrMsgLength, cardNameInput);
    } else if (currentInput.length > 0 && !isNameAllowed(currentInput.charAt(currentInput.length - 1))) {
        showErrMsg(cardNameErrMsgFormat, cardNameInput);

    }

    // Updating name on visual card
    if(cardName === ""){
        cardNameVisual.textContent = defaultVisualNameValue;
    } else {
        cardNameVisual.textContent = cardName;
    }

})

// * Card Number
const defaultVisualNumberValue = "0000 0000 0000 0000";
const cardNumberInput = document.getElementById("card-number");
const cardNumberVisual = document.querySelector(".card-container__front--number");
const cardNumberErrMsgFormat = document.getElementById("errMess-numFormat");
const cardNumberErrMsgLength = document.getElementById("errMess-numLength");

cardNumberInput.addEventListener('input', function(event) {

    let currentInput = event.target.value;
    let currentInputUnspace = currentInput.split(" ").join("");

    // Removing all non allowed caracters (only digits)
    let cardNumber = event.target.value.replace(/[^\d]/g, '');
    // Limited lenght of numbers (16)
    cardNumber = cardNumber.slice(0, 16);
    // Add space after each 4 digits
    cardNumber = cardNumber.replace(/(.{4})/g, '$1 ').trim();

    // Updating input value to visualy apply previous filters
    event.target.value = cardNumber;

    if(currentInputUnspace.length > 16) {
        if(!isNumber(currentInputUnspace.charAt(currentInputUnspace.length - 1))){
            showErrMsg(cardNumberErrMsgFormat, cardNumberInput);
        }
        showErrMsg(cardNumberErrMsgLength, cardNumberInput);
    } else if (currentInputUnspace.length > 0 && !isNumber(currentInputUnspace.charAt(currentInputUnspace.length - 1))) {
        showErrMsg(cardNumberErrMsgFormat, cardNumberInput);
    }

    // Updating value of number on visual card
    if(cardNumber === ""){
        cardNumberVisual.textContent = defaultVisualNumberValue;
    } else {
        cardNumberVisual.textContent = cardNumber;
    }
});

// * Card expiration date
const defaultVisualDateValue = "00";
const cardDateMonthInput = document.getElementById("card-month");
const cardDateYearInput = document.getElementById("card-year");
const cardDateVisual = document.querySelector(".card-container__front--date");
const cardDateErrMsgFormat = document.getElementById("errMess-dateFormat");
const cardDateErrMsgLength = document.getElementById("errMess-dateLength");
const cardDateErrMsgMonthFormat = document.getElementById("errMess-dateMonthFormat");
const cardDateErrMsgYearFormat = document.getElementById("errMess-dateYearFormat");

function convertDateMonthFormat(value) {
    // Allowing only digits and limiting the length to 2 characters
    let cardDate = value.replace(/[^\d]/g, '').slice(0, 2);
    
    // Block the first character if it's not 0 or 1
    if (cardDate.length > 0 && cardDate[0] !== '0' && cardDate[0] !== '1') {
        showErrMsg(cardDateErrMsgMonthFormat, cardDateMonthInput);
        cardDate = cardDate.slice(1); // Remove the first character
    }

    // Block the second character according to its first value
    if (cardDate.length > 1){
        if(cardDate[0] == '1' && cardDate[1] != '0' && cardDate[1] != '1' && cardDate[1] != '2'){
            cardDate = cardDate.slice(0,1); // Remove the second character
        }
        if(cardDate[0] == '0' && cardDate[1] == '0'){
            cardDate = cardDate.slice(0,1); // Remove the second character
        }
    }
    return cardDate;
}

function convertDateYearFormat(value) {
    // Allowing only digits and limiting the length to 2 characters
    let cardDate = value.replace(/[^\d]/g, '').slice(0, 2);
    
    // Block the first character if it's not between 2 and 5
    if (cardDate.length > 0 && !['2', '3', '4', '5'].includes(cardDate[0])) {
        showErrMsg(cardDateErrMsgYearFormat, cardDateYearInput);
        cardDate = cardDate.slice(1); // Remove the first character
    }
    if (cardDate.length > 1 && cardDate[0] == '5' && cardDate[1] != '0'){
        showErrMsg(cardDateErrMsgYearFormat, cardDateYearInput);
        cardDate = cardDate.slice(0,1); // Remove the second character
    }
    return cardDate;
}

cardDateMonthInput.addEventListener('input', function(event) {
    let currentInput = event.target.value;
    // Applying rules for input format (only 2 digits allowed)
    event.target.value = convertDateMonthFormat(event.target.value);
    let cardMonth = event.target.value;

    if(currentInput.length > 2) {
        if(!isNumber(currentInput.charAt(currentInput.length - 1))){
            showErrMsg(cardDateErrMsgFormat, cardDateMonthInput);
        }
        showErrMsg(cardDateErrMsgLength, cardDateMonthInput);
    } else if (currentInput.length > 0 && !isNumber(currentInput.charAt(currentInput.length - 1))) {
        showErrMsg(cardDateErrMsgFormat, cardDateMonthInput);
    }

    if(cardMonth === ""){
        cardDateVisual.textContent = defaultVisualDateValue.concat(
            cardDateVisual.textContent.substring(cardDateVisual.textContent.length - 3));
    } else {
        cardDateVisual.textContent = cardMonth.padStart(2, '0').concat(
            cardDateVisual.textContent.substring(cardDateVisual.textContent.length - 3));
    }

});

cardDateYearInput.addEventListener('input', function(event) {
    let currentInput = event.target.value;
    // Applying rules for input format (only 2 digits allowed)
    event.target.value = convertDateYearFormat(event.target.value);
    let cardYear = event.target.value;


    if(currentInput.length > 2) {
        if(!isNumber(currentInput.charAt(currentInput.length - 1))){
            showErrMsg(cardDateErrMsgFormat, cardDateYearInput);
        }
        showErrMsg(cardDateErrMsgLength, cardDateYearInput);
    } else if (currentInput.length > 0 && !isNumber(currentInput.charAt(currentInput.length - 1))) {
        showErrMsg(cardDateErrMsgFormat, cardDateYearInput);
    }

    if(cardYear === ""){
        cardDateVisual.textContent = cardDateVisual.textContent.substring(0,3).concat(defaultVisualDateValue);
    } else {
        cardDateVisual.textContent = cardDateVisual.textContent.substring(0,3).concat(cardYear);
    }
});


// * Card code

const defaultVisualCodeValue = "000";
const cardCodeInput = document.getElementById("card-code");
const cardCodeVisual = document.querySelector(".card-container__back--code");
const cardCodeErrMsgFormat = document.getElementById("errMess-codeFormat");
const cardCodeErrMsgLength = document.getElementById("errMess-codeLength");

cardCodeInput.addEventListener('input', function(event) {
    let currentInput = event.target.value;

    // Removing all non allowed caracters (only digits)
    let cardCode = event.target.value.replace(/[^\d]/g, '');
    // Limited lenght of numbers (3)
    cardCode = cardCode.slice(0, 3);
    // Updating input value to visualy apply previous filters
    event.target.value = cardCode;

    if(currentInput.length > 3) {
        if(!isNumber(currentInput.charAt(currentInput.length - 1))){
            showErrMsg(cardCodeErrMsgFormat, cardCodeInput);
        }
        showErrMsg(cardCodeErrMsgLength, cardCodeInput);
    } else if (currentInput.length > 0 && !isNumber(currentInput.charAt(currentInput.length - 1))) {
        showErrMsg(cardCodeErrMsgFormat, cardCodeInput);
    }

    // Updating value of number on visual card
    if(cardCode === ""){
        cardCodeVisual.textContent = defaultVisualCodeValue;
    } else {
        cardCodeVisual.textContent = cardCode;
    }
})

// * Confirmation button to initialize app

function initializeVisuals(){
    cardCodeVisual.textContent = defaultVisualCodeValue;
    cardDateVisual.textContent = defaultVisualDateValue+"/"+defaultVisualDateValue;
    cardNumberVisual.textContent = defaultVisualNumberValue;
    cardNameVisual.textContent = defaultVisualNameValue;
}

const exitButton = document.getElementById("exitButton");
exitButton.addEventListener('click', (event) => {
    location.reload();
})
