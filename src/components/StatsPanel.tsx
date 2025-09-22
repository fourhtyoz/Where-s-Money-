import React from 'react';
import { observer } from 'mobx-react-lite';
import { gameStore } from '../store/gameStore';
import styles from './StatsPanel.module.scss';

export const StatsPanel = observer(() => {
    return (
        <div className={styles.statsPanel}>
            <h2>Vault Level: {gameStore.vaultLevel}</h2>
            <p>Coins: {gameStore.coins}</p>
        </div>
    );
});
