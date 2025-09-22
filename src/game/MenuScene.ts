import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        // Game title
        this.add.text(100, 100, "Where's my money?", { fontSize: '32px', color: '#333' });

        // Button config
        const buttonStyle = { fontSize: '20px', color: '#0077ff' };
        const startY = 180;
        const spacing = 50;

        // Start Game
        this.add
            .text(120, startY, 'Start Game', buttonStyle)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('VaultScene'));

        // Products
        this.add
            .text(120, startY + spacing, 'Products', buttonStyle)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('ProductScene'));

        // Tutorial
        this.add
            .text(120, startY + spacing * 2, 'Tutorial', buttonStyle)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('TutorialScene'));

        // Achievements
        this.add
            .text(120, startY + spacing * 3, 'Achievements', buttonStyle)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('AchievementsScene'));

        // Leaderboard
        this.add
            .text(120, startY + spacing * 4, 'Leaderboard', buttonStyle)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('LeaderboardScene'));

        // Event / Random Events
        this.add
            .text(120, startY + spacing * 5, 'Events', buttonStyle)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('EventScene'));

        // Credits
        this.add
            .text(120, startY + spacing * 6, 'Credits', buttonStyle)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('CreditsScene'));
    }
}
