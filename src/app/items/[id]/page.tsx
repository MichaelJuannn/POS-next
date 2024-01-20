import { eq } from "drizzle-orm"
import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import Dialog from "./dialog"
import { updateDescription, updateName, updatePrice } from "./actions"

export default async function Page({ params }: { params: { id: string } }) {
    const itemData = await db.select().from(items).where(eq(items.id, params.id)).execute()
    if (itemData.length === 0 || !itemData[0].name || !itemData[0].price || !itemData[0].description) { return <div>404</div> }
    return (
        <div className="capitalize bg-white rounded p-8">
            <h1 className="text-xl">{itemData[0].id}</h1>
            <hr />
            <div>
                Nama Barang : {itemData[0].name}
                <Dialog currentValue={itemData[0].name} id={itemData[0].id} updateItem={updateName} />
            </div>
            <div>
                Harga Barang : {itemData[0].price}
                <Dialog currentValue={itemData[0].price.toString()} id={itemData[0].id} updateItem={updatePrice} />
            </div>
            <div>
                Deskripsi Barang : {itemData[0].description}
                <Dialog currentValue={itemData[0].description} id={itemData[0].id} updateItem={updateDescription} />
            </div>
        </div>
    )
}