const round = 100; // The Zeros indicate the number of decimals to show in the ui
const main_screen = {
    floor:  canvas.height -10,
    middle: canvas.width/2
};
let dpsView = document.getElementById("DPS");
let mainLoop = new gameModel();
mainLoop.start();
increase(""); // Updates the DPS


function go2google() {
    window.location.href="https://www.google.de"
}

/**
 * Increases the given attribute by 1 and updates the view
 * @param attr The attribute as string
 */
function increase(attr){
    mainLoop.modifyAttribute(attr, 10);

    updateInfoBar();
    updateCharacterStats();
}

/**
 * Updates the view for the character Stats;
 */
function updateCharacterStats(){
    document.getElementById("Stat_Attack").innerText = "Attack: " + Math.round(mainLoop.adventurer.attack*round) /round;
    document.getElementById("Stat_AttackSpeed").innerText = "Attack Speed: " + Math.round(mainLoop.adventurer.attackSpeed*round) /round;
    document.getElementById("Stat_Speed").innerText = "Running Speed: " + Math.round(mainLoop.enemy.speed*round) /round;
    document.getElementById("Stat_Crit").innerText = "Critical Strike Chance: " + Math.round(mainLoop.adventurer.crit*round) /round;
    document.getElementById("Stat_CritDMG").innerText = "Critical Strike Damage: " + Math.round(mainLoop.adventurer.critDMG*round) /round;
    document.getElementById("Stat_Magic").innerText = "Magic: " + Math.round(mainLoop.adventurer.magic*round) /round;
    document.getElementById("Stat_Health").innerText = "Health per Enemy: " + Math.round(mainLoop.enemy.maxHp*round) /round;
    document.getElementById("Stat_NumberOfEnemies").innerText = "Number of Enemies: " + Math.round(mainLoop.enemy.numberOfEnemies*round) /round;
}

/**
 * Updates the information of the info-bar
 */
function updateInfoBar(){
    //update DPS view
    dpsView.innerText = "DPS: " + mainLoop.getCurrentDPS().toFixed(4);
    document.getElementById("Gold").innerText = "Gold: " + gameStats.gold;

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