
var game;
var globals;
var controller;

window.onload = function(){
    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }

    //isMobile == -1 -> Laptop or Desktop
    if (isMobile == -1) {
        var config = {
            type: Phaser.AUTO,
            width: 480,
            height: 640,
            parent: 'phaser-game ',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            isMobile: isMobile,
            scene: [SceneLoad, SceneGameOver, SceneTitle, SceneArcade]
        };
    } else {
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true
                }
            },
            isMobile: isMobile,
            scene: [SceneLoad, SceneGameOver, SceneTitle, SceneArcade]
        };
    }
    game = new Phaser.Game(config);
}