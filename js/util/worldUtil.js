class WorldUtil
{
    static checkCollide(obj1, obj2){
        var distX = Math.abs(obj1.x-obj2.x);
        var distY = Math.abs(obj1.y-obj2.y);

        if (distX<obj1.width/2 && distY<obj1.height/2){
            return true;
        }
        return false;
    }

    static setDraggable(scene, objectSprite){
        scene.input.setDraggable(objectSprite);
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
        });
    }

    static unsetDraggable(scene, objectSprite){
        scene.input.setDraggable(objectSprite, false);
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        });
    }


    static setDeleteOnWorldOutBottom(scene, objectSprite){
        // do not apply if starting from top
        if (objectSprite.y < game.config.height/6){
            scene.time.delayedCall(1000, this.setDeleteOnWorldOutBottom, [scene, objectSprite], this);
        } else {
            try {
                objectSprite.setCollideWorldBounds(true);
                objectSprite.body.onWorldBounds = true;
                objectSprite.body.world.on('worldbounds', function (body) {
                    if (body.gameObject === this) {
                        this.destroy();
                    }
                }, objectSprite);
            } catch (err){}
            // if object gets destroyed too fast the else statement can't run on undefined
        }
    }

    static setDeleteOnWorldOut(objectSprite){
        objectSprite.setCollideWorldBounds(true);
        objectSprite.body.onWorldBounds = true;
        objectSprite.body.world.on('worldbounds', function (body) {
            if (body.gameObject === this) {
                this.destroy();
            }
        }, objectSprite);
    }


}