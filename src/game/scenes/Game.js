import { Scene } from 'phaser';

export class MainGame extends Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('office_bg', 'assets/images/maingame/office_bg.webp');
        this.load.image('animatronic', 'assets/images/animatronics/chika.png');
        this.load.image('flash_btn', 'assets/images/maingame/light_btn.png');
        this.load.image('sound_btn', 'assets/images/maingame/sound_btn.png');
        this.load.audio('birthday_sound', 'assets/sounds/birthday_sound.mp3');
    }

    create() {
        // Office background
        this.add.image(0, 0, 'office_bg').setOrigin(0, 0);

        // Animatronic, hidden by default
        const chika = this.animatronic = this.add.image(512, 275, 'animatronic').setVisible(true);
        chika.setScale(0.5);

        // Buttons
        const flash = this.flashBtn = this.add.image(260, 620, 'flash_btn').setInteractive();
        const sound = this.soundBtn = this.add.image(760, 620, 'sound_btn').setInteractive();

        // Buttons size
        flash.setScale(0.3);
        sound.setScale(0.3);
    }

}