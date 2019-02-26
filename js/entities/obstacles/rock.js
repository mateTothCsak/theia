
class Rock extends Obstacle{

    constructor(config){
        super(config);
        this.obstacleSprite.type = "ROCK";
        this.obstacleSprite.health = 100;
        this.obstacleSprite.damage = 10;
    }
}