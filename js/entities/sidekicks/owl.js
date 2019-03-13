
class Owl extends Sidekick{

    constructor(config){
        super(config);

        this.typeName = "owl" + this.convertTypeName(this.type);
        this.sidekickSprite = this.scene.physics.add.sprite(0, 0, this.typeName).setInteractive();


        this.sidekickSprite.health = 30;
        this.sidekickSprite.damage = 1*this.level;
        this.sidekickSprite.typeName = this.typeName;

        this.initialize(this.sidekickSprite);

    }


}