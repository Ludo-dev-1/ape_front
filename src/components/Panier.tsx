import React from "react";
import { useCart } from "../stores/cartStore";

export default function PanierComponent() {
    const { cart, removeFromCart, clearCart } = useCart();

    if (!cart.length) return <p>Votre panier est vide.</p>;

    return (
        <div>
            <h2>Mon panier</h2>
            <ul>
                {cart.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.quantity} x {product.price} €
                        <button onClick={() => removeFromCart(product.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <button onClick={clearCart}>Vider le panier</button>
        </div>
    );
}
