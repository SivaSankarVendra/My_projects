const form = document.querySelector('form');

const clearErrors = () => {
  const errorNotes = document.getElementsByClassName('errornote');
  for (const errorNote of errorNotes) {
    errorNote.innerHTML = '';
  }
};

const setError = (id, error) => {
  let element = document.getElementById(id);
  element.getElementsByClassName('errornote')[0].innerHTML = error;
};

const validateForm = (event) => {
  event.preventDefault();
  clearErrors();

  const fullname = document.getElementById('Inputfullname').value;
  const email = document.getElementById('InputEmail').value;
  const phone = document.getElementById('Inputphone').value;
  const password = document.getElementById('InputPassword').value;
  const confirmPassword = document.getElementById('InputPassword2').value;

  let isValid = true;

  if (fullname.length < 5) {
    setError("fullname", "**Characters must be at least 5");
    isValid = false;
  }

  if (!email.includes("@")) {
    setError("Email", "**Incorrect email");
  }
  if (/[A-Z]/.test(email)) {
    setError("Email", "**Email should contain small letters ");
    isValid = false;
  }
  // checks if phone number is 10 digits or not
  if (phone.length !== 10) {
    setError("phone", "**Phone number must be 10 digits");
    isValid = false;
  }
  // checks if phone number contains characters
  if (/[a-zA-Z]/.test(phone)) {
    setError("phone", "**Incorrect phone number");
    isValid = false;
  }
  // Checks password length and other conditions
  if (
    password.toLowerCase() === "password" ||
    password.toLowerCase() === fullname ||
    password.length < 8
  ) {
    setError("Password", "**Weak password");
    isValid = false;
  }

  // Password and confirm password validation
  if (password !== confirmPassword) {
    setError("Password2", "**Passwords do not match");
    isValid = false;
  }

  if (isValid) {
    form.submit();
  }
};

form.addEventListener('submit', validateForm);

const showPassword = document.getElementById('showPassword');
const passwordInput = document.getElementById('InputPassword');
const confirmPasswordInput = document.getElementById('InputPassword2');

const togglePasswordVisibility = () => {
  let passwordType = showPassword.checked ? 'text' : 'password';
  passwordInput.type = passwordType;
  confirmPasswordInput.type = passwordType;
};

showPassword.addEventListener('change', togglePasswordVisibility);
