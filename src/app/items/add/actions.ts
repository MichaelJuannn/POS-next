'use server'

import { sql } from "drizzle-orm"
import { db } from "../../../../db"
import { items } from "../../../../db/schema"

export async function createItem(formData: FormData) {
    const priceInt = parseInt(formData.get('price') as string)
    const stockInt = parseInt(formData.get('stock') as string)
    const rawFormData = {
        id: formData.get('id') as string,
        name: formData.get('name') as string,
        price: priceInt,
        stock: stockInt,
        description: formData.get('description') as string
    }
    if (!rawFormData.id || !rawFormData.name || !rawFormData.price || !rawFormData.description || !rawFormData.stock) {
        return 'Missing required fields'
    }
    const data = await db.insert(items).values(rawFormData).onConflictDoUpdate({ target: items.id, set: { stock: sql`${items.stock} + ${stockInt}` } })
}