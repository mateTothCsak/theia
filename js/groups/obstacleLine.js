
class ObstacleLine{

    constructor(config){
        this.scene = config.scene;
        this.obstacles = [];
        this.createLevel1Line();


        this.previousObstacleTime = new Date().getTime();


    }



    createLevel1Line(){
        this.obstacles.push(new Rock({scene: this.scene, location: 1,frameNumber: Random.randomBetween(2,0)}));
        this.obstacles.push(new Clay({scene: this.scene, location: 4,frameNumber: Random.randomBetween(2,0)}));
        this.obstacles.push(new Coal({scene: this.scene, location: 7,frameNumber: Random.randomBetween(2,0)}));
        this.obstacles.push(new Limestone({scene: this.scene, location: 10,frameNumber: Random.randomBetween(2,0)}));
        this.obstacles.push(new Rock({scene: this.scene, location: 13,frameNumber: Random.randomBetween(2,0)}));
    }


    makeObstacles(){
        this.d = new Date();
        this.currentTime = this.d.getTime();
        if (this.previousObstacleTime + 8000/this.scene.gameSpeed <= this.currentTime){
            this.childLine = new ObstacleLine({scene: this.scene});
            this.previousObstacleTime = this.currentTime;
        }
    }

    moveObstacles(){
        for(let i = 0; i<this.scene.obstacleGroup.getChildren().length; i++) {
            this.scene.obstacleGroup.getChildren()[i].y += this.scene.gameSpeed;
        }
    }

}