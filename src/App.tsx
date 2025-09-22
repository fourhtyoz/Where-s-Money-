import { useEffect } from 'react';
import Phaser from 'phaser';
import { BootScene } from './game/BootScene';
import { MenuScene } from './game/MenuScene';
import { VaultScene } from './game/VaultScene';
import { ProductScene } from './game/ProductScene';
import { StatsPanel } from './components/StatsPanel';
import { ProductsPanel } from './components/ProductsPanel';
// import { Achievements } from './components/Achievements';

export default function App() {
    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 400,
            height: 600,
            parent: 'game-container',
            scene: [BootScene, MenuScene, VaultScene, ProductScene],
        };

        new Phaser.Game(config);
    }, []);

    return (
        <div>
            <div id="game-container"></div>
            <StatsPanel />
            <ProductsPanel />
            {/* <Achievements /> */}
        </div>
    );
}
