

class Coal extends Obstacle{

    constructor(config){
        super(config);
        this.obstacleSprite = this.scene.physics.add.sprite(0, 0, "obstacleCoal", this.frameNumber);
        this.obstacleSprite.shardSpriteKey = "coalShard";
        this.obstacleSprite.materialType = "COAL";
        this.obstacleSprite.health = 15;
        this.obstacleSprite.damage = 10;
        this.initialize(this.obstacleSprite);

    }
}