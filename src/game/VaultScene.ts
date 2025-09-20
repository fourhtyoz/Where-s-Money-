import Phaser from 'phaser';
import { gameStore } from '../store/gameStore';

export default class VaultScene extends Phaser.Scene {
    coin?: Phaser.GameObjects.Image;

    constructor() {
        super('VaultScene');
    }

    preload() {
        this.load.image('coin', 'assets/coin.png');
    }

    create() {
        this.coin = this.add.image(200, 300, 'coin').setInteractive();

        this.coin.on('pointerdown', () => {
            gameStore.addCoin();
        });
    }
}
