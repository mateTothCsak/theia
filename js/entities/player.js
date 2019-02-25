
class Player{

    constructor(config){
        this.scene = config.scene;
        this.pictureKey = config.pictureKey;
        this.animationPace = 8;

        this.health = config.health;
        this.playerDamage = config.playerDamage;
        this.attackSpeed = config.attackSpeed;

        this.previousShotTime = new Date().getTime();

        this.addToGame();
        this.projectile = new Projectile({
                                            scene: this.scene,
                                            shooter: this.playerSprite,
                                            projectileSpeed: config.projectileSpeed,
                                            level: 1,
                                            damage: 1,
                                            pictureKey: config.projectilePictureKey});


        this.setDraggable();


    }

    addToGame(){
        this.playerSprite = this.scene.physics.add.sprite(0, 0, this.pictureKey).setInteractive();
        Align.scaleToGameWidth(this.playerSprite, 0.125);
        this.scene.grid.placeAtIndex(202, this.playerSprite);
        let characterFrames = this.scene.anims.generateFrameNumbers(this.pictureKey);
        this.scene.anims.create({key: 'run', frames: characterFrames, frameRate: this.animationPace, repeat: -1});
        this.playerSprite.play('run');
    }

    shootProjectiles(){
        this.d = new Date();
        this.currentTime = this.d.getTime();
        if (this.previousShotTime + 1000-(this.attackSpeed*30) <= this.currentTime){
            this.projectile.blastOff();
            this.previousShotTime = this.currentTime;
        }
    }

    setDraggable(){
        this.scene.input.setDraggable(this.playerSprite);
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
        });
    }

}