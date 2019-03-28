
class SceneGameOver extends Phaser.Scene {
    constructor(){
        super('SceneGameOver');
    }

    create(){

        this.grid = new AlignGrid({scene: this, rows: 15, cols: 15});

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

        this.totalMaterials = 0;
        this.listMaterials();


        //restart game button needed --> Nimbus sans bold font
        this.startButton = this.physics.add.sprite(0, 0, "gameStartButton");
        this.startButton.setInteractive();
        Align.scaleToGameWidth(this.startButton, 0.4);
        this.grid.placeAtIndex(187, this.startButton);

        this.startButton.on("pointerdown", this.startGame, this);

        this.isGameRestart = false;

        console.log(this.id);
        console.log(this.score);
        console.log(this.totalMaterials);

        (async () => {
            const rawResponse = await fetch('http://localhost:8080/updateWealth', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({id: this.id, experience: this.score, gold: this.totalMaterials})
            });
            const content = await rawResponse.json();
        })();



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
        this.score = data.score;
        this.id = data.id;
    }

    listMaterials(){
        let lineHeight = game.config.height/4;
        for(let material in this.materials){
            let shardKey = material.toLowerCase() + "Shard";
            let tempText = this.add.text(game.config.width/2.5, lineHeight, this.materials[material] + " x");
            tempText.setFontFamily("Tahoma").setFontStyle("bold").setFontSize(game.config.width/16).setColor("#ded0b7");
            let tempShard = this.add.sprite(tempText.x + tempText.displayWidth + game.config.width/30, lineHeight, shardKey).setOrigin(0, 0);
            Align.scaleToGameHeight(tempShard, 0.045);
            lineHeight += game.config.height/12;
            this.totalMaterials += this.materials[material];
        }

        let scoreText = this.add.text(game.config.width/2.5, lineHeight, "Your score was: " + Math.round(this.score));
        scoreText.setFontFamily("Tahoma").setFontStyle("bold").setFontSize(game.config.width/16).setColor("#ded0b7");
        this.grid.placeAtIndex(138, scoreText);
        let coinText = this.add.text(game.config.width/2.5, lineHeight, "You sold your materials for " + this.totalMaterials + " coins!");
        coinText.setFontFamily("Tahoma").setFontStyle("bold").setFontSize(game.config.width/20).setColor("#ded0b7");
        this.grid.placeAtIndex(151, coinText);


    }
}