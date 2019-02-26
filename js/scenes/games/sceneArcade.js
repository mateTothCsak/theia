class SceneArcade extends Phaser.Scene {
    constructor() {
        super('SceneArcade');
    }

    create() {

        this.game.forceSingleUpdate = true;

        //generates rolling background. should be organized into a function
        this.tempBackground = this.add.image(0, 0, "background1");
        let bgBaseWidth = this.tempBackground.width;
        let bgBaseHeight = this.tempBackground.height;
        this.tempBackground.destroy();
        this.rollingBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background1").setOrigin(0, 0);
        this.rollingBackground.tileScaleX = (game.config.width/bgBaseWidth);
        this.rollingBackground.tileScaleY = (game.config.height/bgBaseHeight);


        this.grid = new AlignGrid({scene: this, rows: 15, cols: 15});
        //this.grid.showNumbers();


        //scene variables
        this.gameSpeed = 1;


        this.projectileSpriteGroup = this.physics.add.group();
        this.obstacleGroup = this.physics.add.group();

        //add character
        this.character = new Player({scene: this,
                                            pictureKey: "mainCharacter",
                                            attackSpeed: 30,
                                            projectilePictureKey: 'mainProjectile',
                                            projectileSpeed: -800,
                                            projectileLevel: 1,
                                            projectileDamage: 3});

        this.physics.add.collider(this.projectileSpriteGroup, this.obstacleGroup, this.hitEnemy, null, this );


        this.obstacleLine = new ObstacleLine({scene: this});
    }


    hitEnemy(projectile, enemy){
        enemy.health -= projectile.damage;
        projectile.destroy();
        if (enemy.health <= 0){
            enemy.destroy();
        }
    }

    update() {
        this.rollingBackground.tilePositionY -= this.gameSpeed;
        this.character.shootProjectiles();
        this.obstacleLine.makeObstacles();
    }




}