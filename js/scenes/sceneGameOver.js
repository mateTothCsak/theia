
class SceneGameOver extends Phaser.Scene {
    constructor(){
        super('SceneGameOver');
    }

    create(){


        this.grid = new AlignGrid({scene: this, rows: 15, cols: 15});

        console.log(this.materials);


        this.background = this.add.sprite(0, 0, "gameOverBackground").setOrigin(0,0);
        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;

        //this.grid.showNumbers();

        this.graphics=this.add.graphics();
        this.graphics.fillStyle(0x000000, 0.4);
        this.backgroundRect = this.graphics.fillRect(0, 0, game.config.width, game.config.height);


        this.title = this.add.text(0, 0, "Well Played!");
        this.title.setFontFamily("Tahoma").setFontStyle("bold").setFontSize(game.config.width/8).setColor("#ded0b7");
        this.grid.placeAtIndex(17, this.title);


        //listing function for the materials


        //restart game button needed --> Nimbus sans bold font
        this.startButton = this.physics.add.sprite(0, 0, "gameStartButton");
        this.startButton.setInteractive();
        Align.scaleToGameWidth(this.startButton, 0.4);
        this.grid.placeAtIndex(187, this.startButton);

        this.startButton.on("pointerdown", this.startGame, this);



    }

    update() {

        let currentTime = new Date().getTime();
        if (this.isGameStart + 600 <= currentTime) {
            this.scene.start("SceneArcade");
        }
        if (this.isGameStart + 300 <= currentTime) {
            this.startButton.setTexture("gameStartButton");
        }
    }


        startGame(){
            this.startButton.setTexture("gameStartButtonClicked");
            this.isGameStart = new Date().getTime();
        }


    init(data)
    {
        this.materials = data.materials;
    }
}