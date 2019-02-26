

class Projectile {

    constructor(config){
        this.scene = config.scene;
        this.shooter = config.shooter;
        this.projectileSpeed = config.projectileSpeed;
        this.pictureKey = config.pictureKey;

        this.projectileSprite = this.scene.physics.add.sprite(this.shooter.x, this.shooter.y - this.shooter.height, this.pictureKey);
        this.projectileSprite.setFrame(config.level);
        this.scene.projectileSpriteGroup.add(this.projectileSprite);
        Align.scaleToGameWidth(this.projectileSprite, 0.05);
        this.projectileSprite.setVelocity(0, this.projectileSpeed);


        //make it to util!!
        this.projectileSprite.setCollideWorldBounds(true);
        this.projectileSprite.body.onWorldBounds = true;
        this.projectileSprite.body.world.on('worldbounds', function(body) {
            if (body.gameObject === this) {
                this.destroy();
            }
        }, this.projectileSprite);

        this.projectileSprite.level = config.level;
        this.projectileSprite.damage = config.damage;
        this.projectileSprite.type = config.type;


    }

}