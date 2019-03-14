
class Sidekick{

    constructor(config){
        this.scene = config.scene;
        this.type = config.type;
        this.level = config.level;
        this.animationPace = 8;


        this.projectileKey = "mainProjectile";

        this.previousShotTime = new Date().getTime();
    }

    initialize(sidekickSprite){
        Align.scaleToGameWidth(sidekickSprite, 0.1);
        this.sidekickSprite.y = this.scene.character.playerSprite.y;
        let characterFrames = this.scene.anims.generateFrameNumbers(sidekickSprite.typeName);
        this.animationKey = sidekickSprite.typeName + "run";
        this.runAnimation = this.scene.anims.create({key: this.animationKey, frames: characterFrames, frameRate: this.animationPace, repeat: -1});
        this.sidekickSprite.play(this.animationKey);
        this.sidekickSprite.body.setImmovable();
        this.sidekickSprite.isAlive = true;
        this.scene.sidekickGroup.add(this.sidekickSprite);
    }



    convertTypeName(type){
        let lowCaseType = type.toLowerCase();
        return type.substring(0, 1) + lowCaseType.substring(1, lowCaseType.length);
    }

    shootProjectiles(){
        if(this.previousShotTime +250 - this.sidekickSprite.attackSpeed){
            this.d = new Date();
            this.currentTime = this.d.getTime();
            if (this.previousShotTime + 250 -this.sidekickSprite.attackSpeed <= this.currentTime){
                new Projectile({
                    scene: this.scene,
                    shooter: this.sidekickSprite,
                    projectileSpeed: this.sidekickSprite.projectileSpeed,
                    level: this.level,
                    damage: this.sidekickSprite.damage,
                    pictureKey: this.projectileKey});
                this.previousShotTime = this.currentTime;
            }
        }
    }



}