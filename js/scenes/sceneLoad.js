
class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }

    preload(){

        this.bar = new Bar({scene: this, x: game.config.width/2, y: game.config.height/2});
        this.progText = this.add.text(game.config.width/2, game.config.height/2, "0%", {color: '#ffffff', fontSize: game.config.width/20});
        this.progText.setOrigin(0.5, 0.5);
        this.load.on('progress', this.onProgress, this);

        //title
        this.load.image("titleBackground", "images/backgrounds/titleBackground.jpg");
        this.load.image("title", "images/ui/title.png");
        this.load.image("gameStartButton", "images/ui/gameStartButton.png");
        this.load.image("gameStartButtonClicked", "images/ui/gameStartButtonClicked.png");

        //game over
        this.load.image("gameOverBackground", "images/backgrounds/gameOverBackground.jpg");


        //Arcade
        this.load.image("background1", "images/backgrounds/bg1.jpg");
        this.load.spritesheet('mainCharacter', 'images/characters/main.png', { frameWidth: 25, frameHeight: 30 });
        this.load.spritesheet('mainProjectile', 'images/projectiles/charprojectiles.png', {frameWidth: 14, frameHeight: 12});

        this.load.spritesheet('obstacleRock', 'images/obstacles/rock.png', {frameWidth: 180, frameHeight: 100});
        this.load.spritesheet('obstacleClay', 'images/obstacles/clay.png', {frameWidth: 180, frameHeight: 100});
        this.load.spritesheet('obstacleCoal', 'images/obstacles/coal.png', {frameWidth: 180, frameHeight: 100});
        this.load.spritesheet('obstacleLimestone', 'images/obstacles/limestone.png', {frameWidth: 180, frameHeight: 100});

        this.load.spritesheet('obstacleRockExplosion', 'images/effects/explosions/rockExplosion.png', {frameWidth: 255, frameHeight: 255});

        this.load.image('rockShard', 'images/obstacles/rockShard.png')
        this.load.image('clayShard', 'images/obstacles/clayShard.png')
        this.load.image('coalShard', 'images/obstacles/coalShard.png')
        this.load.image('limestoneShard', 'images/obstacles/limestoneShard.png')

        this.load.spritesheet('owlClay', 'images/sidekicks/owlClay.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('elephantRock', 'images/sidekicks/elephantRock.png', {frameWidth: 32, frameHeight: 32});


        this.load.image('scoreContainer', 'images/ui/scoreContainerLight.png');
        this.load.image('materialBag', 'images/ui/materialBag.png');

        this.load.image('damageUp', 'images/powerups/damageUp.png');
        this.load.image('attackSpeedUp', 'images/powerups/attackSpeedUp.png');
        this.load.image('projectileSpeedUp', 'images/powerups/projectileSpeedUp.png');
        this.load.image('healthUp', 'images/powerups/healthUp.png');



    }

    onProgress(value){
        this.bar.setPercent(value);
        let per = Math.floor(value*100)
        this.progText.setText(per);
    }

    create(){
        this.scene.start("SceneTitle");
    }


}

