const adminCredentials = {
    username: "admin",
    password: "admin"
};

const logInBtn = document.getElementById("login-btn");

logInBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const userName = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (userName === "" || password === "") {
        alert("Please enter both username and password!");
    } else if (userName === adminCredentials.username && password === adminCredentials.password) {
        window.location.href = "/admin/dashboard";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});
