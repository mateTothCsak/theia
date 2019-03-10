


class Clay extends Obstacle{

    constructor(config){
        super(config);
        this.obstacleSprite = this.scene.physics.add.sprite(0, 0, "obstacleClay", this.frameNumber);
        this.obstacleSprite.shardSpriteKey = "clayShard";
        this.obstacleSprite.materialType = "CLAY";
        this.obstacleSprite.health = 10;
        this.obstacleSprite.damage = 10;
        this.initialize(this.obstacleSprite);
    }

    //Should counter water-y elements
}