import Cart from "./Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";


export default async function Page() {
    return (
        <div className="bg-white p-4 rounded min-h-screen">
            <Cart />
        </div>
    )
}