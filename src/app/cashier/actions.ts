'use server'

import { eq, sql } from "drizzle-orm"
import { db } from "../../../db"
import { orders, items_orders, items as itemsdb } from "../../../db/schema"
import type { CartItems } from "@/types/types"
import { revalidatePath } from "next/cache"

export async function writeRecord(items: CartItems[]) {
    try {
        const date = new Date()
        const record = await db.insert(orders).values({
            date: date
        }).returning({ orderId: orders.id })

        const orderId = record[0].orderId

        const items_order = items.map(async (item: CartItems) => {
            await db.transaction(async (tx) => {
                await tx.insert(items_orders).values({
                    items_id: item.id,
                    orders_id: orderId,
                    quantity: item.quantity
                })
                await tx.update(itemsdb).set({
                    stock: sql`${itemsdb.stock} - ${item.quantity}`
                }).where(eq(itemsdb.id, item.id))
            })
        })
        revalidatePath('/items')
    } catch (error) {
        throw new Error("failed to write record")
    }

}