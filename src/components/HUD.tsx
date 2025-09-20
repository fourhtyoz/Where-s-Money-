import { observer } from 'mobx-react-lite';
import { gameStore } from '../store/gameStore';
import styles from './HUD.module.scss';

export const HUD = observer(() => {
    const canUpgrade = gameStore.coins >= 10 * gameStore.vaultLevel;

    return (
        <div className={styles.hud}>
            <h2>Vault Level: {gameStore.vaultLevel}</h2>
            <p>Coins: {gameStore.coins}</p>
            <button onClick={() => gameStore.upgradeVault()} disabled={!canUpgrade}>
                Upgrade Vault (Cost: {10 * gameStore.vaultLevel})
            </button>
        </div>
    );
});
