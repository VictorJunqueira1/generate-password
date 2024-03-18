const passwordInput = document.querySelector("#inputPassword");
const lengthInput = document.querySelector("#inputRange");
const lengthDisplay = document.querySelector('label[for="labelRange"]');
const generateButton = document.querySelector("#generateBtn");
const checkboxes = {
    lowerCase: document.querySelector("#lowerCase"),
    upperCase: document.querySelector("#upperCase"),
    numbers: document.querySelector("#numbers"),
    symbols: document.querySelector("#symbols")
};

const numbers = '0123456789'.split('');
const symbols = ['!', '@', '#', '$', '%'];

const lowerCaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97));
const upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());

updateLengthDisplay();

lengthInput.addEventListener("input", updateLengthDisplay);
generateButton.addEventListener("click", () => {
    const password = generatePassword(getPasswordOptions(), lengthInput.value);
    passwordInput.value = password;
});

function updateLengthDisplay() {
    lengthDisplay.innerHTML = lengthInput.value;
}

function getPasswordOptions() {
    return {
        includeNumbers: checkboxes.numbers.checked,
        includeSymbols: checkboxes.symbols.checked,
        includeLowerCase: checkboxes.lowerCase.checked,
        includeUpperCase: checkboxes.upperCase.checked
    };
}

function generatePassword(options, length) {
    const { includeNumbers, includeSymbols, includeLowerCase, includeUpperCase } = options;
    const charOptions = [
        ...(includeNumbers ? numbers : []),
        ...(includeSymbols ? symbols : []),
        ...(includeLowerCase ? lowerCaseLetters : []),
        ...(includeUpperCase ? upperCaseLetters : []),
    ];

    if (charOptions.length === 0) return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charOptions.length);
        password += charOptions[randomIndex];
    }
    return password;
}