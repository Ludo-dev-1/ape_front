import React from "react";
import ProductsList from "./ProductsList";

export default function App() {
    const saleId = "1"; // <-- force un saleId ici pour tester

    console.log("saleId passé à ProductsList :", saleId);

    return (
        <div className="p-6">
            <h1>Boutique</h1>
            <ProductsList saleId={saleId} />
        </div>
    );
}
