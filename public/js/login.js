let adminPwd = "admin"
let adminUsername = "admin"
let userName = document.getElementById("username").value.trim();
let password = document.getElementById("password").value.trim();
let logInBtn = document.getElementById("login-btn")

if(userName == "" || password == ""){
    alert("Please enter both username and password!");
}else if (userName == adminUsername && password == adminPwd){
    logInBtn.addEventListener('click', (e) => {
        e.preventDefault()
        
        window.location.href="/admin/dashboard";
    })
    
} 
