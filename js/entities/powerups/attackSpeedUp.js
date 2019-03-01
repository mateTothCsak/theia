

class AttackSpeedUp extends PowerUp{

    constructor(config){
        super(config);
        this.powerUpSprite = this.scene.physics.add.sprite(this.startingX, this.startingY, "attackSpeedUp");
        this.initialize(this.powerUpSprite);
    }

    onPickUp() {
        this.scene.character.attackSpeed += 1;
        this.destroy();
    }
}