
class Player{

    constructor(config){
        this.scene = config.scene;
        this.pictureKey = config.pictureKey;
        this.animationPace = 8;

        this.previousShotTime = new Date().getTime();

        this.projectileSpeed = config.projectileSpeed;
        this.projectilePictureKey = config.projectilePictureKey;
        this.projectileLevel = config.projectileLevel;
        //this.projectileDamage = config.projectileDamage;

        //add to game
        this.playerSprite = this.scene.physics.add.sprite(0, 0, this.pictureKey).setInteractive();
        Align.scaleToGameWidth(this.playerSprite, 0.125);
        this.scene.grid.placeAtIndex(202, this.playerSprite);
        let characterFrames = this.scene.anims.generateFrameNumbers(this.pictureKey);
        this.runAnimation = this.scene.anims.create({key: 'run', frames: characterFrames, frameRate: this.animationPace, repeat: -1});
        this.playerSprite.play('run');
        this.playerSprite.body.setImmovable();

        //player variables
        this.playerSprite.baseHealth = config.health;
        this.playerSprite.health = config.health;
        this.playerSprite.playerDamage = config.playerDamage;
        this.playerSprite.attackSpeed = config.attackSpeed;
        this.playerSprite.isAlive = true;
        this.playerSprite.leftSidekick = null;
        this.playerSprite.rightSidekick = null;

        WorldUtil.setDraggableWithSidekick(this.scene, this.playerSprite);
        //create player-drag function where also sidekicks follow the players coordinates + - their x distance
    }


    shootProjectiles(){
        this.d = new Date();
        this.currentTime = this.d.getTime();
        if (this.previousShotTime + 250 -this.playerSprite.attackSpeed <= this.currentTime){ //1000*10)
            new Projectile({
                scene: this.scene,
                shooter: this.playerSprite,
                projectileSpeed: this.projectileSpeed,
                level: this.projectileLevel,
                damage: this.playerSprite.playerDamage,
                pictureKey: this.projectilePictureKey});
            this.previousShotTime = this.currentTime;
        }
        if (this.playerSprite.leftSidekick){
            if(this.playerSprite.leftSidekick.sidekickSprite.isAlive) {
                this.playerSprite.leftSidekick.shootProjectiles();
            }
        }
        if (this.playerSprite.rightSidekick){
            if(this.playerSprite.rightSidekick.sidekickSprite.isAlive) {
                this.playerSprite.rightSidekick.shootProjectiles();
            }
        }


    }

    characterDeath(){
        this.playerSprite.isAlive = false;
        this.runAnimation.destroy();
        WorldUtil.unsetDraggable(this.scene, this.playerSprite);
        for(let i = 0; i<this.scene.obstacleGroup.getChildren().length; i++) {
            Phaser.Actions.Call(this.scene.obstacleGroup.getChildren(), function (obstacle) {
                obstacle.alpha = 0.75;
                obstacle.setVelocity(0,0);
            }, this);
        }
        this.scene.time.delayedCall(1000, function () {
            this.scene.scene.start('SceneGameOver', {materials: this.scene.materialBag.content});
        }, [], this);

    }

    setLeftSidekick(sidekick){
        this.playerSprite.leftSidekick = sidekick;
        let distance = this.playerSprite.leftSidekick.sidekickSprite.displayWidth;
        this.playerSprite.leftSidekick.sidekickSprite.x = this.scene.character.playerSprite.x - distance;
    }

    setRightSidekick(sidekick){
        this.playerSprite.rightSidekick = sidekick;
        let distance = this.playerSprite.leftSidekick.sidekickSprite.displayWidth;
        this.playerSprite.rightSidekick.sidekickSprite.x = this.scene.character.playerSprite.x + distance;
    }


}