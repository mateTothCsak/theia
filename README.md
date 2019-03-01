# Theia #
#### Open repository of the Theia HTML5 game

Theia is a HTML5 based shoot em up game, with a lot of RPG elements and supposedly a player driven economy. 
It is being developed using the Phaser JS framework.

As of now the game is still in early development stage, using placeholder visuals and temporary audio. 


For dev plans have a look at the 'devnotes' directory. 

---

This game is being made without any financial investments,
solely for the joy of creating an awesome experience for 
the future players and gaming community.

---

You can contribute to this project with:
* _Images / Sprites / Art_
* _Music and Sound effects_
* _Game design ideas_


---

Update log:

* V. 0.0.0.2
    * Obstacles (Rock)
        * they collide with projectiles and player character
        * their sprites are randomly generated
        * they come in lines of 5, fill out the whole screen-width
        * on being destroyed they disappear
    * ScoreBox
        * Counts player score based on survived run-time
        * Game gets faster after reaching milestones
    * PowerUps
        * They affect Damage, Health, Attack Speed or Projectile Speed on pick-up
    * WorldUtil class created, with functions that help to delete out of world objects
    * Random class with helper functions
    * Game application is fully responsive


* V. 0.0.0.1
    * Rolling background + character running animation
    * Horizontally draggable character
    * Character shoots bullets upwards
    * Bullets on level up change colors
