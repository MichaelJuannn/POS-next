export type Item = {
    id: string
    name: string
    price: number
    stock: number
    description?: string | null
}

export type CartItems = {
    id: string
    name: string
    price: number
    quantity: number
}