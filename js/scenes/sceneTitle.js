
class SceneTitle extends Phaser.Scene {
    constructor(){
        super('SceneTitle');
    }

    create(){
        this.grid = new AlignGrid({scene: this, rows: 15, cols: 15});


        this.background = this.add.sprite(0, 0, "titleBackground").setOrigin(0,0);
        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;

        //this.grid.showNumbers();

        this.title = this.add.sprite(0, 0, "title");
        Align.scaleToGameWidth(this.title, 0.48);
        this.grid.placeAtIndex(82, this.title);

        this.startButton = this.physics.add.sprite(0, 0, "gameStartButton");
        this.startButton.setInteractive();
        Align.scaleToGameWidth(this.startButton, 0.4);
        this.grid.placeAtIndex(172, this.startButton);

        this.startButton.on("pointerdown", this.startGame, this);


    }

    update(){
        let currentTime = new Date().getTime();
        if (this.isGameStart + 600 <= currentTime){
            this.scene.start("SceneArcade");
        }
        if (this.isGameStart + 300 <= currentTime){
            this.startButton.setTexture("gameStartButton");
        }
    }


    startGame(){
        this.startButton.setTexture("gameStartButtonClicked");
        this.isGameStart = new Date().getTime();
    }

}