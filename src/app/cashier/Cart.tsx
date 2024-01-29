'use client'
import { ReactNode, Suspense, useContext, useEffect, useRef, useState } from "react"
import { CartContext } from "./CartContext"
import { useFormState } from "react-dom"
import { getItemById } from "../items/(index)/actions"
import { SubmitButton } from "../items/add/buttons"
import { Trash } from "lucide-react"
import { writeRecord } from "./actions"
import { CartItems } from "@/types/types"

export default function Cart() {

    const [payAmount, setPayAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    let initialStates: { id?: string } = {} // Add type annotation for 'id'
    const inputRef = useRef<HTMLInputElement>(null)
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext<any>(CartContext);
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

    const itemList = cartItems.map((item: CartItems) => (
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
                <div className="basis-1/2">
                    <form action={formAction} >
                        <input ref={inputRef} type="text" className="input input-bordered" name='id' />
                        <SubmitButton />
                    </form>
                    <div className="my-3">
                        <input type="number" className="input input-bordered" onChange={(e) => setPayAmount(parseInt(e.currentTarget.value))} value={payAmount} />
                    </div>
                    <div className="space-x-5">
                        <button className="btn btn-warning" onClick={clearCart}>Clear Cart</button>
                        {!loading ? <button className="btn btn-success" onClick={async () => {
                            setLoading(true)
                            await writeRecord(cartItems)
                            clearCart()
                            setPayAmount(0)
                            setLoading(false)
                        }}>Audit Transaction</button> :
                            <button disabled className="btn btn-success">
                                <span className="loading loading-spinner loading-xs"></span>
                                loading
                            </button>
                        }
                    </div>
                    <div className="m-4 text-xl"> Total : {getCartTotal()}</div>
                    <div className="m-4 text-xl"> Kembalian : {payAmount - getCartTotal()}</div>
                </div>
                <div className="basis-1/2 ">
                    <Table>
                        {itemList}
                    </Table>

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