
import { CartProvider } from "./CartContext";

export default function CashierLayout({ children }: { children: React.ReactNode }) {

    return (
        <CartProvider>
            {children}
        </CartProvider>
    )
}