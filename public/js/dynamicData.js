const template = document.querySelector('#new-user-card');
const wrapper = document.createDocumentFragment();

async function addNewUsers() {
    try {
        const usersPromise = await fetch("https://dps-group.netlify.app/.netlify/functions/addUser");
        const userData = await usersPromise.json();

        userData.forEach((user) => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('#users-name').textContent = "Name: " + user.fullname;
            clone.querySelector('#users-email').textContent = "Email: " + user.email;
            clone.querySelector('#users-phone').textContent = "Phone: " + user.phone;
            clone.querySelector('#users-whatsapp').textContent = "Whatsapp: " + user.whatsapp;

            if (!user.photo) user.photo = "/img/fallback.jpg";

            clone.querySelector('.img-side img').src = user.photo;
            clone.querySelector('.img-side img').alt = `profile photo of ${user.name}`;
            clone.querySelector('.img-view img').src = user.photo;
            clone.querySelector('.img-view img').alt = `profile photo of ${user.name}`;

            clone.querySelector('#view-users-name').textContent = user.fullname;
            clone.querySelector('#view-users-email').textContent = user.email;
            clone.querySelector('#view-users-gender').textContent = user.gender;
            clone.querySelector('#view-users-uname').textContent = user.username;
            clone.querySelector('#view-users-country').textContent = user.country;
            clone.querySelector('#view-users-state').textContent = user.stateProvince;
            clone.querySelector('#view-users-city').textContent = user.city;
            clone.querySelector('#view-users-phone').textContent = user.phone;
            clone.querySelector('#view-users-whatsapp').textContent = user.whatsapp;

            // Append the clone to the wrapper
            wrapper.appendChild(clone);
        });

        // Append the wrapper to the DOM
        document.querySelector(".added-user-list").appendChild(wrapper);

        // Bind event listeners for each cloned item
        bindEventListeners();
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Function to bind event listeners for each cloned item
function bindEventListeners() {
    const openOverlayButtons = document.querySelectorAll("#open-overlay");
    const closeButtons = document.querySelectorAll("#closeBtn");

    openOverlayButtons.forEach((openOverlayButton, index) => {
        const closeBtn = closeButtons[index];
        const viewOverlay = document.querySelectorAll(".view-overlay")[index];

        openOverlayButton.addEventListener("click", () => {
            viewOverlay.classList.add("is-visible");
        });

        closeBtn.addEventListener('click', () => {
            viewOverlay.classList.remove("is-visible");
        });
    });
}

// Call the function to fetch and add users
addNewUsers();
