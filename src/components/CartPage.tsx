import { CartProvider } from "../stores/cartStore";
import Panier from "./Panier";

export default function CartPage() {
    return (
        <CartProvider>
            <Panier />
        </CartProvider>
    );
}
