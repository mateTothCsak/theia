
class Rock extends Obstacle{

    constructor(config){
        super(config);
        this.type = "ROCK";
        this.health = 100;
        this.damage = 10;
    }
}