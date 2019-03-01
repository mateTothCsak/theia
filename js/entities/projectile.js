

class Projectile {

    constructor(config){
        this.scene = config.scene;
        this.shooter = config.shooter;
        this.projectileSpeed = config.projectileSpeed;
        this.pictureKey = config.pictureKey;

        this.projectileSprite = this.scene.physics.add.sprite(this.shooter.x, this.shooter.y - this.shooter.height, this.pictureKey);
        this.projectileSprite.setFrame(config.level);
        this.scene.projectileGroup.add(this.projectileSprite);
        Align.scaleToGameWidth(this.projectileSprite, 0.05);
        this.projectileSprite.setVelocity(0, this.projectileSpeed);


        this.projectileSprite.level = config.level;
        this.projectileSprite.damage = config.damage;
        this.projectileSprite.type = config.type;

        WorldUtil.setDeleteOnWorldOut(this.projectileSprite);
    }

}