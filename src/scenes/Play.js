class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('platform', './assets/long_ground.png');
        this.load.image('background', './assets/background.png');

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
        this.load.audio('closing', './assets/Door Closing.mp3');

        // load spritesheet
        this.load.spritesheet('running', './assets/wizard_running.png', { frameWidth: 350, frameHeight: 500, startFrame: 0, endFrame: 1 });
        this.load.spritesheet('shooting', './assets/wizard_shooting.png', { frameWidth: 430, frameHeight: 500, startFrame: 0, endFrame: 0 });
        this.load.spritesheet('jumping', './assets/wizard_jumping.png', { frameWidth: 300, frameHeight: 500, startFrame: 0, endFrame: 0 });
        this.load.spritesheet('gliding', './assets/wizard_gliding.png', { frameWidth: 500, frameHeight: 700, startFrame: 0, endFrame: 0 });
        this.load.spritesheet('sliding', './assets/wizard_sliding.png', { frameWidth: 500, frameHeight: 500, startFrame: 0, endFrame: 0 });
        this.load.spritesheet('fireball', './assets/fireball.png', { frameWidth: 300, frameHeight: 200, startFrame: 0, endFrame: 3 });
        this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 300, frameHeight: 300, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('trap', './assets/ground_trap.png', { frameWidth: 196, frameHeight: 131, startFrame: 0, endFrame: 0 });
        this.load.spritesheet('door', './assets/falling_door.png', { frameWidth: 158, frameHeight: 600, startFrame: 0, endFrame: 0 });
        this.load.spritesheet('ceiling', './assets/ceiling.png', { frameWidth: 300, frameHeight: 1600, startFrame: 0, endFrame: 0 });
    }

    create() {
        // place tile sprite
        this.background = this.add.tileSprite(-473.5, 0, 947, 700, 'background').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(473.5, 0, 947, 700, 'background').setOrigin(0, 0);

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
        this.platforms.push(this.createPlatform(platformSpawnX - game.config.width + 800, platformSpawnY));
        this.platforms.push(this.createPlatform(platformSpawnX + platformGap, platformSpawnY));
        this.platforms.push(this.createPlatform(platformSpawnX + platformGap + 800, platformSpawnY ));

        // add trap
        this.trap = this.physics.add.group({
            key: 'trap',
            frameQuantity: 12,
            immovable: true,
            allowGravity: false,
            active: false,
            visible: false,
            enable: false
        });
        this.traps = [];
        this.traps.push(this.createTrap(trapSpawnX * 1.5, trapSpawnY));

        // add closing door
        this.door = this.physics.add.group({
            key: 'door',
            frameQuantity: 12,
            immovable: true,
            allowGravity: false,
            active: false,
            visible: false,
            enable: false
        });
        this.doors = [];
        this.doors.push(this.createDoor(doorSpawnX, doorSpawnY));

        // add door ceiling
        this.ceiling = this.physics.add.group({
            key: 'ceiling',
            frameQuantity: 12,
            immovable: true,
            allowGravity: false,
            active: false,
            visible: false,
            enable: false
        });
        this.ceilings = [];
        this.ceilings.push(this.createCeiling(ceilingSpawnX, ceilingSpawnY));

        // add player
        this.wizard = this.physics.add.sprite(wizardSpawnX, wizardSpawnY, 'running');
        this.wizard.scale = .2;

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
        this.physics.add.collider(this.wizard, this.traps, () => {
            this.gameOver();
        });
        this.physics.add.collider(this.wizard, this.doors, () => {
            this.gameOver();
        });

        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // animation config
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('running', { start: 0, end: 1, first: 0 }),
            frameRate: gameSpeed,
            scale: .2
        });

        this.anims.create({
            key: 'shooting',
            frames: this.anims.generateFrameNumbers('shooting', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            scale: .2
        });

        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('jumping', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            scale: .2
        });

        this.anims.create({
            key: 'gliding',
            frames: this.anims.generateFrameNumbers('gliding', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            scale: .2
        });

        this.anims.create({
            key: 'sliding',
            frames: this.anims.generateFrameNumbers('sliding', { start: 0, end: 0, first: 0 }),
            frameRate: 0,
            scale: .2
        });

        this.anims.create({
            key: 'fireball',
            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 3, first: 0 }),
            frameRate: 5
        });

        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5, first: 0 }),
            frameRate: 10
        });

        // sound config
        this.runConfig = {
            rate: gameSpeed/8,
            volume: 2,
            loop: true
        }
        this.runSound = this.sound.add('run', this.runConfig);
        this.runSound.play(this.runConfig);

        this.jumpConfig = {
            rate: 1,
            volume: 1,
            loop: false
        }
        this.jumpSound = this.sound.add('jump', this.jumpConfig);

        this.glideConfig = {
            rate: .5,
            volume: .5,
            loop: true
        }
        this.glideSound = this.sound.add('glide', this.glideConfig);

        this.landConfig = {
            rate: 2,
            volume: .5,
            loop: false
        }
        this.landSound = this.sound.add('land', this.landConfig);

        this.slideConfig = {
            rate: .5,
            volume: .3,
            loop: true
        }
        this.slideSound = this.sound.add('slide', this.slideConfig);

        this.fireballConfig = {
            rate: 1.5,
            volume: .8,
            loop: false
        }
        this.fireballSound = this.sound.add('explosion2', this.fireballConfig);

        this.doorClosingConfig = {
            rate: gameSpeed/10,
            volume: .5,
            loop: false
        }
        this.doorClosingSound = this.sound.add('closing', this.doorClosingConfig);

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
        this.shootingAnimation = false; // set while player is doing shooting animation only
        this.isGliding = false;         // set while player is gliding only
        this.queuedGlide = false;       // set while trying to glide but is still shooting
        this.queuedSlide = false;       // set while trying to slide but is still jumping or shooting
        gameOver = false;
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
        if (Phaser.Input.Keyboard.JustDown(keyA) && (!this.doingAction || this.isJumping) && !this.wizard.body.touching.down) {
            if (!this.shootingAnimation) {
                this.glide();
            } else {
                this.queuedGlide = true;
            } 
        }
        if (Phaser.Input.Keyboard.JustDown(keyS) && !this.isGliding && !this.isSliding) {
            if (!this.shootingAnimation && this.wizard.body.touching.down) {
                this.slide();
            } else {
                this.queuedSlide = true;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyD) && !this.isShooting) {
            this.shoot();
        }

        this.updateObjects();

        this.updateSounds();

        this.updateAnimations();

        score += 1;
        this.scoreDisplay.text = score;
    }

    updateAnimations() {
        if(!this.doingAction && !this.shootingAnimation) {
            this.wizard.anims.play('running', true);
            this.wizard.setBodySize(350, 500);
        }
    }

    updateSounds() {
        // play run sound if not playing it and on ground
        if (this.wizard.body.touching.down && !this.runSound.isPlaying && !this.isSliding) {
            this.runSound.resume();
        }
        // pause run sound if playing it and not on ground
        if ((!this.wizard.body.touching.down || this.isSliding) && this.runSound.isPlaying) {
            this.runSound.pause();
        }
    }

    jump() {
        this.doingAction = true;
        this.isJumping = true;
        this.wizard.setVelocityY(-jumpStrength);
        this.wizard.anims.play('jumping', true);
        this.wizard.setBodySize(350, 500);
        this.jumpSound.play(this.jumpConfig);
    }

    slide() {
        this.doingAction = true;
        this.isSliding = true;
        this.wizard.anims.play('sliding', true);
        this.wizard.setBodySize(500,250);
        this.wizard.y += 25;
        this.slideSound.play(this.slideConfig);
    }

    shoot() {
        if(this.isSliding) {
            this.isSliding = false;
            this.doingAction = false;
            this.wizard.y -= 25;
            this.slideSound.stop();
        } else if(this.isGliding) {
            if (!this.isJumping) {
                this.doingAction = false;
            }
            this.isGliding = false;
            this.wizard.body.allowGravity = true;
            this.glideSound.stop();
        }
        this.shootingAnimation = true;
        this.isShooting = true;
        this.fireballs.push(this.createFireball(this.wizard.x + 50, this.wizard.y + 13));
        this.wizard.anims.play('shooting', true);
        this.wizard.setBodySize(350, 500);
        this.fireballSound.play(this.fireballConfig);
        this.clock1 = this.time.delayedCall(shootAnimation, () => {
            this.shootingAnimation = false;
            if(this.isJumping) {
                if (this.queuedGlide) {
                    this.glide();
                } else {
                    this.wizard.anims.play('jumping', true);
                }
                this.queuedGlide = false;
            } else {
                if (this.queuedSlide) {
                    this.slide();
                } else {
                    this.wizard.anims.play('running', true);
                }
                this.queuedSlide = false;
            }
        }, null, this);
        this.clock2 = this.time.delayedCall(shootCooldown, () => {
            this.isShooting = false;
        }, null, this);
    }

    glide()  {
        this.doingAction = true;
        this.isGliding = true;
        this.wizard.body.allowGravity = false;
        this.wizard.anims.play('gliding', true);
        this.wizard.setBodySize(350, 500);
        this.glideSound.play(this.glideConfig);
    }

    whileGliding() {
        if(this.isGliding) {
            this.wizard.setVelocityY(glideVelocity);
        }
    }

    whileShooting() {
        for (var i = 0; i < this.fireballs.length; i++) {
            this.fireballs[i].x += fireballSpeed;
            this.fireballs[i].anims.play('fireball', true);
        }
        for (var i = 0; i < this.fireballs.length; i++) {
            if (this.fireballs[i].x > game.config.width) {
                this.fireballs[i].disableBody(true, true);
                this.fireballs.splice(i, 1);
            }
        }
    }

    updateObjects() {
        // Move background
        this.background.tilePositionX += gameSpeed / 2;
        this.background2.tilePositionX += gameSpeed / 2;

        // Move platforms
        for(var i = 0; i < this.platforms.length; i++) {
            this.platforms[i].x -= gameSpeed;
            if (this.platforms[i].x <= -game.config.width + platformGap) {
                this.platforms[i].x = platformSpawnX + platformGap;
            }
            if (this.platforms[i].x <= -game.config.width + platformGap) {
                this.platforms[i].x = platformSpawnX + platformGap;
            }
        }

        //Move traps
        for (var i = 0; i < this.traps.length; i++) {
            this.traps[i].x -= gameSpeed;
        }

        //Move doors
        for (var i = 0; i < this.doors.length; i++) {
            this.doors[i].x -= gameSpeed;
            this.doors[i].y += gameSpeed * ((335  - doorSpawnY)/(doorSpawnX - this.wizard.x));
            if (this.doors[i].y > game.config.height - 270) {
                this.doors[i].y = game.config.height - 270;
            }
            if (!this.doorClosingSound.isPlaying && this.doors[i].y > game.config.height/4 && !gameOver) {
                this.doorClosingSound.play(this.doorClosing);
            }
            if (this.doors[i].x < -100) {
                this.doors[i].disableBody(true, true);
                this.doors.splice(i, 1);
            }
        }

        //Move ceilings
        for (var i = 0; i < this.ceilings.length; i++) {
            this.ceilings[i].x -= gameSpeed;
        }
    }

    checkActionEnd() {
        // end jump when lands
        if (this.isJumping && this.wizard.body.touching.down) {
            this.isJumping = false;
            this.doingAction = false;
            if (this.queuedSlide) {
                this.slide();
            }
            this.queuedSlide = false;
            this.glideSound.stop();
            this.landSound.play(this.landConfig);
        }
        // glide ends when key is up
        if (Phaser.Input.Keyboard.JustUp(keyA)) {
            if(this.isGliding) {
                if(!this.isJumping) {
                    this.doingAction = false;
                }
                else {
                    this.wizard.anims.play('jumping', true);
                    this.wizard.setBodySize(350, 500);
                }
                this.isGliding = false;
                this.wizard.body.allowGravity = true;
                this.glideSound.stop();
            } else {
                this.queuedGlide = false;
            }
        }
        // slide ends when key is up
        if (Phaser.Input.Keyboard.JustUp(keyS)) {
            if(this.isSliding) {
                this.isSliding = false;
                this.doingAction = false;
                this.wizard.y -= 25;
                this.wizard.setBodySize(350, 500);
                this.slideSound.stop();
            } else {
                this.queuedSlide = false;
            }
        }
    }

    // game over takes the player back to menu right now
    checkForGameOver() {
        // game over if misses jump
        if(this.wizard.y > game.config.height) {
            this.gameOver();
        }
    }

    createPlatform(x, y) {
        var p = this.platform.get();
        if (!p) return;
        p.scale = .5;
        p.enableBody(true, x, y, true, true);
        p.setBodySize(1600, 250);
        return p;
    }

    createTrap(x, y) {
        var t = this.trap.get();
        if (!t) return;
        t.scale = .5;
        t.enableBody(true, x, y, true, true);
        return t;
    }

    createDoor(x, y) {
        var d = this.door.get();
        if (!d) return;
        d.scale = .5;
        d.enableBody(true, x, y, true, true);
        return d;
    }

    createCeiling(x, y) {
        var c = this.ceiling.get();
        if (!c) return;
        c.scale = .5;
        c.enableBody(true, x, y, true, true);
        return c;
    }

    createFireball(x, y) {
        var f = this.fireball.get();
        if (!f) return;
        f.scale = .3;
        f.enableBody(true, x, y, true, true);
        return f;
    }

    gameOver() {
        gameOver = true;
        this.runSound.stop();
        this.jumpSound.stop();
        this.landSound.stop();
        this.glideSound.stop();
        this.slideSound.stop();
        this.fireballSound.stop();
        this.doorClosingSound.stop();
        this.scene.start('menuScene');
    }
}