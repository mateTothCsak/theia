
class PowerUp {

    constructor(config){
        this.scene = config.scene;
        this.spriteKey = config.spriteKey;
        this.startingX = config.startingX;
        this.startingY = config.startingY;
        this.horizontalVelocity = game.config.width/16;
        this.verticalVelocity = -this.scene.speedDown*2
        this.gravity = this.scene.speedDown*6;

        this.powerUpSprite = this.scene.physics.add.sprite(this.startingX, this.startingY, this.spriteKey);
        this.scene.powerUpGroup.add(this.powerUpSprite);
        Align.scaleToGameWidth(this.powerUpSprite, 0.08);
        this.powerUpSprite.setVelocity(Random.randomlyPositiveOrNegative(this.horizontalVelocity), this.verticalVelocity);
        this.powerUpSprite.setGravity(0, this.gravity);

        this.powerUpSprite.onPickUp = this.onPickUp;


    }

    onPickUp(){
        this.scene.character.projectileLevel += 1;
        this.scene.character.playerSprite.playerDamage += 1;
        this.destroy();
    }


}