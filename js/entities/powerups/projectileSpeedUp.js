

class ProjectileSpeedUp extends PowerUp{

    constructor(config){
        super(config);
        this.powerUpSprite = this.scene.physics.add.sprite(this.startingX, this.startingY, "projectileSpeedUp");
        this.initialize(this.powerUpSprite);
    }

    onPickUp() {
        this.scene.character.projectileSpeed -= 50;
        this.destroy();
    }
}