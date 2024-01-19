import Link from "next/link"
import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import Table from "./table"
import { like } from "drizzle-orm"
import Search from "./search"


async function getItem(query: string) {
    const itemsData = await db.select({
        id: items.id,
        name: items.name,
        price: items.price
    }).from(items).where(like(items.name, `%${query}%`))
    return itemsData
}

export default async function Items({ searchParams }: {
    searchParams: { q: string }
}) {
    const search = searchParams.q ?? ''
    const data = await getItem(search)
    return (
        <div>
            <div className="flex justify-end text-white font-bold">
                <Link href={'/items/add'}><button className="btn btn-primary">Add Item</button></Link>
            </div>
            <Search />
            <Table data={data} />
        </div>
    )
}