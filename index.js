const form = document.getElementById("form");
const country = document.getElementById("country");
const postalCode = document.getElementById("postal-code");
const mail = document.getElementById("mail");
const password = document.getElementById("password");
const password1 = document.getElementById("password1");
const successMessage = document.getElementById("success-message");

country.addEventListener("input", checkCountry);
country.addEventListener("change", checkPostalCode);
postalCode.addEventListener("input", checkPostalCode);
mail.addEventListener("input", checkMail);
password.addEventListener("input", checkPassword);
password1.addEventListener("input", doubleCheckPassword);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const isCountryValid = checkCountry();
  const isPostalCodeValid = checkPostalCode();
  const isEmailValid = checkMail();
  const isPasswordValid = checkPassword();
  const isPassword1Valid = doubleCheckPassword();

  if (
    isCountryValid &&
    isPostalCodeValid &&
    isEmailValid &&
    isPasswordValid &&
    isPassword1Valid
  ) {
    successMessage.style.display = "block";
    setTimeout(() => {
      form.reset();
      successMessage.style.display = "none";
      document.querySelectorAll("select, input").forEach((control) => {
        control.classList.remove("success", "error");
      });
    }, 5000);
  }
});

function checkCountry() {
  const errorSpan = document.querySelector(".country-error");

  if (country.value === "") {
    showError(errorSpan, "Country is required");
    country.className = "error";
    return false;
  }
  removeError(errorSpan);
  country.className = "success";
  return true;
}

function checkPostalCode() {
  const selectedCountry = country.value;
  const errorSpan = document.querySelector(".postal-code-error");

  const constraints = {
    cn: [
      "^(CN-)?\\d{4}$",
      "China postal codes must have exactly 4 digits: e.g. CN-1950 or 1950",
    ],
    jp: [
      "^(JP-)?\\d{4}$",
      "Japan postal codes must have exactly 4 digits: e.g. JP-1950 or 1950",
    ],
    kr: [
      "^(KR-)?\\d{4}$",
      "South Korea postal codes must have exactly 4 digits: e.g. KR-1950 or 1950",
    ],
    ind: [
      "^(IND-)?\\d{4}$",
      "India postal codes must have exactly 4 digits: e.g. IND-1950 or 1950",
    ],
  };

  // Check if no country is selected first
  if (!selectedCountry) {
    showError(errorSpan, "Please select a country");
    postalCode.className = "error";
    return false;
  }

  // Check if postal code is empty
  if (postalCode.value === "") {
    showError(errorSpan, "Postal code is required");
    postalCode.className = "error";
    return false;
  }

  // Now we can safely access constraints[selectedCountry]
  const constraint = new RegExp(constraints[selectedCountry][0], "");

  if (constraint.test(postalCode.value)) {
    removeError(errorSpan);
    postalCode.className = "success";

    return true;
  } else {
    showError(errorSpan, constraints[selectedCountry][1]);
    postalCode.className = "error";
    return false;
  }
}

function checkMail() {
  const errorSpan = document.querySelector(".mail-error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (mail.value === "") {
    showError(errorSpan, "Email is required");
    mail.className = "error";
    return false;
  }
  if (!emailRegex.test(mail.value)) {
    showError(errorSpan, "Please enter a valid email");
    mail.className = "error";
    return false;
  }

  removeError(errorSpan);
  mail.className = "success";
  return true;
}

function checkPassword() {
  const errorSpan = document.querySelector(".password-error");
  const constraint = new RegExp("^\\w{8,20}$", "");

  if (password.value === "") {
    showError(errorSpan, "Password is required");
    password.className = "error";
    return false;
  }

  if (!constraint.test(password.value)) {
    showError(errorSpan, "Password must be between 8 and 20 characters");
    password.className = "error";
    return false;
  }

  removeError(errorSpan);
  password.className = "success";
  return true;
}

function doubleCheckPassword() {
  const errorSpan = document.querySelector(".password1-error");

  if (password1.value === "") {
    showError(errorSpan, "Please confirm your password");
    password1.className = "error";
    return false;
  }

  if (password.value !== password1.value) {
    showError(errorSpan, "Passwords don't match");
    password1.className = "error";
    return false;
  }

  removeError(errorSpan);
  password1.className = "success";
  return true;
}

function removeError(element) {
  element.textContent = "";
}

function showError(element, value) {
  element.textContent = value;
}
