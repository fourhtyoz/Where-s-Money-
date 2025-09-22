import React from 'react';
import { observer } from 'mobx-react-lite';
import { gameStore } from '../store/gameStore';
import styles from './Achievements.module.scss';

export const Achievements = observer(() => {
    return (
        <div className={styles.achievements}>
            <h3>Achievements</h3>
            {gameStore.achievements.length === 0 ? (
                <p>No achievements yet</p>
            ) : (
                <ul>
                    {gameStore.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                    ))}
                </ul>
            )}
        </div>
    );
});
