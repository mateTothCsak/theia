

class DamageUp extends PowerUp{

    constructor(config){
        super(config);
        this.powerUpSprite = this.scene.physics.add.sprite(this.startingX, this.startingY, "damageUp");
        this.initialize(this.powerUpSprite);
    }

    onPickUp() {
        this.scene.character.projectileLevel += 1;
        this.scene.character.playerSprite.playerDamage += 1;
        this.destroy();
    }
}