class SceneArcade extends Phaser.Scene {
    constructor() {
        super('SceneArcade');
    }

    create() {

        //generates rolling background. should be organized into a function
        this.tempBackground = this.add.image(0, 0, "background1");
        let bgBaseWidth = this.tempBackground.width;
        let bgBaseHeight = this.tempBackground.height;
        this.tempBackground.destroy();
        this.rollingBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background1").setOrigin(0, 0);
        this.rollingBackground.tileScaleX = (game.config.width/bgBaseWidth);
        this.rollingBackground.tileScaleY = (game.config.height/bgBaseHeight);

        this.grid = new AlignGrid({scene: this, rows: 13, cols: 13});
        //this.grid.showNumbers();


        //scene variables
        this.gameSpeed = 1;


        //add character
        this.character = new Player({scene: this,
                                            pictureKey: "mainCharacter",
                                            projectilePictureKey: 'mainProjectile',
                                            projectileSpeed: -300,
                                            attackSpeed: 27});


    }

    update() {
        this.rollingBackground.tilePositionY -= this.gameSpeed;
        this.character.shootProjectiles();
    }


}