class SceneArcade extends Phaser.Scene {
    constructor() {
        super('SceneArcade');
    }

    create() {

        this.game.forceSingleUpdate = true;

        //generates rolling background. should be organized into a function
        this.rollingBackground = this.generateRollingBackground("background1");




        this.grid = new AlignGrid({scene: this, rows: 15, cols: 15});
        //this.grid.showNumbers();



        //scene variables
        this.gameSpeed = 3;


        this.projectileSpriteGroup = this.physics.add.group();
        this.obstacleGroup = this.physics.add.group();

        //add character
        this.character = new Player({scene: this,
                                            health: 100,
                                            pictureKey: "mainCharacter",
                                            attackSpeed: 30,
                                            projectilePictureKey: 'mainProjectile',
                                            projectileSpeed: -800,
                                            projectileLevel: 1,
                                            projectileDamage: 3});

        this.physics.add.collider(this.projectileSpriteGroup, this.obstacleGroup, this.hitEnemy, null, this );
        this.physics.add.collider(this.character.playerSprite, this.obstacleGroup,  this.hitPlayer, null, this );

        this.obstacleLine = new ObstacleLine({scene: this});


    }


    hitEnemy(projectile, enemy){
        enemy.health -= projectile.damage;
        projectile.destroy();
        if (enemy.health <= 0){
            enemy.destroy();
        }
    }

    hitPlayer(player, obstacle){
        player.health -= obstacle.damage;
        obstacle.destroy();
        if (player.health <= 0){
            player.isAlive = false;
        }
        player.alpha = player.health/100;
        this.time.delayedCall(1500, function(){player.alpha = 1;}, [], this);

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
            this.rollingBackground.tilePositionY -= this.gameSpeed;
            this.character.shootProjectiles();
            this.obstacleLine.makeObstacles();
        }
    }




}