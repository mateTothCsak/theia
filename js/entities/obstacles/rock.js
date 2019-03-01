
class Rock extends Obstacle{

    constructor(config){
        super(config);
        this.obstacleSprite = this.scene.physics.add.sprite(0, 0, "obstacleRock", this.frameNumber);
        this.obstacleSprite.type = "ROCK";
        this.obstacleSprite.health = 30;
        this.obstacleSprite.damage = 10;
        this.initialize(this.obstacleSprite);

    }
}