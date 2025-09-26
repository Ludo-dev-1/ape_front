import React, { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";

type ProductFromBackend = {
    id: number;
    name: string;
    description?: string;
    price: string; // string venant du backend
    stock: number;
    image_url?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    sale_id: number;
};

type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image_url?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    sale_id: number;
    quantity?: number;
};

type ProductsListProps = {
    saleId: string;
};

export default function ProductsList({ saleId }: ProductsListProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!saleId) return;

        console.log("➡️ useEffect déclenché avec saleId:", saleId);
        setLoading(true);
        setError(null);

        fetch(`http://localhost:5000/shop/sales/${saleId}/products`)
            .then((res) => {
                if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
                return res.json();
            })
            .then((data: ProductFromBackend[]) => {
                if (!Array.isArray(data)) throw new Error("Le backend n'a pas renvoyé un tableau.");

                const formattedData: Product[] = data.map((p) => ({
                    ...p,
                    price: parseFloat(p.price),
                    image_url: p.image_url || "",
                }));

                console.log("📦 Produits reçus :", formattedData);
                setProducts(formattedData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("💥 Erreur fetch :", err);
                setError(err.message);
                setProducts([]);
                setLoading(false);
            });
    }, [saleId]);

    if (loading)
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2 text-blue-500">Chargement des produits...</span>
            </div>
        );

    if (error) return <p className="text-red-500 mt-4">Erreur: {error}</p>;
    if (!products.length) return <p className="mt-4">Aucun produit disponible.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-fit">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow-md flex flex-col items-center"
                >
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    {product.image_url && (
                        <img src={`http://localhost:5000${product.image_url}`} alt={product.name} />
                    )}
                    {product.description && <p className="mt-2 text-gray-700 text-sm">{product.description}</p>}
                    <p className="mt-2 font-bold">{product.price} €</p>
                    <AddToCartButton product={{ ...product, quantity: 1 }} />
                </div>
            ))}
        </div>
    );
}
