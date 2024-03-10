const template = document.querySelector('#new-user-card');
const wrapper = document.createDocumentFragment()
async function addNewUsers() {
    // const usersPromise = await fetch("/.netlify/functions/users");
    const usersPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
    const userData = await usersPromise.json();

    userData.forEach((user) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('#users-name').textContent = "Name: " + user.name;
        clone.querySelector('#users-email').textContent = "Email: " + user.email;
        clone.querySelector('#users-phone').textContent = "Phone: " + user.phone;
        clone.querySelector('#users-whatsapp').textContent = "Whatsapp: " + user.whatsapp;

        if (!user.photo) user.photo = "/img/fallback.jpg"

            clone.querySelector('.img-side img').src = user.photo;
        clone.querySelector('.img-side img').alt = `profile photo of ${user.name}`;
        wrapper.appendChild(clone);
    })

    document.querySelector(".added-user-list").appendChild(wrapper);


}
addNewUsers();