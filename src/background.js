import { Sprite } from 'pixi.js';

export default class Background {
    constructor(file, width, height) {
        this.sprite = Sprite.from(file);
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.sprite.width = width;
        this.sprite.height = height;
    }

    addTo(stage) {
        // add background sprite to the stage
        stage.addChildAt(this.sprite, 0);
    }
}
