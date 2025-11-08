import { Scene } from 'phaser';

export class MainGame extends Scene {
    constructor() {
        super('GameScene');
    }
    init(){
        this.timer = 30;               
        this.power = 100;
        this.animatronicActive = false;
        this.animatronicTimer = null;
    }

    preload() {
        this.load.image('office_bg', 'assets/images/maingame/office_bg.webp');
        this.load.image('animatronic', 'assets/images/animatronics/chika.png');
        this.load.image('sound_btn', 'assets/images/maingame/sound_btn.png');
        this.load.audio('siu_sound', 'assets/audio/sound.mp3');
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
        this.animatronic = this.add.image(512, 275, 'animatronic').setVisible(false);
        this.animatronic.setScale(0.5);

        this.soundEffect = this.sound.add('siu_sound');

        // Start game timers
        this.time.addEvent({ delay: 1000, callback: this.onTimerTick, callbackScope: this, loop: true });
        this.scheduleNextAnimatronic();
    }


    handleSound() {
        if (this.animatronicActive && this.power > 0) {
            this.animatronic.setVisible(false);
            this.animatronicActive = false;
            this.power -= 12;
            this.soundEffect.play();
            if (this.animatronicTimer) {
                this.animatronicTimer.remove();
                this.animatronicTimer = null;
            }
            if (this.power <= 0) {
                this.power = 0;
                this.powerText.setFill('#f00');
            }
            this.powerText.setText(`Power: ${this.power}%`);
            this.scheduleNextAnimatronic(); // Schedule next, to avoid overlap
        }
    }

    scheduleNextAnimatronic() {
        const minDelay = 1200, maxDelay = 2800;
        const delay = Phaser.Math.Between(minDelay, maxDelay);
        this.time.delayedCall(delay, this.spawnAnimatronic, [], this);
    }

    // Show Animatronic and start their threat timer
    spawnAnimatronic() {
        if (this.animatronicActive) return; // Don't double-spawn
        this.animatronic.setVisible(true);
        this.animatronicActive = true;
        this.animatronicTimer = this.time.delayedCall(2000, () => {
            if (this.animatronicActive) {
                this.gameOver();
            }
        });
    }


    onTimerTick() {
        if (--this.timer <= 0) {
            this.scene.start('WinScene');
        } else {
            this.timerText.setText(`Time: ${this.timer}`);
        }
    }

    gameOver() {
        this.scene.start('GameOverScene');
    }

}

