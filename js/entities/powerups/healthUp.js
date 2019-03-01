
class HealthUp extends PowerUp{

    constructor(config){
        super(config);
        this.powerUpSprite = this.scene.physics.add.sprite(this.startingX, this.startingY, "healthUp");
        this.initialize(this.powerUpSprite);
    }

    onPickUp() {
        this.scene.character.playerSprite.health += 10;
        this.destroy();
    }
}