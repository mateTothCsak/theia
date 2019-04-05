class SceneArcade extends Phaser.Scene {
    constructor() {
        super('SceneArcade');
    }

    create() {

        this.playerId = 0;
        this.leftSidekickName = "";
        this.rightSidekickName = "";
        this.asyncLoaded = false;
        this.sidekicksDone = false;


        (async () => {
            const rawResponse = await fetch('http://localhost:8080/currentPlayer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({})
            });
            const content = await rawResponse.json();
            this.leftSidekickName = content.leftSidekick;
            this.rightSidekickName = content.rightSidekick;
            this.playerId = content.id;
            this.asyncLoaded = true;
        })();


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
        this.shardGroup = this.physics.add.group();
        this.sidekickGroup = this.physics.add.group();

        //add character
        this.character = new Player({scene: this,
                                            health: 50,
                                            pictureKey: "mainCharacter",
                                            attackSpeed: 70,
                                            projectilePictureKey: 'mainProjectile', //projectile types needs to be configured
                                            projectileSpeed: -600,
                                            projectileLevel: 2,
                                            playerDamage: 2});

        this.setSidekicks();

        this.scoreBox = new ScoreBox({scene: this, locationIndex: 9});
        this.scoreBox.setDepth(1);

        this.materialBag = this.physics.add.sprite(0, 0, "materialBag").setOrigin(0, 0);
        this.grid.placeAtIndex(0, this.materialBag);
        Align.scaleToGameWidth(this.materialBag, 0.13);
        this.materialBag.setImmovable();
        this.materialBag.setDepth(1);
        this.materialBag.content = {};


        //colliders
        this.physics.add.collider(this.projectileGroup, this.obstacleGroup, this.hitObstacle, null, this );
        this.physics.add.collider(this.character.playerSprite, this.obstacleGroup,  this.crashPlayer, null, this );
        this.physics.add.collider(this.character.playerSprite, this.powerUpGroup,  this.pickUp, null, this );
        this.physics.add.collider(this.materialBag, this.shardGroup,  this.shardsToBag, null, this );
        this.physics.add.collider(this.sidekickGroup, this.obstacleGroup, this.crashSideKick, null, this)
    }


    update() {
        if(this.character.playerSprite.isAlive && this.asyncLoaded) {
            this.setSidekicks();
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
    hitObstacle(projectile, obstacle){
        obstacle.health -= projectile.damage;
        projectile.destroy();
        if (obstacle.health <= 0){
            this.generateRandomPowerUp(obstacle);
            obstacle.explode();
            obstacle.destroy();
        }
    }

    crashPlayer(player, obstacle){
        if(player.isAlive) {
            player.health -= obstacle.damage;
            if (player.health <= 0) {
                this.character.characterDeath();
            } else {
                obstacle.destroy();
            }
            player.alpha = 0.5;
            this.time.delayedCall(500, function () {
                player.alpha = 1;
            }, [], this);
        }
    }

    pickUp(player, powerUp){
        powerUp.onPickUp();
    }

    shardsToBag(bag, shard){
        let materialType = shard.materialType;
        if (!this.materialBag.content[materialType]){
            this.materialBag.content[materialType] = 1;
        }else {
            this.materialBag.content[materialType] += 1;
        }
        shard.destroy();
    }

    crashSideKick(sidekick, obstacle){
        if(sidekick.isAlive) {
            sidekick.health -= obstacle.damage;
            obstacle.destroy();
            console.log(sidekick.health)
            if (sidekick.health <= 0) {
                sidekick.alpha = 0;
                sidekick.isAlive = false;
            } else {
                sidekick.alpha = 0.5;
                this.time.delayedCall(500, function () {
                    sidekick.alpha = 1;
                }, [], this);
            }
        }
    }

    setSidekicks(){
        if(this.asyncLoaded && !this.sidekicksDone) {
            if (this.leftSidekickName === "owl") {
                this.leftSidekick = new Owl({scene: this, level: 1, type: "CLAY"});
                this.character.setLeftSidekick(this.leftSidekick);
            } else if (this.leftSidekickName === "elephant") {
                this.leftSidekick = new Elephant({scene: this, level: 1, type: "ROCK"});
                this.character.setLeftSidekick(this.leftSidekick);
            }
            if (this.rightSidekickName === "owl") {
                this.rightSidekick = new Owl({scene: this, level: 1, type: "CLAY"});
                this.character.setRightSidekick(this.rightSidekick);
            } else if (this.rightSidekickName === "elephant") {
                this.rightSidekick = new Elephant({scene: this, level: 1, type: "ROCK"});
                this.character.setRightSidekick(this.rightSidekick);
            }
            this.sidekicksDone = true;
        }

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

}