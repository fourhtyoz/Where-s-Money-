import React from 'react';
import { observer } from 'mobx-react-lite';
import { gameStore } from '../store/gameStore';
import products from '../products.json';
import styles from './ProductsPanel.module.scss';

export const ProductsPanel = observer(() => {
    const handleProductClick = (product: any) => {
        if (product.interaction === 'click') {
            if (product.id === 'fraud_protection') {
                gameStore.activateFraudProtection();
            }
            // Future products can have other effects here
        }
    };

    return (
        <div className={styles.productsPanel}>
            {products.map((product) => {
                if (product.interaction === 'click') {
                    const isActive =
                        product.id === 'fraud_protection' && gameStore.fraudProtectionActive;
                    return (
                        <button
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            disabled={isActive}
                        >
                            {isActive ? `${product.name} Active` : product.name}
                        </button>
                    );
                }
                return null; // drag-drop products handled in game scene
            })}
        </div>
    );
});
