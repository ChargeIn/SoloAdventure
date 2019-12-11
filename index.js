
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
    document.getElementById("Stat_Attack").innerText = "Attack: " + mainLoop.adventurer.attack;
    document.getElementById("Stat_AttackSpeed").innerText = "Attack Speed: " + mainLoop.adventurer.attackSpeed;
    document.getElementById("Stat_Speed").innerText = "Running Speed: " + mainLoop.enemy.speed;
    document.getElementById("Stat_Crit").innerText = "Critical Strike Chance: " + mainLoop.adventurer.crit;
    document.getElementById("Stat_CritDMG").innerText = "Critical Strike Damage: " + mainLoop.adventurer.critDMG;
    document.getElementById("Stat_Magic").innerText = "Magic: " + mainLoop.adventurer.magic;
    document.getElementById("Stat_Health").innerText = "Health per Enemy: " + mainLoop.enemy.hp;
    document.getElementById("Stat_NumberOfEnemies").innerText = "Number of Enemies: " + mainLoop.enemy.numberOfEnemies;
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