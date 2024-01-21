import { db } from "../../../../db"
import { items } from "../../../../db/schema"
import { createItem } from "./actions"
import { SubmitButton } from "./buttons"

export default function AddItemPage() {
    return (
        <div>
            <h1>Add Item</h1>
            <div className="p-5">
                <form action={createItem} className="form-control items-center">
                    <div>
                        <label htmlFor="id" className="label-text block my-2">ID</label>
                        <input type="text" id='id' name="id" className="input input-bordered" />
                    </div>
                    <div>
                        <label htmlFor="name" className="label-text block my-2">Nama</label>
                        <input type="text" name="name" id='name' className="input input-bordered" />
                    </div>
                    <div>
                        <label htmlFor="price" className="label-text block my-2">Harga</label>
                        <input type="number" name="price" id="price" className="input input-bordered" />
                    </div>
                    <div>
                        <label htmlFor="stock" className="label-text block my-2">Stock</label>
                        <input type="number" name="stock" id="stock" className="input input-bordered" />
                    </div>
                    <div>
                        <label htmlFor="description" className="label-text block my-2">Deskripsi</label>
                        <textarea name="description" id="description" cols={30} rows={5} className="textarea textarea-bordered"></textarea>
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </div>
    )
}