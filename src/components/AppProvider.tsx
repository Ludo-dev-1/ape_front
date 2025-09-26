import React from "react";
import { CartProvider } from "../stores/cartStore";
import ProductsList from "./ProductsList";

type AppProviderProps = {
    saleId: string;
};

export default function AppProvider({ saleId }: AppProviderProps) {
    console.log("AppProvider monté côté client");
    return (
        <CartProvider>
            <ProductsList saleId={saleId} />
        </CartProvider>
    );
}
