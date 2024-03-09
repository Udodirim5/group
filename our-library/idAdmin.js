const cookie = require('cookie');

function isAdmin(event) {
    const incomingCookies = cookie.parse(event.headers.cookie || "");

    if (incomingCookies?.group == "Jm3bKp9HxR6aZvTnQc8gYsU4Fw2EoDlI7qVzWfNtXyL5dArP0uC1SjGhOeMkBi") {
        return true
    }
    return false;
}

module.exports = isAdmin