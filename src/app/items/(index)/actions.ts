'use server'

import { like, or } from "drizzle-orm"
import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"


export async function getItemByName(query: string) {
    const itemsData = await db.select({
        id: items.id,
        name: items.name,
        price: items.price
    }).from(items).where(or(
        like(items.name, `%${query}%`),
        like(items.id, `${query}%`)
    ))
    return itemsData
}

export async function getItemById(prevState: any, formData: FormData) {
    const itemID = formData.get('id') as string
    const itemsData = await db.select({
        id: items.id,
        name: items.name,
        price: items.price,
    }).from(items).where(eq(items.id, itemID))
    if (itemsData.length === 0) {
        return {
            message: 'Item not found',
            item: null
        }
    }
    const item = itemsData[0]
    return {
        message: 'Item found',
        item: item
    }
}

export async function getAllItems() {
    const itemsData = await db.select({
        id: items.id,
        name: items.name,
        price: items.price
    }).from(items)
    return itemsData

}

export async function deleteItem(id: string) {
    await db.delete(items).where(eq(items.id, id))
    revalidatePath("/items")
}

