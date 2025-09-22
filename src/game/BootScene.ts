import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('coin', 'assets/coin.png');
        this.load.image('shield', 'assets/shield.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
}
