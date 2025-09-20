import { makeAutoObservable, runInAction } from 'mobx';

class GameStore {
    coins = 0;
    vaultLevel = 1;

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
}

export const gameStore = new GameStore();
