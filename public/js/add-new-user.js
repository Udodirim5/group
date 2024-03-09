let fullName;
let username;
let email;
let dateOfBirth;
let password;
let country;
let stateProvince;
let city;
let phoneNumber;
let whatsapp;

const selectedImgPrev = document.querySelector('#selected-img-prev');
const selectedImgInput = document.querySelector('#file-upload');
const imgPreview = document.querySelector('.img-preview');
const submitBtn = document.querySelector('#submit-btn');

selectedImgInput.addEventListener('change', () => {
    selectedImgPrev.src = URL.createObjectURL(selectedImgInput.files[0]);
    imgPreview.style.display = 'block';
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Retrieve input values
    fullName = document.getElementById("fullname").value;
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    dateOfBirth = document.getElementById("date_of_birth").value;
    password = document.getElementById("password").value;
    country = document.getElementById("country").value;
    stateProvince = document.getElementById("state").value;
    city = document.getElementById("city").value;
    phoneNumber = document.getElementById("phone").value;
    whatsapp = document.getElementById("whatsapp").value;

    // Reset error messages
    document.getElementById("error_fullname").textContent = "";
    document.getElementById("error_username").textContent = "";
    document.getElementById("error_email").textContent = "";
    document.getElementById("error_date_of_birth").textContent = "";
    document.getElementById("error_password").textContent = "";
    document.getElementById("error_country").textContent = "";
    document.getElementById("error_state").textContent = "";
    document.getElementById("error_city").textContent = "";
    document.getElementById("error_phone").textContent = "";
    document.getElementById("error_whatsapp").textContent = "";

    // Validate each input field
    const errors = [];
    if (fullName.trim() === "") {
        errors.push("Please enter your Full Name.");
    }
    if (username.trim() === "") {
        errors.push("Please enter your username.");
    }
    if (email.trim() === "") {
        errors.push("Please enter your Email.");
    }
    if (dateOfBirth.trim() === "") {
        errors.push("Please enter your date of birth.");
    }
    if (password.trim() === "") {
        errors.push("Please enter your password.");
    }
    if (country.trim() === "") {
        errors.push("Please enter your country.");
    }
    if (stateProvince.trim() === "") {
        errors.push("Please enter your state.");
    }
    if (city.trim() === "") {
        errors.push("Please enter your city.");
    }
    if (phoneNumber.trim() === "") {
        errors.push("Please enter your phone number.");
    }
    if (whatsapp.trim() === "") {
        errors.push("Please enter your whatsapp number.");
    }

    // Display errors if any
    if (errors.length > 0) {
        errors.forEach(error => {
            // Create a new error message element and append it to the corresponding error container
            const errorMessage = document.createElement("div");
            errorMessage.textContent = error;
            errorMessage.classList.add("error-message");
            document.getElementById(`error_${error.split(" ")[2].toLowerCase()}`).appendChild(errorMessage);
        });
    } else {
        // All inputs are valid, proceed with your logic here
        const inputData = {
            fullName,
            username,
            email,
            dateOfBirth,
            password,
            country,
            stateProvince,
            city,
            phoneNumber,
            whatsapp
        };
        console.log(inputData);

    }
    
    // Disable the button if any required field is empty
    if (fullName === "" || username === "" || email === "" || dateOfBirth === "" || password === "" || country === "" || stateProvince === "" || city === "" || phoneNumber === "" || whatsapp === "") {
        submitBtn.disabled = true;
    }
});
