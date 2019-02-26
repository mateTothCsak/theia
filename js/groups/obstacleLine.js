
class ObstacleLine{

    constructor(config){
        this.scene = config.scene;
        this.obstacles = [];
        this.createLevel1Line();


        this.previousObstacleTime = new Date().getTime();

        //this.startObstacles();

    }



    createLevel1Line(){
        this.obstacles.push(new Rock({scene: this.scene, spriteKey: "obstacleRock", location: 1,frameNumber: Random.randomBetween(2,0)}));
        this.obstacles.push(new Rock({scene: this.scene, spriteKey: "obstacleRock", location: 4,frameNumber: Random.randomBetween(2,0)}));
        this.obstacles.push(new Rock({scene: this.scene, spriteKey: "obstacleRock", location: 7,frameNumber: Random.randomBetween(2,0)}));
        this.obstacles.push(new Rock({scene: this.scene, spriteKey: "obstacleRock", location: 10,frameNumber: Random.randomBetween(2,0)}));
        this.obstacles.push(new Rock({scene: this.scene, spriteKey: "obstacleRock", location: 13,frameNumber: Random.randomBetween(2,0)}));
    }

    /*
    startObstacles(){
        for (let i = 0; i<this.obstacles.length; i++){
            this.obstacles[i].obstacleSprite.setVelocity(0, this.speedDown);
        }

    }*/

    makeObstacles(){
        this.d = new Date();
        this.currentTime = this.d.getTime();
        if (this.previousObstacleTime + 8000/this.scene.gameSpeed <= this.currentTime){
            this.childLine = new ObstacleLine({scene: this.scene});
            this.previousObstacleTime = this.currentTime;
        }
    }

}