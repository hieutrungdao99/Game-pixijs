import { AnimatedSprite, Container, Texture } from "pixi.js";

export default class Clampy {

    animatedClampy;
    speed = 0;
    moveX = 0;
    moveY = 0;

    constructor(x, y) {
        const clampyFrames = [
            "assets/images/1.png",
            "assets/images/2.png",
            "assets/images/3.png",
            "assets/images/4.png"
        ];

        this.animatedClampy = new AnimatedSprite(clampyFrames.map((frame) => Texture.from(frame)));
        this.animatedClampy.anchor.set(0.5);
        this.animatedClampy.x = x;
        this.animatedClampy.y = y;
        this.animatedClampy.play();
        this.animatedClampy.speed = 0.01
        // this.addChild(clampyFrames)
    }

    moveLeft(space) {
        this.moveX = -space;
    }

    moveRight(space) {
        this.moveX = space;
    }

    moveUp(space) {
        this.moveY = -space;
    }

    moveDown(space) {
        this.moveY = space;
    }

    update(deltaTime, screenWidth, screenHeight) {
        const clampyWidth = this.animatedClampy.width;
        const clampyHeight = this.animatedClampy.height;

        // move clampy
        const x = this.animatedClampy.x + this.moveX;
        const y = this.animatedClampy.y + this.moveY;

        // limit clampy position inside the screen
        if (x < clampyWidth / 2) {
            this.animatedClampy.x = clampyWidth / 2;
            console.log("Chim bay vao canh trai man hinh");
        } else if (x > screenWidth - clampyWidth / 2) {
            this.animatedClampy.x = screenWidth - clampyWidth / 2;
            console.log("Chim bay vao canh phai man hinh");
        } else {
            this.animatedClampy.x = x;
        }

        if (y < clampyHeight / 2) {
            this.animatedClampy.y = clampyHeight / 2;
            console.log("Chim bay len phia tren man hinh");
        } else if (y > screenHeight - clampyHeight / 2) {
            this.animatedClampy.y = screenHeight - clampyHeight / 2;
            console.log("Chim bay xuong phia duoi man hinh");
        } else {
            this.animatedClampy.y = y;
        }

        // flip clampy
        if (this.moveX > 0) {
            this.animatedClampy.scale.x = 1; // face right
        } else if (this.moveX < 0) {
            this.animatedClampy.scale.x = -1; // face left
        }

        // Check if clampy x coordinate is within bounds
        if (this.animatedClampy.x > screenWidth || this.animatedClampy.x < 0) {
            console.log("Chim bay ra ngoai man hinh - x: ", this.animatedClampy.x);
        }

        // Check if clampy y coordinate is within bounds
        if (this.animatedClampy.y > screenHeight || this.animatedClampy.y < 0) {
            console.log("Chim bay ra ngoai man hinh - y: ", this.animatedClampy.y);
        }
    }



    stopMoving() {
        this.moveX = 0;
        this.moveY = 0;
    }

}
