document.addEventListener("DOMContentLoaded", function () {
    const selectedImgPrev = document.querySelector('#selected-img-prev');
    const selectedImgInput = document.querySelector('#file-upload');
    const imgPreview = document.querySelector('.img-preview');
    const submitBtn = document.querySelector('#submit-btn');

    selectedImgInput.addEventListener('change', () => {
        selectedImgPrev.src = URL.createObjectURL(selectedImgInput.files[0]);
        imgPreview.style.display = 'block';
    });



    submitBtn.addEventListener('click', async function (event) {
        event.preventDefault();


        // if (cloudinaryReturnedObject) {
        //     inputData.public_id = cloudinaryReturnedObject.public_id;
        //     inputData.version = cloudinaryReturnedObject.version;
        //     inputData.signature = cloudinaryReturnedObject.signature;
        // }

        // document.querySelector(`#add-new-pet-form`).classList.add("form-loading");



        const fullname = document.getElementById("fullname").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const gender = document.getElementById("gender").value;
        const dateOfBirth = document.getElementById("date_of_birth").value;
        const password = document.getElementById("password").value;
        const country = document.getElementById("country").value;
        const stateProvince = document.getElementById("state").value;
        const city = document.getElementById("city").value;
        const phone = document.getElementById("phone").value;
        const whatsapp = document.getElementById("whatsapp").value;

        const inputData = {
            fullname,
            username,
            email,
            gender,
            dateOfBirth,
            password,
            country,
            stateProvince,
            city,
            phone,
            whatsapp,
        };

        try {
            const ourPromise = await fetch('/.netlify/functions/createNewUser', {
                method: 'POST',
                body: JSON.stringify(inputData),
                headers: { 'Content-Type': 'application/json' },
            });

            const theResponse = await ourPromise.json();

            if (theResponse.success) {
                window.location = theResponse.redirectTo;
                console.log('User added successfully');
            } else {
                console.error('Failed to add user:', theResponse.error);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    });
});
