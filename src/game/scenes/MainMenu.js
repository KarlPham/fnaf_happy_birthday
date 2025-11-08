import { Scene } from 'phaser';

 export class MainMenuScene extends Scene{
    constructor() {
    super('MainMenuScene');
  }

  preload() {
    // Load background and button assets
    this.load.image('menu_bg', 'assets/images/menu/menu_bg.jpg');
    this.load.image('start_btn', 'assets/images/menu/start_btn_1.png');
    }

    create() {
    // Display the background image, full screen
    const bg = this.add.image(0, 0, 'menu_bg').setOrigin(0, 0);
    bg.displayWidth = this.sys.game.config.width;
    bg.displayHeight = this.sys.game.config.height;

    // Add and center Start button
    const { width, height } = this.sys.game.config;
    const startBtn = this.add.image(width/2, height/2.5, 'start_btn').setInteractive();
    startBtn.setScale(0.2); // Scale as needed for appearance

    // Clicking the button starts the Game scene
    startBtn.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}

