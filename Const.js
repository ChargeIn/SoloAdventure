/**
 * Character parameter
 */
const run = 0;
const fight = 1;
const baseGold = 100;
const baseHealth = 100;
const baseAttack = 1;
const baseMagic = 10;
const baseSpeed = (canvas.width/2)/10; // with the base speed the adventurer should reach the enemy in 10 sec
const baseCrit = 0.1; // Base critical chance
const baseCritDMG = 1.5;
const baseAttackSpeed = 1;
const baseNumberOfEnemies = 1;
const critDMGMultiplier = 0.005;
const attackMultiplier = 1;
const attackSpeedMultiplier = 0.05;
const lifeMultiplier = 10;
const speedMultiplier = canvas.width/200;
const numberOfEnemiesMultiplier = 1;
const baseAnimationSpeed = 8; // how often the sprite should change each second
const animationSpeedMultiplier = 1;
const nCrit = 100; //Modifier for diminishing returns of the critical chance
const maxCrit = 0.5; // Max critical chance
const spawnOffsetX = [5, 10, 25, 20];
const spawnOffsetY = [10, 5, 1, 0];


/**
 * Game parameter
 */
// We want to achieve 60 fps a sec
const fps = 60;
const timeStep = 1000 / fps;
const canvas_h = canvas.height;
const canvas_w = canvas.width;
const char_w = 90;
const char_h = 70;
const spawnOffset = char_w - 20;
const fightOffset = 50;
const gameStats = {
    attack: baseSpeed,
    speed: baseSpeed,
    health: baseHealth,
    numberOfEnemies: baseNumberOfEnemies,
    crit: baseCrit,
    critDMG: baseCritDMG,
    magic: baseMagic,
    gold: 0,
    attackSpeed: baseAttackSpeed
};