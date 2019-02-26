class SceneArcade extends Phaser.Scene {
    constructor() {
        super('SceneArcade');
    }

    create() {

        //his should reduce animation lag
        this.game.forceSingleUpdate = true;

        //generates rolling background. should be organized into a function
        this.rollingBackground = this.generateRollingBackground("background1");


        this.grid = new AlignGrid({scene: this, rows: 15, cols: 15});
        //this.grid.showNumbers();


        //scene variables
        this.gameSpeed = 1;
        this.speedDown = game.config.height/16*this.gameSpeed; //help to kind of bing the speed of obstacles to speed of game
        this.lastSpeedUpdate = new Date().getTime();

        //groups
        this.projectileGroup = this.physics.add.group();
        this.obstacleGroup = this.physics.add.group();
        this.obstacleLine = new ObstacleLine({scene: this});

        //add character
        this.character = new Player({scene: this,
                                            health: 50,
                                            pictureKey: "mainCharacter",
                                            attackSpeed: 30,
                                            projectilePictureKey: 'mainProjectile',
                                            projectileSpeed: -800,
                                            projectileLevel: 1,
                                            projectileDamage: 3});

        //colliders
        this.physics.add.collider(this.projectileGroup, this.obstacleGroup, this.hitEnemy, null, this );
        this.physics.add.collider(this.character.playerSprite, this.obstacleGroup,  this.hitPlayer, null, this );


    }


    hitEnemy(projectile, enemy){
        enemy.health -= projectile.damage;
        projectile.destroy();
        if (enemy.health <= 0){
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

    update() {
        if(this.character.playerSprite.isAlive) {
            let currentTime = new Date().getTime();
            if(this.lastSpeedUpdate + 10000 <= currentTime){
                this.gameSpeed += 1;
                this.speedDown = game.config.height/16*this.gameSpeed;
                this.lastSpeedUpdate = currentTime;
                for(let i = 0; i<this.obstacleGroup.getChildren().length; i++) {
                    Phaser.Actions.Call(this.obstacleGroup.getChildren(), function (obstacle) {
                        obstacle.setVelocity(0, this.speedDown);
                    }, this);
                }
            }
            this.rollingBackground.tilePositionY -= this.gameSpeed;
            this.character.shootProjectiles();
            this.obstacleLine.makeObstacles();
            
        }
    }


    //a util file for time would be nice too




}