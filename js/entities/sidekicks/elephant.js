

class Elephant extends Sidekick{

    constructor(config){
        super(config);

        this.typeName = "elephant" + this.convertTypeName(this.type);
        this.sidekickSprite = this.scene.physics.add.sprite(0, 0, this.typeName).setInteractive();

        this.sidekickSprite.health = 50;
        this.sidekickSprite.damage =  0.75*this.level;
        this.sidekickSprite.typeName = this.typeName;

        this.initialize(this.sidekickSprite);

    }


}