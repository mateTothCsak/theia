

class Limestone extends Obstacle{

    constructor(config){
        super(config);
        this.obstacleSprite = this.scene.physics.add.sprite(0, 0, "obstacleLimestone", this.frameNumber);
        this.obstacleSprite.shardSpriteKey = "limestoneShard";
        this.obstacleSprite.materialType = "LIMESTONE";
        this.obstacleSprite.health = 20;
        this.obstacleSprite.damage = 10;
        this.initialize(this.obstacleSprite);

    }
}