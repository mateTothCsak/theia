class SceneArcade extends Phaser.Scene {
    constructor() {
        super('SceneArcade');
    }

    create() {

        //this should reduce animation lag
        this.game.forceSingleUpdate = true;

        //generates rolling background. should be organized into a function
        this.rollingBackground = this.generateRollingBackground("background1");

        this.grid = new AlignGrid({scene: this, rows: 15, cols: 15});
        //this.grid.showNumbers();

        //scene variables
        this.score = 1;
        this.gameSpeed = 1;
        this.speedDown = game.config.height/16*this.gameSpeed; //help to kind of bing the speed of obstacles to speed of game
        this.lastSpeedUpdate = new Date().getTime();

        this.speedIncreaseAt = 100; //gamespeed gets increased when reached this amount of points
        this.pointIncerase = 1;
        this.powerUpDropChance = 10; // percent

        this.gameLevel = 1;


        //groups
        this.projectileGroup = this.physics.add.group();
        this.obstacleGroup = this.physics.add.group();
        this.obstacleLine = new ObstacleLine({scene: this});
        this.powerUpGroup = this.physics.add.group();
        this.scrollingGroup = this.physics.add.group(); //all other sprites scrolling with BG

        //add character
        this.character = new Player({scene: this,
                                            health: 50,
                                            pictureKey: "mainCharacter",
                                            attackSpeed: 70,
                                            projectilePictureKey: 'mainProjectile',
                                            projectileSpeed: -600,
                                            projectileLevel: 1,
                                            playerDamage: 2});


        //colliders
        this.physics.add.collider(this.projectileGroup, this.obstacleGroup, this.hitEnemy, null, this );
        this.physics.add.collider(this.character.playerSprite, this.obstacleGroup,  this.hitPlayer, null, this );

        this.physics.add.collider(this.character.playerSprite, this.powerUpGroup,  this.pickUp, null, this );

        this.scoreBox = new ScoreBox({scene: this, locationIndex: 9});
        this.scoreBox.setDepth(1);

        this.materialBag = this.physics.add.sprite(0, 0, "materialBag").setOrigin(0, 0);
        this.grid.placeAtIndex(0, this.materialBag);
        Align.scaleToGameWidth(this.materialBag, 0.13);
        this.materialBag.setDepth(1);
    }


    update() {
        if(this.character.playerSprite.isAlive) {
            this.checkForSpeedUp();
            this.rollingBackground.tilePositionY -= this.gameSpeed/this.rollingBackground.tileScaleY;
            this.score += this.pointIncerase/10;
            this.scoreBox.scoreText.setText(Math.floor(this.score));
            this.character.shootProjectiles();
            this.obstacleLine.makeObstacles();
            this.obstacleLine.moveObstacles();
            this.obstacleLine.moveScrollingObjects();
        }
    }


    //
    // Environmental functions
    //
    generateRollingBackground(key){
        let tempBackground = this.add.image(0, 0, key);
        let bgBaseWidth = tempBackground.width;
        let bgBaseHeight = tempBackground.height;
        tempBackground.destroy();
        let rollingBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, key).setOrigin(0, 0);
        rollingBackground.tileScaleX = (game.config.width/bgBaseWidth);
        rollingBackground.tileScaleY = (game.config.height/bgBaseHeight);
        return rollingBackground;
    }

    checkForSpeedUp(){
        let currentTime = new Date().getTime();
        if(Math.floor(this.score)%this.speedIncreaseAt == 0){
            this.score += 1;
            this.gameSpeed += 1;
            this.speedDown = game.config.height/16*(this.gameSpeed);
            this.speedIncreaseAt = this.speedIncreaseAt*2;
            this.lastSpeedUpdate = currentTime;
            this.gameLevel += 1;
        }
    }


    //
    //Collisional functions
    //
    hitEnemy(projectile, enemy){
        enemy.health -= projectile.damage;
        projectile.destroy();
        if (enemy.health <= 0){
            this.generateRandomPowerUp(enemy);
            enemy.explode();
            this.dropShards(enemy)
            enemy.destroy();

        }
    }

    hitPlayer(player, obstacle){
        if(player.isAlive) {
            player.health -= obstacle.damage;
            if (player.health <= 0) {
                this.character.characterDeath();
            } else {
                obstacle.destroy();
            }
            player.alpha = player.health / player.baseHealth;
            this.time.delayedCall(500, function () {
                player.alpha = 1;
            }, [], this);
        }
    }

    pickUp(player, powerUp){
        powerUp.onPickUp();
    }


    generateRandomPowerUp(enemy){
        //50-20-15-15
        let willDrop = (Random.randomBetween(100, 1) < this.powerUpDropChance) ? true : false;
        if(willDrop) {
            let decider = Random.randomBetween(100, 1);
            if(decider <= 50){
                new DamageUp({scene: this, startingX: enemy.x, startingY: enemy.y});
            } else if (decider > 50 && decider <= 70){
                new HealthUp({scene: this, startingX: enemy.x, startingY: enemy.y});
            }else if (decider > 70 && decider <= 85){
                new ProjectileSpeedUp({scene: this, startingX: enemy.x, startingY: enemy.y});
            } else if (decider > 85 ){
                new AttackSpeedUp({scene: this, startingX: enemy.x, startingY: enemy.y});
            }
        }
    }


    dropShards(parent){
        //TODO move this to obstacles class and should be called from the obstacle explosion on complete function
        let dropAmount = Random.randomBetween(10, 3);
        for (let i = 0; i < dropAmount; i++) {
            let positionX = Random.randomBetween(parent.displayWidth, 0)
            positionX = Random.randomlyPositiveOrNegative(positionX) + parent.x;

            let positionY = Random.randomBetween(parent.displayHeight, 0);
            positionY = Random.randomlyPositiveOrNegative(positionY) + parent.y;

            let shard = this.physics.add.sprite(positionX, positionY, "rockShard");
            //TODO rotate by random angle
            Align.scaleToGameWidth(shard, 0.03);
            this.physics.moveTo(shard, this.materialBag.x + this.materialBag.displayWidth/2, this.materialBag.y + this.materialBag.displayHeight/2, game.config.height / 2);

            WorldUtil.setDeleteOnWorldOut(shard);
        }


    }


}