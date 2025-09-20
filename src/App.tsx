import { useEffect } from 'react';
import Phaser from 'phaser';
import VaultScene from './game/VaultScene';
import { HUD } from './components/HUD';

export default function App() {
    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 400,
            height: 600,
            parent: 'game-container',
            scene: [VaultScene],
        };

        new Phaser.Game(config);
    }, []);

    return (
        <div>
            <div id="game-container"></div>
            <HUD />
        </div>
    );
}
