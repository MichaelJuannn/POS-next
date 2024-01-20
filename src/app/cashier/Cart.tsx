'use client'
import { useContext, useEffect, useRef } from "react"
import { CartContext } from "./CartContext"
import { useFormState } from "react-dom"
import { getItemById } from "../items/(index)/actions"
import { SubmitButton } from "../items/add/buttons"

export default function Cart() {

    let initialStates: { id?: string } = {} // Add type annotation for 'id'
    const inputRef = useRef<HTMLInputElement>(null)
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext<any>(CartContext)
    //@ts-expect-error
    const [state, formAction] = useFormState(getItemById, {})
    useEffect(() => {
        if (state.item) {
            addToCart(state.item)
        }
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [state])
    console.log(cartItems)
    return (
        <div>
            <h1 className="text-lg">Cart</h1>
            <form action={formAction}>
                <input ref={inputRef} type="text" className="input" name='id' />
                <SubmitButton />
            </form>
        </div>
    )
}