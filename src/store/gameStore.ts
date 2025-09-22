import { makeAutoObservable, runInAction } from 'mobx';

class GameStore {
    coins = 0;
    vaultLevel = 1;
    achievements: string[] = [];
    fraudProtectionActive = false;

    constructor() {
        makeAutoObservable(this);
    }

    addCoin() {
        runInAction(() => {
            this.coins += 1;
        });
    }

    upgradeVault() {
        const levelPrize = 10 * this.vaultLevel;
        if (this.coins >= levelPrize) {
            runInAction(() => {
                this.coins = this.coins - levelPrize;
                this.vaultLevel += 1;
            });
        }
    }

    activateFraudProtection() {
        this.fraudProtectionActive = true;

        setTimeout(() => {
            this.fraudProtectionActive = false;
        }, 10000);
    }

    checkAchievements() {
        if (this.coins >= 10 && !this.achievements.includes('First 10 Coins')) {
            runInAction(() => {
                this.achievements.push('First 10 Coins');
            });
        }
        if (this.vaultLevel >= 2 && !this.achievements.includes('Vault Upgraded')) {
            runInAction(() => {
                this.achievements.push('Vault Upgraded');
            });
        }
    }

    removeCoins() {
        
    }
}

export const gameStore = new GameStore();
