import Link from "next/link"
import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import Table from "./table"
import { like } from "drizzle-orm"
import Search from "./search"
import { getItem } from "./actions"




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