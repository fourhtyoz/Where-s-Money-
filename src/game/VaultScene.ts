import Phaser from 'phaser';
import { gameStore } from '../store/gameStore';

export class VaultScene extends Phaser.Scene {
    coins: Phaser.GameObjects.Image[] = [];
    vault!: Phaser.GameObjects.Image;
    lastEventTime = 0;
    eventInterval = 5000; // every 5 seconds
    threatIcon?: Phaser.GameObjects.Image;

    constructor() {
        super('VaultScene');
    }

    preload() {
        this.load.image('coin', 'assets/coin.png');
        this.load.image('vault', 'assets/vault.png');
        this.load.image('threat', 'assets/threat.png'); // icon for negative event
        this.load.image('shield', 'assets/shield.png'); // optional shield animation
    }

    create() {
        // Vault
        this.vault = this.add.image(200, 400, 'vault');

        // Coins
        for (let i = 0; i < 5; i++) {
            const x = 100 + i * 60;
            const y = 200;
            const coin = this.add.image(x, y, 'coin').setInteractive();
            coin.on('pointerdown', () => this.handleCoinClick(coin));
            this.coins.push(coin);
        }

        // Back to Menu
        this.add
            .text(20, 550, '← Back to Menu', { fontSize: '18px', color: '#0077ff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }

    handleCoinClick(coin: Phaser.GameObjects.Image) {
        gameStore.addCoin();

        // Bounce animation
        this.tweens.add({
            targets: coin,
            y: coin.y - 20,
            duration: 100,
            yoyo: true,
            ease: 'Power1',
        });

        // Vault upgrade feedback
        if (gameStore.coins >= 10 * gameStore.vaultLevel) {
            this.tweens.add({
                targets: this.vault,
                scale: 1.1,
                duration: 150,
                yoyo: true,
                ease: 'Power2',
            });
        }
    }

    triggerRandomEvent() {
        // Show threat icon above vault
        this.threatIcon = this.add.image(200, 350, 'threat');
        this.tweens.add({
            targets: this.threatIcon,
            y: 380,
            duration: 500,
            yoyo: true,
            ease: 'Power1',
            onComplete: () => this.handleEventOutcome(),
        });
    }

    handleEventOutcome() {
        if (this.threatIcon) this.threatIcon.destroy();

        if (gameStore.fraudProtectionActive) {
            // Show shield effect
            const shield = this.add.image(200, 400, 'shield');
            this.tweens.add({
                targets: shield,
                alpha: 0,
                duration: 800,
                onComplete: () => shield.destroy(),
            });
        } else {
            // Lose some coins
            const lostCoins = Math.min(5, gameStore.coins);
            gameStore.removeCoins(lostCoins);
        }
    }

    update(time: number) {
        // Idle coin animation
        this.coins.forEach((coin, index) => {
            coin.y += Math.sin(this.time.now / 300 + index) * 0.2;
        });

        // Random negative event trigger
        if (time - this.lastEventTime > this.eventInterval) {
            this.triggerRandomEvent();
            this.lastEventTime = time;
        }
    }
}
