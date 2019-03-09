

class Obstacle{

    constructor(config){
        this.scene = config.scene;
        this.spriteKey = config.spriteKey;
        this.frameNumber = config.frameNumber;
        this.location = config.location;
    }

    initialize(obstacleSprite){
        Align.scaleToGameWidth(this.obstacleSprite, 0.20);
        this.scene.grid.placeAtIndex(this.location, this.obstacleSprite);
        this.obstacleSprite.y -= 100;
        this.scene.obstacleGroup.add(this.obstacleSprite);
        this.obstacleSprite.body.setImmovable();

        this.obstacleSprite.scene = this.scene;
        this.obstacleSprite.dropShards = this.dropShards;
        this.obstacleSprite.explode = this.explode;

        WorldUtil.setDeleteOnWorldOutBottom(this.scene, this.obstacleSprite);
    }

    explode(){
        this.explosion = this.scene.physics.add.sprite(this.x, this.y, "obstacleRockExplosion");
        Align.scaleToGameWidth(this.explosion, 0.3);
        let characterFrames = this.scene.anims.generateFrameNumbers("obstacleRockExplosion");

        this.explosionAnimation = this.scene.anims.create({key: 'explode', frames: characterFrames, frameRate: 16, repeat: 0, onComplete: this.dropShards()});
        this.scene.scrollingGroup.add(this.explosion);
        this.explosion.play('explode');
        //explosion animation won't be destroyed
    }


    dropShards(){
        let dropAmount = Random.randomBetween(10, 3);
        for (let i = 0; i < dropAmount; i++) {

            let positionX = Random.randomBetween(this.displayWidth, 0)
            positionX = Random.randomlyPositiveOrNegative(positionX) + this.x;

            let positionY = Random.randomBetween(this.displayHeight, 0);
            positionY = Random.randomlyPositiveOrNegative(positionY) + this.y;

            let shard = this.scene.physics.add.sprite(positionX, positionY, "rockShard");

            let angle = Random.randomBetween(360, 1);
            shard.angle = angle;

            this.scene.shardGroup.add(shard);
            Align.scaleToGameWidth(shard, 0.03);
            this.scene.physics.moveTo(shard, this.scene.materialBag.x + this.scene.materialBag.displayWidth/2, this.scene.materialBag.y + this.scene.materialBag.displayHeight/2, game.config.height / 2);

            WorldUtil.setDeleteOnWorldOut(shard);
        }
    }





}