'use client'
import { ReactNode, useContext, useEffect, useRef } from "react"
import { CartContext } from "./CartContext"
import { useFormState } from "react-dom"
import { getItemById } from "../items/(index)/actions"
import { SubmitButton } from "../items/add/buttons"
import { Trash } from "lucide-react"

export default function Cart() {

    let initialStates: { id?: string } = {} // Add type annotation for 'id'
    const inputRef = useRef<HTMLInputElement>(null)
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext<any>(CartContext)
    // @ts-expect-error
    const [state, formAction] = useFormState(getItemById, {})
    useEffect(() => {
        if (state.item) {
            addToCart(state.item)
        }
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [state])

    const itemList = cartItems.map((item: any) => (
        <tr key={item.id}>
            <td>
                <div className="font-bold">{item.name}</div>
            </td>
            <td>
                {item.price}
            </td>
            <td>
                {item.quantity}
            </td>
            <td><button className="btn" onClick={() => removeFromCart(item)}><Trash /></button></td>
        </tr>
    ))
    return (
        <div>
            <h1 className="text-lg">Cart</h1>
            <div className="container flex ">
                <form action={formAction} className="basis-1/2">
                    <input ref={inputRef} type="text" className="input input-bordered" name='id' />
                    <SubmitButton />
                </form>
                <div className="basis-1/2 ">
                    <Table>
                        {itemList}
                    </Table>
                    <div className="flex justify-end items-center gap-4 mt-4">
                        <button className="btn btn-warning" onClick={clearCart}>Clear Cart</button>
                        <div className="">Total: {getCartTotal()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Table({ children }: { children: ReactNode }) {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Jumlah</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}