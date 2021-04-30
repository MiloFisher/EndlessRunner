let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 980 },
            debug: false
        }
    },
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
//global variables
let score =  0;
let gameSpeed = 10;
let jumpStrength = 600;
let glideVelocity = 75;
let fireballSpeed = 6;
let shootAnimation = 250;
let shootCooldown = 1000;
let platformGap = 300;
let gameOver = false;

//ui positions
let scoreX = game.config.width - 130;
let scoreY = 30;

let platformSpawnX = game.config.width * 1.5;
let platformSpawnY = game.config.height - 64;

let trapSpawnX = game.config.width * 1.5;
let trapSpawnY = game.config.height + 400;

let trapActiveX = 100;
let trapActiveY = game.config.height - 160;

let doorSpawnX = game.config.width * 1.5;
let doorSpawnY = -300;

let ceilingSpawnX = doorSpawnX;
let ceilingSpawnY = -100;

let barrelSpawnX = game.config.width * 1.5;
let barrelSpawnY = game.config.height - 230;

let wizardSpawnX = game.config.width / 4;
let wizardSpawnY = game.config.height - 200;

// reserve keyboard vars
let keyW, keyA, keyS, keyD, keySPACE;