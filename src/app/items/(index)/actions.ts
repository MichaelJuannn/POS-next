'use server'

import { like } from "drizzle-orm"
import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"


export async function getItem(query: string) {
    const itemsData = await db.select({
        id: items.id,
        name: items.name,
        price: items.price
    }).from(items).where(like(items.name, `%${query}%`))
    return itemsData
}

export async function deleteItem(id: string) {
    await db.delete(items).where(eq(items.id, id))
    revalidatePath("/items")
}