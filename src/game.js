import { Application, Ticker, Bounds, Container, Sprite, Sound, Graphics, Text, TextStyle, BitmapText, BitmapFont, BlurFilter, AnimatedSprite, Texture } from "pixi.js";
import Coin from './coin';
import Bom from './bom';
import Clampy from './clampy';
import Background from './background'
export class Game {

    static init() {

        this.app = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x1099bb,

        });
        document.body.appendChild(this.app.view);

        // hinh nen
        this.background = new Background('assets/images/bg4.jpg', window.innerWidth, window.innerHeight);
        this.background.addTo(this.app.stage);
        this.coinText = new Text("Coins: 0", { fontFamily: "Arial", fontSize: 24, fill: "fcad03" });
        this.coinText.position.set(10, 10);
        this.coinText2 = new Text("", { fontFamily: "Arial", fontSize: 40, fill: "black" });
        this.coinText2.anchor.set(0.5);
        this.coinText2.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        this.app.stage.addChild(this.coinText);
        this.app.stage.addChild(this.coinText2);
        this.lostCoins = 0;
        this.resetButton = new Text("Chơi lại", { fontFamily: "Arial", fontSize: 40, fill: "black" });
        this.resetButton.anchor.set(0.5);
        this.resetButton.position.set(this.app.screen.width / 2, this.app.screen.height / 2 + 50);
        this.app.stage.addChild(this.resetButton);
        //tao chim
        this.clampy = new Clampy(this.app.screen.width / 2, this.app.screen.height / 2);
        const animatedClampy = this.clampy.animatedClampy;
        // const clampyBounds = animatedClampy.getBounds();

        this.app.stage.addChild(this.clampy.animatedClampy);
        // event keydown
        this.onKeyDown = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this.onKeyDown);

        // event keyup
        this.onKeyUp = this.onKeyUp.bind(this);
        window.addEventListener('keyup', this.onKeyUp);



        // ticker
        Ticker.shared.add(this.update, this);
        this.coins = [];
        setInterval(() => {
            const coin = new Coin();
            this.app.stage.addChild(coin.sprite);
            this.coins.push(coin);

        }, 500);

        this.boms = [];
        setInterval(() => {
            const bom = new Bom();
            this.app.stage.addChild(bom.sprite);
            this.boms.push(bom);
        }, 500);
        this.resetButton.visible = false;
        this.resetButton.interactive = true;
        this.resetButton.on('mousedown', () => {
            // Reset lại game
            this.resetGame();
        });
    }

    static checkCollisions() {
        const clampyBounds = this.clampy.animatedClampy.getBounds();
        for (let i = 0; i < this.coins.length; i++) {
            const coin = this.coins[i];
            if (clampyBounds.intersects(coin.sprite.getBounds())) {
                coin.sprite.parent.removeChild(coin.sprite);
                this.coins.splice(i, 1);
                i--;
                this.lostCoins++;
                this.coinText.text = `Coins: ${this.lostCoins}`;
                if (this.lostCoins >= 50) {
                    // setInterval(() => {
                    //     const bom = new Bom();
                    //     this.app.stage.addChild(bom.sprite);
                    //     this.boms.push(bom);
                    // }, 700);
                }
            }
        }
    }
    static checkCollisions2() {
        const clampyBounds = this.clampy.animatedClampy.getBounds();
        for (let i = 0; i < this.boms.length; i++) {
            const bom = this.boms[i];
            if (clampyBounds.intersects(bom.sprite.getBounds())) {
                bom.sprite.parent.removeChild(bom.sprite);
                this.boms.splice(i, 1);
                i--;
                this.clampy.animatedClampy.parent.removeChild(this.clampy.animatedClampy);
                this.coinText2.text = `Bạn đã thua :(`;

                for (let i = 0; i < this.coins.length; i++) {
                    this.coins[i].sprite.parent.removeChild(this.coins[i].sprite);
                }
                this.coins = [];
                for (let i = 0; i < this.boms.length; i++) {
                    this.boms[i].sprite.parent.removeChild(this.boms[i].sprite);
                }
                this.boms = [];
                window.removeEventListener('keydown', this.onKeyDown);
                window.removeEventListener('keyup', this.onKeyUp);

                this.resetButton.visible = true; // Hiển thị nút Reset
                Ticker.shared.stop();
                return;

            }
        }
    }
    static update(deltaTime) {
        Game.clampy.update(deltaTime);
        Game.checkCollisions();
        Game.checkCollisions2();
    }


    static onKeyDown(event) {
        const keyCode = event.keyCode;
        const space = 5;

        // di chuyen theo phim mui ten
        if (keyCode === 37) {
            this.clampy.moveLeft(space);
        }
        else if (keyCode === 38) {
            this.clampy.moveUp(space);
        }
        else if (keyCode === 39) {
            this.clampy.moveRight(space);
        }
        else if (keyCode === 40) {
            this.clampy.moveDown(space);
        }
    }

    static onKeyUp(event) {
        const keyCode = event.keyCode;

        // reset di chuyển
        if (keyCode === 37 || keyCode === 39) {
            this.clampy.moveX = 0;
        }
        else if (keyCode === 38 || keyCode === 40) {
            this.clampy.moveY = 0;
        }
    }
    static resetGame() {
        // Xoá toàn bộ tiền và bom
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].sprite.parent.removeChild(this.coins[i].sprite);
        }
        this.coins = [];
        for (let i = 0; i < this.boms.length; i++) {
            this.boms[i].sprite.parent.removeChild(this.boms[i].sprite);
        }
        this.boms = [];
        this.lostCoins = 0;
        this.coinText.text = `Coins: ${this.lostCoins}`;
        this.clampy = new Clampy(this.app.screen.width / 2, this.app.screen.height / 2);
        this.app.stage.addChild(this.clampy.animatedClampy);
        this.coinText2.text = "";
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
        Ticker.shared.start();
        this.resetButton.visible = false;
    }

}

window.onload = function () {

    Game.init();



}
