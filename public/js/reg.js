let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector(".verification").style.zIndex = '10';
});
