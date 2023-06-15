import { AnimatedSprite, Container, Texture, Ticker } from "pixi.js";

export default class Coin {

    sprite;
    speed = 2;
    spinSpeed = 0.25;

    constructor(x, y) {
        const frames = [
            "assets/images/x1.png",
            "assets/images/x2.png",
            "assets/images/x3.png",
            "assets/images/x4.png",
            "assets/images/x5.png",
            "assets/images/x6.png",
        ];

        this.sprite = new AnimatedSprite(frames.map((frame) => Texture.from(frame)));
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.x = Math.random() * innerWidth;
        this.sprite.y = 0;
        this.sprite.play();
        this.sprite.animationSpeed = this.spinSpeed;
        Ticker.shared.add(this.update, this)


    }
    update(deltaTime) {
        this.sprite.y += this.speed * deltaTime;
    }

}
