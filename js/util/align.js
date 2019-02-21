
class Align {
    static scaleToGameWidth(object, ratio){
        object.displayWidth = game.config.width*ratio;
        object.scaleY=object.scaleX;
    }

    static scaleToGameHeight(object, ratio){
        object.displayHeight = game.config.height*ratio;
        object.scaleX=object.scaleY;
    }

    static scaleToGameSize(object){
        object.displayWidth = game.config.width;
        object.displayHeight = game.config.height;
    }

    static center(obj){
        obj.x=game.config.width/2;
        obj.y=game.config.height/2;
    }

    static centerHorizontal(obj){
        obj.x=game.config.width/2;
    }

    static centerVertical(obj){
        obj.y=game.config.height/2;
    }
}