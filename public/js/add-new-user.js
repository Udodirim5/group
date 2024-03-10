const selectedImgPrev = document.querySelector('#selected-img-prev');
const selectedImgInput = document.querySelector('#file-upload');
const imgPreview = document.querySelector('.img-preview');
const submitBtn = document.querySelector('#submit-btn');

selectedImgInput.addEventListener('change', () => {
    selectedImgPrev.src = URL.createObjectURL(selectedImgInput.files[0]);
    imgPreview.style.display = 'block';
});

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();


        if (isFormLocked) {
            return null;
        }

        isFormLocked = true


        const inputData = {
            fullName: document.getElementById("fullname").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            gender: document.getElementById("gender").value,
            dateOfBirth: document.getElementById("date_of_birth").value,
            password: document.getElementById("password").value,
            country: document.getElementById("country").value,
            stateProvince: document.getElementById("state").value,
            city: document.getElementById("city").value,
            phoneNumber: document.getElementById("phone").value,
            whatsapp: document.getElementById("whatsapp").value
        };

        // if (cloudinaryReturnedObject) {
        //     inputData.public_id = cloudinaryReturnedObject.public_id;
        //     inputData.version = cloudinaryReturnedObject.version;
        //     inputData.signature = cloudinaryReturnedObject.signature;
        // }

        // document.querySelector(`#add-new-pet-form`).classList.add("form-loading");

        const ourPromise = await fetch("/.netlify/functions/addNewUser", {
            method: "POST",
            body: JSON.stringify(inputData),
            headers: { "Content-Type": "application/json" },
        });

        const theRespnose = await ourPromise.json();

        if (theRespnose.success) {
            window.location = "/admin/admin-user";
        }
    });
