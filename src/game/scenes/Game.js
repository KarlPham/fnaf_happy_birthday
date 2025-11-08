import { Scene } from 'phaser';

export class MainGame extends Scene {
    constructor() {
        super('GameScene');
        this.animatronics = [];
        this.baseReactionTime = 2000; // ms for first spawn
        this.minReactionTime = 700;    // ms for toughest/fastest spawn
        this.spawnInterval = 1700;     // ms (how often a new animatronic arrives)
        this.timer = 30;               // seconds to survive
        this.power = 100;
        this.animatronicReappearCount = {};
    }

    preload() {
        this.load.image('office_bg', 'assets/images/maingame/office_bg.webp');
        this.load.image('animatronic', 'assets/images/animatronics/chika.png');
        this.load.image('sound_btn', 'assets/images/maingame/sound_btn.png');
        this.load.audio('birthday_sound', 'assets/sounds/birthday_sound.mp3');
    }

    create() {
        // Office background
        this.add.image(0, 0, 'office_bg').setOrigin(0, 0);

        // UI Text
        this.timerText = this.add.text(40, 40, `Time: ${this.timer}`, { fontSize: '32px', fill: '#fff' });
        this.powerText = this.add.text(40, 80, `Power: ${this.power}%`, { fontSize: '28px', fill: '#0f0' });

        // Buttons
        this.soundBtn = this.add.image(512, 620, 'sound_btn').setInteractive();
        this.soundBtn.setScale(0.2);
        this.soundBtn.on('pointerdown', () => this.handleSound());

        // Animatronic, hidden by default
        const chika = this.animatronic = this.add.image(512, 275, 'animatronic').setVisible(true);
        chika.setScale(0.5);

        this.spawnAnimatronic();

        this.time.addEvent({ delay: 3000, callback: this.spawnAnimatronic, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 1000, callback: this.onTimerTick, callbackScope: this, loop: true });
    }


    handleSound() {
        if (this.animatronic.visible && this.power > 0) {
            this.animatronic.setVisible(false);
            this.power -= 15;
            this.powerText.setText(`Power: ${this.power}%`);
            this.sound.play('birthday_sound');
            if (this.power <= 0) this.gameOver();
        }
    }

    spawnAnimatronic() {
        if (!this.animatronic.visible) {
            this.animatronic.setVisible(true);
            this.time.delayedCall(2000, () => {
                if (this.animatronic.visible) {
                    this.gameOver();
                }
            });
        }
    }

    onTimerTick() {
        if (--this.timer <= 0) {
            this.scene.start('WinScene');
        } else {
            this.timerText.setText(`Time: ${this.timer}`);
        }
    }

}

