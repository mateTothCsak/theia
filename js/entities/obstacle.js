

class Obstacle{

    constructor(config){
        this.scene = config.scene;
        this.spriteKey = config.spriteKey;
        this.frameNumber = config.frameNumber;
        this.location = config.location;
    }

    initialize(obstacleSprite){
        Align.scaleToGameWidth(this.obstacleSprite, 0.20);
        this.scene.grid.placeAtIndex(this.location, this.obstacleSprite);
        this.obstacleSprite.y -= 100;
        this.scene.obstacleGroup.add(this.obstacleSprite);
        this.obstacleSprite.body.setImmovable();

        this.obstacleSprite.scene = this.scene;
        this.obstacleSprite.explode = this.explode;

        WorldUtil.setDeleteOnWorldOutBottom(this.scene, this.obstacleSprite);
    }

    explode(){
        let explosion = this.scene.physics.add.sprite(this.x, this.y, "obstacleRockExplosion");
        Align.scaleToGameWidth(explosion, 0.3);
        let characterFrames = this.scene.anims.generateFrameNumbers("obstacleRockExplosion");
        this.explosionAnimation = this.scene.anims.create({key: 'explode', frames: characterFrames, frameRate: 16, repeat: 0, onComplete: explosion.destroy});

        this.scene.scrollingGroup.add(explosion);
        explosion.play('explode');

    }



}