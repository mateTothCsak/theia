class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {


    }
    create() {
        this.scene.start("SceneArcade");
    }

    update() {
        //constant running loop
    }

    customFunctions(){

    }
}