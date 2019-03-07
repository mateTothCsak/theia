
class ObstacleLine{

    constructor(config){
        this.scene = config.scene;
        this.obstacles = [];

        this.previousObstacleTime = new Date().getTime();

        this.obstaclesByLevel = ObstacleLevels.levels();

        this.createLine(this.scene.gameLevel);

    }



    createLine(gameLevel){

        let levelObstacles = this.fillArray(gameLevel);

        this.shuffleObstacle(1, levelObstacles);
        this.shuffleObstacle(4, levelObstacles);
        this.shuffleObstacle(7, levelObstacles);
        this.shuffleObstacle(10, levelObstacles);
        this.shuffleObstacle(13, levelObstacles);

    }



    shuffleObstacle(location, obstacleArray){
        let type = obstacleArray[Math.floor(Math.random()*obstacleArray.length)];
        let frameNumber = Random.randomBetween(2,0);

        switch (type) {
            case "CLAY":
                this.obstacles.push(new Clay({scene: this.scene, location: location,frameNumber: frameNumber}));
                break;
            case "LIMESTONE":
                this.obstacles.push(new Limestone({scene: this.scene, location: location,frameNumber: frameNumber}));
                break;
            case "COAL":
                this.obstacles.push(new Coal({scene: this.scene, location: location,frameNumber: frameNumber}));
                break;
            case "ROCK":
                this.obstacles.push(new Rock({scene: this.scene, location: location,frameNumber: frameNumber}));
                break;
        }
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

    fillArray(gameLevel){
        let tempObstaclesArr = []
        for (let obstacle in this.obstaclesByLevel[gameLevel]){
            for (let i = 0; i<this.obstaclesByLevel[gameLevel][obstacle]; i++){
                tempObstaclesArr.push(obstacle);
            };
        }
        return tempObstaclesArr;
    }

}