class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        // this.load.audio('name', './assets/name.wav');
    }

    create() {
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
            fixedWidth: 350
        }

        this.text1 = this.add.text(game.config.width / 2 - 100, game.config.height/2 + 30, 'Press SPACE to start', config);
        this.text2 = this.add.text(game.config.width / 2 - 100, game.config.height / 2, 'Use W to jump, A to glide', config);
        this.text2 = this.add.text(game.config.width / 2 - 100, game.config.height / 2 - 30, 'Last score: ' + score, config);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // start game on spacebar press
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            game.settings = {
                gameTimer: 120000
            }
            // play sound and load scene
            // this.sound.play('name');
            score = 0;
            this.scene.start('playScene');
        }
    }
}