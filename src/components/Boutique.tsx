import { CartProvider } from "../stores/cartStore";
import ProductsList from "./ProductsList";

type BoutiqueProps = {
    saleId: string;
    className?: string;
};

export default function Boutique({ saleId }: BoutiqueProps) {
    return (
        <CartProvider>
            <ProductsList saleId={saleId} className="bg-gray-100 py-12 m-auto w-full px-4" />
        </CartProvider>
    );
}
