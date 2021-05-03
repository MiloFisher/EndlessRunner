// HEADER
// Group:           Milo Fisher, Bill Wong, Zirui Li, Mark Wolverton
// Game Title:      Wizard Run
// Completed On:    5/22/21
// Creative Tilt:   
// Programming wise, I am proud of the scaling traps, meaning that as the game gets faster, the traps' timings will still be correct, ex: the closing door will always leave just enough room to slide under, regardless of game speed
// Visually, I am proud of the music that increases in tempo the faster the game gets. It really hypes the player up to react faster as the game becomes more difficult

// Note:  We made all of our own assets, including sound fx, music, and art

let config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
//global variables
let score = 0;                  // starting score   
let gameSpeed = 0;              // set in Menu.js
let jumpStrength = 0;           // set in Menu.js
let glideVelocity = 75;         // falling speed while gliding (75)
let fireballSpeed = 6;          // speed fireballs travel at (6)
let shootAnimation = 250;       // duration of the shooting animation (250)
let shootCooldown = 1;          // set in Play.js
let gameOver = false;           
let chunkOverlap = 2;           // overlap between generated chunks (2)
let chunksPerLevel = 10;        // starting amount of chunks per level
let gravityMod = 1;             // set in Play.js

//ui positions
let scoreX = game.config.width - 130;
let scoreY = 30;

let platformSpawnX = game.config.width * 1.5;
let platformSpawnY = game.config.height - 64;

let trapSpawnX = game.config.width * 1.5;
let trapSpawnY = game.config.height + 400;

let trapActiveX = game.config.width * .9;
let trapActiveY = game.config.height - 160;

let doorSpawnX = game.config.width * 1.5;
let doorSpawnY = -300;

let ceilingSpawnX = doorSpawnX;
let ceilingSpawnY = -100;

let barrelSpawnX = game.config.width * 1.5;
let barrelSpawnY = game.config.height - 230;

let wizardSpawnX = game.config.width / 4;
let wizardSpawnY = game.config.height - 200;

let backgroundX = 0;

// reserve keyboard vars
let keyW, keyA, keyS, keyD, keySPACE, keyL;