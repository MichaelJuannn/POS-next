'use server'

import { eq } from "drizzle-orm"
import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import { revalidatePath } from "next/cache"

export async function updateName(name: string, id: string) {
    const updated = await db.update(items).set({ name: name }).where(eq(items.id, id)).execute()
    return revalidatePath(`/items/${id}`)
}

export async function updatePrice(price: number, id: string) {
    const updated = await db.update(items).set({ price: price }).where(eq(items.id, id)).execute()
    return revalidatePath(`/items/${id}`)
}

export async function updateDescription(description: string, id: string) {
    const updated = await db.update(items).set({ description: description }).where(eq(items.id, id)).execute()
    return revalidatePath(`/items/${id}`)
}