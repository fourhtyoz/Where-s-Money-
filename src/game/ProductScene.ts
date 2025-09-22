import Phaser from 'phaser';
import { gameStore } from '../store/gameStore';
import products from '../products.json';

type Deposit = {
    sprite: Phaser.GameObjects.Image;
    targetY: number;
    growth: number;
    progressBar: Phaser.GameObjects.Graphics;
    elapsed: number;
    duration: number;
};
export class ProductScene extends Phaser.Scene {
    deposits: Deposit[] = [];
    vault!: Phaser.GameObjects.Image;
    infoText!: Phaser.GameObjects.Text;

    constructor() {
        super('ProductScene');
    }

    create() {
        // Background
        this.cameras.main.setBackgroundColor('#e0f7fa');

        // Vault
        this.vault = this.add.image(200, 450, 'vault');

        // Info text
        this.infoText = this.add.text(20, 20, '', {
            fontSize: '16px',
            color: '#000',
            wordWrap: { width: 360 },
        });

        // Render each product dynamically
        const xOffset = 60;
        products.forEach((product: any, index: number) => {
            const sprite = this.add
                .image(xOffset + index * 100, 100, product.icon)
                .setInteractive();

            if (product.interaction === 'drag_drop') {
                this.input.setDraggable(sprite);
                sprite.on('pointerover', () => this.infoText.setText(product.tooltip));
            }

            if (product.interaction === 'click') {
                sprite.on('pointerdown', () => {
                    this.infoText.setText(product.tooltip);
                    if (product.id === 'fraud_protection') {
                        gameStore.activateFraudProtection();
                    }
                });
            }
        });

        // Drag events
        this.input.on('drag', (pointer: any, gameObject: any, dragX: number, dragY: number) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer: any, gameObject: any) => {
            const distance = Phaser.Math.Distance.Between(
                gameObject.x,
                gameObject.y,
                this.vault.x,
                this.vault.y
            );
            if (distance < 80) {
                this.depositCoin(gameObject);
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        this.add
            .text(20, 550, '← Back to Menu', { fontSize: '18px', color: '#0077ff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }

    depositCoin(coin: Phaser.GameObjects.Image) {
        const product = products.find(
            (p: any) => p.icon === coin.texture.key && p.interaction === 'drag_drop'
        );
        if (!product) return;

        coin.disableInteractive();

        // Create progress bar
        const progressBar = this.add.graphics();
        progressBar.fillStyle(0x76c7c0, 1); // teal color
        progressBar.fillRect(coin.x - 15, coin.y - 40, 30, 5);

        const deposit: Deposit = {
            sprite: coin,
            targetY: this.vault.y - 50,
            growth: product.growth,
            progressBar,
            elapsed: 0,
            duration: 5000, // 5 seconds growth
        };
        this.deposits.push(deposit);

        this.tweens.add({
            targets: coin,
            y: deposit.targetY,
            duration: 800,
            ease: 'Power2',
            onComplete: () => {
                this.infoText.setText(product.tooltip);
            },
        });
    }

    update(time: number, delta: number) {
        this.deposits.forEach((d) => {
            // Bounce animation
            d.sprite.y += Math.sin(this.time.now / 200) * 0.2;

            // Progress animation
            d.elapsed += delta;
            const progress = Phaser.Math.Clamp(d.elapsed / d.duration, 0, 1);

            // Redraw progress bar
            d.progressBar.clear();
            d.progressBar.fillStyle(0xcccccc, 1);
            d.progressBar.fillRect(d.sprite.x - 15, d.sprite.y - 40, 30, 5); // background
            d.progressBar.fillStyle(0x76c7c0, 1);
            d.progressBar.fillRect(d.sprite.x - 15, d.sprite.y - 40, 30 * progress, 5); // foreground

            // Complete growth
            if (progress >= 1 && !d.progressBar.getData('completed')) {
                d.progressBar.setData('completed', true);
                gameStore.addCoin(); // growth applied
            }
        });
    }
}
