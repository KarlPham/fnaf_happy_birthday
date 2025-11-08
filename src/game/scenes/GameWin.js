import { Scene } from 'phaser';

export class WinScene extends Scene {
    constructor() {
        super('WinScene');
    }

    preload() {
        this.load.image('birthday_bg', 'assets/images/win/happy_birthday_poster.webp');
        this.load.audio('happy_birthday_song', 'assets/audio/happy_birthday_song.mp3');
        this.load.image('play_again_btn', 'assets/images/maingame/restart_btn.png');
    }

    create() {
        // Stretch the background to cover the whole canvas
        const bg = this.add.image(0, 0, 'birthday_bg').setOrigin(0, 0);
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;

        // Play birthday song
        this.sound.play('happy_birthday_song');

        const w = this.sys.game.config.width;
        const wish = [
            "Wow, it’s been 2 years since I last got to celebrate your birthday.",
            "So this year, I made a little game just for you. 🎮💖",
            "",
            "Happy birthday, my dear Mou! 🎂🎉",
            "",
            "Wishing you good health, lots of smiles, and endless cuteness.",
            "This past year was tough, but you made it through — and I’m so proud of you.",
            "",
            "Let’s keep going together, okay? Once we’ve both settled down, it’s going to be even better. ✨",
            "",
            "P.S. I made this in one day, so tell me what you think!"
        ].join('\n');

        const title = this.add.text(w / 2, 120, 'Happy Birthday, Mou! 🎂✨', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        const boxWidth = Math.min(720, w - 80);
        const msg = this.add.text(w / 2, 240, wish, {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            wordWrap: { width: boxWidth, useAdvancedWrap: true },
            align: 'center'
        }).setOrigin(0.5, 0);

        const panel = this.add.rectangle(w / 2, msg.y + msg.height / 2, boxWidth + 40, msg.height + 40, 0x14141c, 0.65)
            .setStrokeStyle(2, 0xffffff, 0.15)
            .setDepth(msg.depth - 1)
            .setOrigin(0.5);
    }
}
