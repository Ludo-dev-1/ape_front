// AppProviderCart.tsx
import React, { type ReactNode } from "react";
import { CartProvider } from "../stores/cartStore";

type AppProviderCartProps = {
    children: ReactNode;
};

export default function AppProviderCart({ children }: AppProviderCartProps) {
    return <CartProvider>{children}</CartProvider>;
}
