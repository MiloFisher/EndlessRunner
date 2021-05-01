class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('menu', './assets/menu.png');
        this.load.image('gameover', './assets/gameover.png');
        this.load.image('gameover_background', './assets/gameover_background.png');
        this.load.audio('menu_music', './assets/music1.mp3');
    }

    create() {
        game.sound.stopAll();

        // sound config
        this.musicConfig = {
            rate: .5,
            volume: 1,
            loop: true
        }
        this.musicSound = this.sound.add('menu_music', this.musicConfig);
        this.musicSound.play(this.musicConfig);
    
        this.menu = this.add.tileSprite(0, 0, 1200, 887, 'menu').setOrigin(0, 0);
        this.gameName = this.add.text(game.config.width * .3, game.config.height / 7, 'Game Name', { font: "100px Gothic", fill: "#fff" });
        this.gameName.setStroke('#000', 8);

        this.gameName = this.add.text(game.config.width * .34, game.config.height * .9, 'Press \'SPACE\' to start', { font: "50px Gothic", fill: "#fff" });
        this.gameName.setStroke('#000', 6);
        
        this.shimmer = 0;

        this.wText = this.add.text(85, 183, 'W -', { font: "50px Gothic", fill: "#000" });
        this.wText.alpha = 0.3;
        this.wText.angle = 6;
        this.jumpText = this.add.text(197, 200, 'Jump', { font: "40px Gothic", fill: "#000" });
        this.jumpText.alpha = 0.3;
        this.jumpText.angle = 4;

        this.aText = this.add.text(160, 270, 'A -', { font: "48px Gothic", fill: "#000" });
        this.aText.alpha = 0.3;
        this.aText.angle = 2;
        this.glideText = this.add.text(257, 283, 'Glide', { font: "38px Gothic", fill: "#000" });
        this.glideText.alpha = 0.3;
        this.glideText.angle = 2;

        this.sText = this.add.text(227, 353, 'S -', { font: "46px Gothic", fill: "#000" });
        this.sText.alpha = 0.3;
        this.sText.angle = -2;
        this.slideText = this.add.text(313, 356, 'Slide', { font: "36px Gothic", fill: "#000" });
        this.slideText.alpha = 0.3;
        this.slideText.angle = -3;

        this.dText = this.add.text(283, 423, 'D -', { font: "44px Gothic", fill: "#000" });
        this.dText.alpha = 0.3;
        this.dText.angle = -5;
        this.shootText = this.add.text(363, 419, 'Shoot', { font: "34px Gothic", fill: "#000" });
        this.shootText.alpha = 0.3;
        this.shootText.angle = -7;

        // Game Over screen
        if(gameOver) {
            this.gameOverBack = this.add.image(0, 0, 'gameover_background').setOrigin(0, 0);
            this.gameOverImage = this.add.image(0, 0, 'gameover');
            this.gameOverText = this.add.text(game.config.width / 4, game.config.height / 10, 'GAME OVER', { font: "100px Gothic", fill: "#fff" });
            this.gameOverText.setStroke('#00f', 16);
            this.scoreText = this.add.text(game.config.width * .33, game.config.height / 10 + 120, 'Distance Travelled: ' + score + 'm', { font: "40px Gothic", fill: "#fff" });
            this.scoreText.setStroke('#00f', 8);
            this.continueText = this.add.text(game.config.width * .29, game.config.height * .9, 'Press \'SPACE\' to continue...', { font: "48px Gothic", fill: "#fff" });
            this.continueText.setStroke('#00f', 8);

            this.gameOverImage.scale = .65;
            this.gameOverImage.x = game.config.width / 2;
            this.gameOverImage.y = game.config.height * .6;
        }

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
            if(gameOver) {
                this.gameOverText.visible = false;
                this.gameOverBack.visible = false;
                this.gameOverImage.visible = false;
                this.continueText.visible = false;
                this.scoreText.visible = false;
                gameOver = false;
            } else {
                score = 0;
                game.sound.stopAll();
                this.scene.start('playScene');
            }
        }

        // wall text tint shimmer
        this.shimmer++;
        if(this.shimmer % 10 == 0) {
            switch(this.shimmer/10) {
                case 1:
                    this.wText.setTintFill(0x0000ff, 0x000000, 0x0000ff, 0x000000); break;
                case 2:
                    this.wText.setTintFill(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff); break;
                case 3:
                    this.wText.setTintFill(0x000000, 0x0000ff, 0x000000, 0x0000ff); break;
                case 4:
                    this.wText.setTintFill(0x000000, 0x000000, 0x000000, 0x000000); break;


                case 9:
                    this.jumpText.setTintFill(0x0000ff, 0x000000, 0x0000ff, 0x000000); break;
                case 10:
                    this.jumpText.setTintFill(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff); break;
                case 11:
                    this.jumpText.setTintFill(0x000000, 0x0000ff, 0x000000, 0x0000ff); break;
                case 12:
                    this.jumpText.setTintFill(0x000000, 0x000000, 0x000000, 0x000000); break;


                case 17:
                    this.aText.setTintFill(0x0000ff, 0x000000, 0x0000ff, 0x000000); break;
                case 18:
                    this.aText.setTintFill(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff); break;
                case 19:
                    this.aText.setTintFill(0x000000, 0x0000ff, 0x000000, 0x0000ff); break;
                case 20:
                    this.aText.setTintFill(0x000000, 0x000000, 0x000000, 0x000000); break


                case 25:
                    this.glideText.setTintFill(0x0000ff, 0x000000, 0x0000ff, 0x000000); break;
                case 26:
                    this.glideText.setTintFill(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff); break;
                case 27:
                    this.glideText.setTintFill(0x000000, 0x0000ff, 0x000000, 0x0000ff); break;
                case 28:
                    this.glideText.setTintFill(0x000000, 0x000000, 0x000000, 0x000000); break;


                case 33:
                    this.sText.setTintFill(0x0000ff, 0x000000, 0x0000ff, 0x000000); break;
                case 34:
                    this.sText.setTintFill(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff); break;
                case 35:
                    this.sText.setTintFill(0x000000, 0x0000ff, 0x000000, 0x0000ff); break;
                case 36:
                    this.sText.setTintFill(0x000000, 0x000000, 0x000000, 0x000000); break;


                case 41:
                    this.slideText.setTintFill(0x0000ff, 0x000000, 0x0000ff, 0x000000); break;
                case 42:
                    this.slideText.setTintFill(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff); break;
                case 43:
                    this.slideText.setTintFill(0x000000, 0x0000ff, 0x000000, 0x0000ff); break;
                case 44:
                    this.slideText.setTintFill(0x000000, 0x000000, 0x000000, 0x000000); break;


                case 49:
                    this.dText.setTintFill(0x0000ff, 0x000000, 0x0000ff, 0x000000); break;
                case 50:
                    this.dText.setTintFill(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff); break;
                case 51:
                    this.dText.setTintFill(0x000000, 0x0000ff, 0x000000, 0x0000ff); break;
                case 52:
                    this.dText.setTintFill(0x000000, 0x000000, 0x000000, 0x000000); break;


                case 57:
                    this.shootText.setTintFill(0x0000ff, 0x000000, 0x0000ff, 0x000000); break;
                case 58:
                    this.shootText.setTintFill(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff); break;
                case 59:
                    this.shootText.setTintFill(0x000000, 0x0000ff, 0x000000, 0x0000ff); break;
                case 60:
                    this.shootText.setTintFill(0x000000, 0x000000, 0x000000, 0x000000); break;
            }
            if(this.shimmer == 80 * 10) {
                this.shimmer = 0;
            }
        }
    }
}