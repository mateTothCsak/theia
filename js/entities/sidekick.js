
class Sidekick{

    constructor(config){
        this.scene = config.scene;
        this.type = config.type;
        this.level = config.level;
        this.animationPace = 8;
    }

    initialize(sidekickSprite){
        Align.scaleToGameWidth(sidekickSprite, 0.1);
        this.sidekickSprite.y = this.scene.character.playerSprite.y;
        let characterFrames = this.scene.anims.generateFrameNumbers(sidekickSprite.typeName);
        this.animationKey = sidekickSprite.typeName + "run";
        this.runAnimation = this.scene.anims.create({key: this.animationKey, frames: characterFrames, frameRate: this.animationPace, repeat: -1});
        this.sidekickSprite.play(this.animationKey);
        this.sidekickSprite.body.setImmovable();
    }



    convertTypeName(type){
        let lowCaseType = type.toLowerCase();
        return type.substring(0, 1) + lowCaseType.substring(1, lowCaseType.length);
    }



}