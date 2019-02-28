
class Random{

    static randomBetween(max, min){
        return Math.floor((Math.random()*max) + min);
    }

    static randomlyPositiveOrNegative(number){
        if (this.randomBetween(2,1) == 1) {
            return -number;
        } else {
            return number;
        }
    }
}