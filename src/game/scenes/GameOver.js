import { Scene } from 'phaser';

export class GameOverScene extends Scene {
  constructor() {
    super('GameOverScene');
  }

  preload() {
    this.load.image('office_bg', 'assets/images/maingame/office_bg.webp');
    // GIF split into frames: jumpscare_0.png, jumpscare_1.png ... or as a spritesheet
    this.load.spritesheet('jumpscare', '/assets/images/animatronics/chika_rizz.png', {
      frameWidth: 264, frameHeight: 240
    });
    this.load.audio('jumpscare_snd', 'assets/audio/jumpscare.mp3');
    this.load.image('play_again_btn', 'assets/images/maingame/restart_btn.png');
  }

  create() {
    this.add.image(0, 0, 'office_bg').setOrigin(0, 0).setAlpha(0.7);

    // Play jumpscare animation in the center
    const anim = this.add.sprite(512, 320, 'jumpscare');
    this.anims.create({
      key: 'scare',
      frames: this.anims.generateFrameNumbers('jumpscare', { start: 0, end: 174 }), // frame count example
      frameRate: 50,
      repeat: -1
    });
    anim.play('scare');

    // Play sound
    this.sound.play('jumpscare_snd');

    // Game Over text
    this.add.text(512, 175, 'GAME OVER', {
      fontSize: '64px', fill: '#ff0000', stroke: '#000', strokeThickness: 6
    }).setOrigin(0.5);

    // Play again button
    const btn = this.add.image(512, 525, 'play_again_btn').setInteractive();
    btn.setScale(0.3)
    btn.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
