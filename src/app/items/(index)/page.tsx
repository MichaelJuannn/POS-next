import Link from "next/link"
import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import Table from "./table"
import { like } from "drizzle-orm"
import Search from "./search"
import { getItemByName } from "./actions"

export default async function Items({ searchParams }: {
    searchParams: { q: string }
}) {
    const search = searchParams.q ?? ''
    const data = await getItemByName(search)
    return (
        <div className="bg-white p-4 rounded">
            <div className="flex justify-end text-white font-bold">
                <Link href={'/items/add'}><button className="btn btn-primary">Add Item</button></Link>
            </div>
            <Search />
            <Table data={data} />
        </div>
    )
}