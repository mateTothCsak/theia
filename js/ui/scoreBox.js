
class ScoreBox extends Phaser.GameObjects.Container {
    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        this.locationIndex = config.locationIndex;

        this.scoreContainer = this.scene.add.image(100, 100, "scoreContainer").setOrigin(0, 0);
        Align.scaleToGameWidth(this.scoreContainer, .33)
        this.scene.grid.placeAtIndex(this.locationIndex, this.scoreContainer);

        this.scoreText = this.scene.add.text(0, 0, "", {fontSize: game.config.width/20, color: "#ccc09b", fontFamily: '"Times New Roman"'}).setOrigin(0, 0);
        this.scoreText.setFontStyle("bold");
        this.scoreText.y = this.scoreContainer.y + this.scoreContainer.displayHeight/4;
        this.scoreText.x = this.scoreContainer.x + this.scoreContainer.displayWidth/4;

        this.add(this.scoreContainer);
        this.add(this.scoreText);

        this.scene.add.existing(this);
    }
}