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

        // load audio
        this.load.audio('glide', './assets/Gliding.mp3');
        this.load.audio('jump', './assets/Jumping.mp3');
        this.load.audio('land', './assets/Landing.mp3');
        this.load.audio('run', './assets/Running.mp3');
        this.load.audio('slide', './assets/Sliding.mp3');
        this.load.audio('spike_trap', './assets/Spike Trap.mp3');
        this.load.audio('box_break', './assets/Box Breaking.mp3');
        this.load.audio('door_close', './assets/Door Closing.mp3');
        this.load.audio('explosion1', './assets/Explosion+1.wav');
        this.load.audio('explosion2', './assets/explosion38.wav');

        // load spritesheet
        // this.load.spritesheet('name', './assets/name.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    }

    create() {
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 1200, 700, 'background').setOrigin(0, 0);

        // add platforms
        this.platform = this.physics.add.group({
            key: 'platform',
            frameQuantity: 12,
            immovable: true,
            allowGravity: false,
            active: false,
            visible: false,
            enable: false
        });
        this.platforms = [];
        this.platforms.push(this.createPlatform(platformSpawnX - game.config.width, platformSpawnY));
        this.platforms.push(this.createPlatform(platformSpawnX + platformGap, platformSpawnY));

        // add player
        this.wizard = this.physics.add.image(wizardSpawnX, wizardSpawnY, 'wizard');

        // add cloud
        this.cloud = this.physics.add.image(-100, -100, 'cloud');
        this.cloud.setImmovable(true);
        this.cloud.body.allowGravity = false;

        // add fireball
        this.fireball = this.physics.add.group({
            key: 'fireball',
            frameQuantity: 10,
            immovable: true,
            allowGravity: false,
            active: false,
            visible: false,
            enable: false
        });
        this.fireballs = [];
        //this.fireballs.body.allowGravity = false;

        // add collisions
        this.physics.add.collider(this.wizard, this.platforms);

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

        // sound config
        this.runConfig = {
            rate: 1.5,
            volume: 2,
            loop: true
        }
        this.runSound = this.sound.add('run', this.runConfig);
        this.runSound.play(this.runConfig);

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

        //while actions are active
        this.whileGliding();
        this.whileShooting();

        //checks for action's end
        this.checkActionEnd();

        // Get input
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.doingAction && this.wizard.body.touching.down) {
            this.jump();
        } 
        if (Phaser.Input.Keyboard.JustDown(keyA) && (!this.doingAction || this.isJumping)) {
            this.glide();
        }
        if (Phaser.Input.Keyboard.JustDown(keyS) && !this.doingAction && this.wizard.body.touching.down) {
            this.slide();
        }
        if (Phaser.Input.Keyboard.JustDown(keyD) && !this.isShooting) {
            this.shoot();
        }

        this.background.tilePositionX += gameSpeed;
        this.updatePlatforms();

        this.updateSounds();

        score += 1;
        this.scoreDisplay.text = score;
    }

    updateSounds() {
        // play run sound if not playing it and on ground
        if (this.wizard.body.touching.down && !this.runSound.isPlaying) {
            this.runSound.resume();
        }
        // pause run sound if playing it and not on ground
        if (!this.wizard.body.touching.down && this.runSound.isPlaying) {
            this.runSound.pause();
        }
    }

    jump() {
        this.doingAction = true;
        this.isJumping = true;
        this.wizard.setVelocityY(-jumpStrength);
    }

    slide() {
        this.doingAction = true;
        this.isSliding = true;
        this.wizard.setBodySize(100,50);
        this.wizard.y += 25;
    }

    shoot() {
        this.isShooting = true;
        this.fireballs.push(this.createFireball(this.wizard.x,this.wizard.y));
        this.clock = this.time.delayedCall(shootCooldown, () => {
            this.isShooting = false;
        }, null, this);
    }

    glide()  {
        this.doingAction = true;
        this.isGliding = true;
        this.wizard.body.allowGravity = false;
    }

    whileGliding() {
        if(this.isGliding) {
            this.wizard.setVelocityY(glideVelocity);
            this.cloud.x = this.wizard.x;
            this.cloud.y = this.wizard.y + this.wizard.height/2;
        }
    }

    whileShooting() {
        for (var i = 0; i < this.fireballs.length; i++) {
            this.fireballs[i].x += fireballSpeed;
        }
        for (var i = 0; i < this.fireballs.length; i++) {
            if (this.fireballs[i].x > game.config.width) {
                this.fireballs[i].disableBody(true, true);
                this.fireballs.splice(i, 1);
            }
        }
    }

    updatePlatforms() {
        for(var i = 0; i < this.platforms.length; i++) {
            this.platforms[i].x -= gameSpeed;
            this.platforms[i].x -= gameSpeed;
            if (this.platforms[i].x <= -game.config.width + platformGap) {
                this.platforms[i].x = platformSpawnX + platformGap;
            }
            if (this.platforms[i].x <= -game.config.width + platformGap) {
                this.platforms[i].x = platformSpawnX + platformGap;
            }
        }
    }

    checkActionEnd() {
        // end jump when lands
        if (this.isJumping && this.wizard.body.touching.down) {
            this.isJumping = false;
            this.doingAction = false;
        }
        // glide ends when key is up
        if (Phaser.Input.Keyboard.JustUp(keyA) && this.isGliding) {
            if(!this.isJumping) {
                this.doingAction = false;
            }
            this.isGliding = false;
            this.wizard.body.allowGravity = true;
            this.cloud.x = -100;
            this.cloud.y = -100;
        }
        // slide ends when key is up
        if (Phaser.Input.Keyboard.JustUp(keyS) && this.isSliding) {
            this.isSliding = false;
            this.doingAction = false;
            this.wizard.setBodySize(100, 100);
            this.wizard.y -= 25;
        }
    }

    // game over takes the player back to menu right now
    checkForGameOver() {
        // game over if misses jump
        if(this.wizard.y > game.config.height) {
            this.scene.start('menuScene');
        }
    }

    createPlatform(x, y) {
        var p = this.platform.get();

        if (!p) return;

        p.enableBody(true, x, y, true, true)

        return p;
    }

    createFireball(x, y) {
        var f = this.fireball.get();

        if (!f) return;

        f.enableBody(true, x, y, true, true)

        return f;
    }
}