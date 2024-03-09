document
    .querySelector("#logout")
    .addEventListener("click", async function (event) {
        event.preventDefault(); // prevent form submit for this case
        const ourPromise = await fetch("/.netlify/functions/logout").then(() => {
            window.location = "/";
        });
    });
