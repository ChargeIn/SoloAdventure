let mainLoop = new gameModel();
mainLoop.start();
increase("");

function go2google() {
    window.location.href="https://www.google.de"
}

/**
 * Cookie Section
 */

/**
 * Sets a cookie to save the current game-information
 */
function saveGame(exdays) {
    let d = new Date();
    d.setTime(d.currentTime + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    document.cookie = "cookie=v0.1;" + expires+ ";path=/";
}

/**
 * Loads the right cookie
 * @param cname Name of the cookie
 * @returns {string}
 */
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}