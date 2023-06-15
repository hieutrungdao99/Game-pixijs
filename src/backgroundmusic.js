import { Sound } from 'pixi.js'

export default class BackgroundMusic {
    constructor(musicPath) {
        this.music = new Sound(musicPath);
        this.isPlaying = false;
    }

    play(volume = 0.5, loop = true) {
        this.music.volume = volume;
        this.music.loop = loop;
        this.music.play();
        this.isPlaying = true;
    }

    stop() {
        this.music.stop();
        this.isPlaying = false;
    }
}
