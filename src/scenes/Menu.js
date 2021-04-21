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
            fixedWidth: 250
        }

        this.text1 = this.add.text(game.config.width/2 - 250, game.config.height/2, 'Press SPACE to start', config);
        this.text2 = this.add.text(game.config.width / 2 - 200, game.config.height / 2 + 30, 'Use W to jump', config);


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
            this.scene.start('playScene');
        }
    }
}