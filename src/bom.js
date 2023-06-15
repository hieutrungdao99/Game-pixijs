import { AnimatedSprite, Container, Texture, Ticker } from "pixi.js";

export default class Coin {

    sprite;
    speed = 2;
    constructor() {
        const frames = [
            "assets/images/bom3.png"
        ];
        this.sprite = new AnimatedSprite(frames.map((frame) => Texture.from(frame)));
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.x = Math.random() * innerWidth;
        this.sprite.y = 0;
        this.sprite.play();
        Ticker.shared.add(this.update, this)
    }
    update(deltaTime) {
        this.sprite.y += this.speed * deltaTime;
    }

}
