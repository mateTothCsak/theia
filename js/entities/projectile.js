

class Projectile {

    constructor(config){
        this.scene = config.scene;
        this.shooter = config.shooter;

        this.level = config.level;
        this.damage = config.damage;
        this.type = config.type;
        this.projectileSpeed = config.projectileSpeed;
        this.pictureKey = config.pictureKey;

        this.blastOff();
    }


    blastOff(){
        this.projectileSprite = this.scene.physics.add.sprite(this.shooter.x, this.shooter.y - this.shooter.height, this.pictureKey);
        this.projectileSprite.setFrame(this.level);
        Align.scaleToGameWidth(this.projectileSprite, 0.05);
        this.projectileSprite.setVelocity(0, this.projectileSpeed);
    }


}