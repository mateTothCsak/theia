
class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }

    preload(){

        this.bar = new Bar({scene: this, x: game.config.width/2, y: game.config.height/2});
        this.progText = this.add.text(game.config.width/2, game.config.height/2, "0%", {color: '#ffffff', fontSize: game.config.width/20});
        this.progText.setOrigin(0.5, 0.5);
        this.load.on('progress', this.onProgress, this);



        //Arcade
        this.load.image("background1", "images/backgrounds/bg1.jpg");
        this.load.spritesheet('mainCharacter', 'images/characters/main.png', { frameWidth: 25, frameHeight: 30 });
        this.load.spritesheet('mainProjectile', 'images/projectiles/charprojectiles.png', {frameWidth: 14, frameHeight: 12});


    }

    onProgress(value){
        console.log(value);
        this.bar.setPercent(value);
        var per = Math.floor(value*100)
        this.progText.setText(per);
    }

    create(){
        this.scene.start("SceneTitle");
    }
}
