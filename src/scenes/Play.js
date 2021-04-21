class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('wizard', './assets/temp_wizard.png');
        this.load.image('wizard_slide', './assets/temp_wizard_sliding.png');
        this.load.image('fireball', './assets/temp_fireball.png');
        this.load.image('cloud', './assets/temp_cloud.png');
        this.load.image('platform', './assets/temp_platform.png');
        this.load.image('background', './assets/temp_background.png');

        // load spritesheet
        // this.load.spritesheet('name', './assets/name.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    }

    create() {
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 1200, 700, 'background').setOrigin(0, 0);

        // add platforms
        this.platform01 = this.physics.add.image(platformSpawnX - game.config.width, platformSpawnY, 'platform');
        this.platform02 = this.physics.add.image(platformSpawnX + platformGap, platformSpawnY, 'platform');
        this.platform01.setImmovable(true);
        this.platform02.setImmovable(true);
        this.platform01.body.allowGravity = false;
        this.platform02.body.allowGravity = false;

        // add player
        this.wizard = this.physics.add.image(wizardSpawnX, wizardSpawnY, 'wizard');

        // add collisions
        this.physics.add.collider(this.wizard, this.platform01);
        this.physics.add.collider(this.wizard, this.platform02);

        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // animation config
        // this.anims.create({
        //     key: 'explode',
        //     frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
        //     frameRate: 30
        // });

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreDisplay = this.add.text(scoreX, scoreY, score, scoreConfig);

        // Variables
        this.doingAction = false;       // set while player is doing any action
        this.isJumping = false;         // set while player is jumping only
        this.isSliding = false;         // set while player is sliding only
        this.isShooting = false;        // set while player is shooting only
        this.isGliding = false;         // set while player is gliding only
    }

    update() {
        //check for game over
        this.checkForGameOver();

        //checks for action's end
        this.checkActionEnd();

        // Get input
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.doingAction) {
            this.jump();
        } 
        if (Phaser.Input.Keyboard.JustDown(keyA) && !this.doingAction) {
            this.glide();
        }
        if (Phaser.Input.Keyboard.JustDown(keyS) && !this.doingAction) {
            this.slide();
        }
        if (Phaser.Input.Keyboard.JustDown(keyD) && !this.doingAction) {
            this.fireball();
        }

        this.background.tilePositionX += gameSpeed;
        this.updatePlatforms();

        score += 1;
        this.scoreDisplay.text = score;

        // if (!this.gameOver) {
        //     
        //     this.player1.update();
        //     this.player2.update();
        //     this.arrow1.update();
        //     this.arrow2.update();
        //     this.target1.update();
        //     this.target2.update();
        //     this.target3.update();
        // }
        
    }

    jump() {
        this.doingAction = true;
        this.isJumping = true;
        this.wizard.setVelocityY(-jumpStrength);
    }

    slide() {
        this.doingAction = true;
        this.isSliding = true;
    }

    fireball() {
        this.doingAction = true;
        this.isShooting = true;
    }

    glide()  {
        this.doingAction = true;
        this.isGliding = true;
    }

    updatePlatforms() {
        this.platform01.x -= gameSpeed;
        this.platform02.x -= gameSpeed;
        if(this.platform01.x <= -game.config.width + platformGap) {
            this.platform01.x = platformSpawnX + platformGap;
        }
        if (this.platform02.x <= -game.config.width + platformGap) {
            this.platform02.x = platformSpawnX + platformGap;
        }
    }

    checkActionEnd() {
        // end jump when lands
        if (this.isJumping && this.wizard.body.touching.down) {
            this.isJumping = false;
            this.doingAction = false;
        }
    }

    // game over takes the player back to menu right now
    checkForGameOver() {
        // game over if misses jump
        if(this.wizard.y > game.config.height) {
            this.scene.start('menuScene');
        }
    }
}