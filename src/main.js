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
let gameSpeed = 6;
let jumpStrength = 600;
let platformGap = 300;

//ui positions
let scoreX = game.config.width - 130;
let scoreY = 30;

let platformSpawnX = game.config.width * 1.5;
let platformSpawnY = game.config.height;

let wizardSpawnX = game.config.width / 4;
let wizardSpawnY = game.config.height - 200;

// reserve keyboard vars
let keyW, keyA, keyS, keyD, keySPACE;