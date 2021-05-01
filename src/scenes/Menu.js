class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
    }

    create() {
        game.sound.stopAll();

        let config = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 450
        }

        this.text = this.add.text(game.config.width / 2 - 100, game.config.height / 2 - 60, 'Last score: ' + score, config);
        this.text = this.add.text(game.config.width / 2 - 100, game.config.height / 2 - 30, 'Use W to jump, A to glide', config);
        this.text = this.add.text(game.config.width / 2 - 100, game.config.height / 2, 'Use S to slide, D to shoot', config);
        this.text = this.add.text(game.config.width / 2 - 100, game.config.height / 2 + 30, 'Press SPACE to start', config);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // reset values
        wizardSpawnX = game.config.width / 4;
        wizardSpawnY = game.config.height - 200;
        backgroundX = 0;
        gameSpeed = 10;
        jumpStrength = 600;
    }

    update() {
        // start game on spacebar press
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            game.settings = {
                gameTimer: 120000
            }
            score = 0;
            this.scene.start('playScene');
        }
    }
}