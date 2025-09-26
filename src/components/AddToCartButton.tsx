import React from "react";
import { useCart, type Product } from "../stores/cartStore";

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const numericPrice = typeof product.price === "string" ? parseFloat(product.price) : product.price;


    return (
        <button
            onClick={() => {
                addToCart({ ...product, price: numericPrice });
                console.log("Produit ajouté au panier :", product);
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Ajouter au panier
        </button>

    );
}
