'use server'

import { db } from "../../../../db"
import { items } from "../../../../db/schema"

export async function createItem(formData: FormData) {
    const priceInt = parseInt(formData.get('price') as string)
    const rawFormData = {
        id: formData.get('id') as string,
        name: formData.get('name') as string,
        price: priceInt,
        description: formData.get('description') as string
    }
    if (!rawFormData.id || !rawFormData.name || !rawFormData.price || !rawFormData.description) {
        return 'Missing required fields'
    }
    const data = await db.insert(items).values(rawFormData)
}