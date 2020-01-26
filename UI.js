const digits = 2; // number of decimals to show
const main_screen = {
    floor:  canvas.height -10,
    middle: canvas.width/2
};

/**
 * Callback for plus buttons
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
    document.getElementById("Stat_Attack").innerText = "Attack: " + mainLoop.adventurer.attack.toFixed(digits);
    document.getElementById("Stat_AttackSpeed").innerText = "Attack Speed: " + mainLoop.enemy.speed.toFixed(digits);
    document.getElementById("Stat_Crit").innerText = "Critical Strike Chance: " + mainLoop.adventurer.crit.toFixed(digits);
    document.getElementById("Stat_CritDMG").innerText = "Critical Strike Damage: " + mainLoop.adventurer.critDMG.toFixed(digits);
    document.getElementById("Stat_Magic").innerText = "Magic: " + mainLoop.adventurer.magic.toFixed(digits);
    document.getElementById("Stat_Health").innerText = "Health per Enemy: " + mainLoop.enemy.maxHp.toFixed(digits);
    document.getElementById("Stat_NumberOfEnemies").innerText = "Number of Enemies: " + mainLoop.enemy.numberOfEnemies.toFixed(digits);
}

/**
 * Updates the information of the info-bar
 */
function updateInfoBar() {
    //update DPS view
    document.getElementById("DPS").innerText = "DPS: " + mainLoop.getCurrentDPS().toFixed(4);
    document.getElementById("Gold").innerText = "Gold: " + gameStats.gold;
}

