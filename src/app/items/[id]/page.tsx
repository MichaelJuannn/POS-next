import { eq } from "drizzle-orm"
import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import UpdateDialog from "./dialog"
import { updateDescription, updateName, updatePrice, updateStock } from "./actions"

export default async function Page({ params }: { params: { id: string } }) {
    const itemData = await db.select().from(items).where(eq(items.id, params.id)).execute()
    if (itemData.length === 0 || !itemData[0].name || !itemData[0].price || !itemData[0].description || itemData[0].stock === null) { return <div>404</div> }
    return (
        <div className="capitalize bg-white rounded p-8">
            <h1 className="text-xl">{itemData[0].id}</h1>
            <hr />
            <div>
                Nama Barang : {itemData[0].name}
                <UpdateDialog currentValue={itemData[0].name} id={itemData[0].id} updateItem={updateName} />
            </div>
            <div>
                Harga Barang : {itemData[0].price}
                <UpdateDialog currentValue={itemData[0].price.toString()} id={itemData[0].id} updateItem={updatePrice} />
            </div>
            <div>
                Stock Barang : {itemData[0].stock}
                <UpdateDialog currentValue={itemData[0].stock.toString()} id={itemData[0].id} updateItem={updateStock} />
            </div>
            <div>
                Deskripsi Barang : {itemData[0].description}
                <UpdateDialog currentValue={itemData[0].description} id={itemData[0].id} updateItem={updateDescription} />
            </div>
        </div>
    )
}