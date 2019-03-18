
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
        this.graphics.fillRect(0, 0, game.config.width, game.config.height);


        this.title = this.add.text(0, 0, "Well Played!");
        this.title.setFontFamily("Tahoma").setFontStyle("bold").setFontSize(game.config.width/8).setColor("#ded0b7");
        this.grid.placeAtIndex(17, this.title);

        this.listMaterials();


        //restart game button needed --> Nimbus sans bold font
        this.startButton = this.physics.add.sprite(0, 0, "gameStartButton");
        this.startButton.setInteractive();
        Align.scaleToGameWidth(this.startButton, 0.4);
        this.grid.placeAtIndex(187, this.startButton);

        this.startButton.on("pointerdown", this.startGame, this);

        this.isGameRestart = false;



    }

    update() {

        if(this.isGameRestart){
            let currentTime = new Date().getTime();
            if (this.gameStartTime + 600 <= currentTime) {
                this.isGameRestart = false;
                this.scene.start("SceneArcade");

            }
            if (this.gameStartTime + 300 <= currentTime) {
                this.startButton.setTexture("gameStartButton");
            }
        }
    }


    startGame(){
        this.startButton.setTexture("gameStartButtonClicked");
        this.gameStartTime = new Date().getTime();
        this.isGameRestart = true;
    }


    init(data)
    {
        this.materials = data.materials;
    }

    listMaterials(){
        let lineHeight = game.config.height/3;
        for(let material in this.materials){
            let shardKey = material.toLowerCase() + "Shard";
            let tempText = this.add.text(game.config.width/2.5, lineHeight, this.materials[material] + " x");
            tempText.setFontFamily("Tahoma").setFontStyle("bold").setFontSize(game.config.width/16).setColor("#ded0b7");
            let tempShard = this.add.sprite(tempText.x + tempText.displayWidth + game.config.width/30, lineHeight, shardKey).setOrigin(0, 0);
            Align.scaleToGameHeight(tempShard, 0.045);
            lineHeight += game.config.height/12;
        }
    }
}