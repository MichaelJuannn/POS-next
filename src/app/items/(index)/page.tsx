import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import Table from "./table"


async function getItem() {
    const itemsData = await db.select({
        id: items.id,
        name: items.name,
        price: items.price
    }).from(items)
    return itemsData
}

export default async function Items() {
    const data = await getItem()
    console.log(data)
    return (
        <div>
            <Table data={data} />
        </div>
    )
}