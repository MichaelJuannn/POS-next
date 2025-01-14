import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'
import { primaryKey } from 'drizzle-orm/sqlite-core'
export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").unique(),
    password: text("password"),
    roles: text("roles", { enum: ["admin", "user"] }),
})

export const items = sqliteTable("items", {
    id: text("id").primaryKey(),
    name: text("name"),
    price: integer("price"),
    stock: integer("stock").default(0),
    description: text("description"),
})

export const itemsRealtions = relations(items, ({ many }) => ({
    items_orders: many(items_orders)
}))

export const orders = sqliteTable("orders", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    date: integer("date", { mode: "timestamp" })
})

export const ordersRelations = relations(orders, ({ many }) => ({
    items_orders: many(items_orders)
}))

export const items_orders = sqliteTable("items_orders", {
    items_id: text("items_id").notNull().references(() => items.id),
    orders_id: integer("orders_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    quantity: integer("quantity")
}, (t) => ({
    pk: primaryKey({ columns: [t.items_id, t.orders_id] })
}))

export const items_ordersRelations = relations(items_orders, ({ one }) => ({
    item: one(items, {
        fields: [items_orders.items_id],
        references: [items.id]
    }),
    order: one(orders, {
        fields: [items_orders.orders_id],
        references: [orders.id]
    })
}))