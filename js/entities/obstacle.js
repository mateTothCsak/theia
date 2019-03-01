

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
        WorldUtil.setDeleteOnWorldOutBottom(this.scene, this.obstacleSprite);
    }



}