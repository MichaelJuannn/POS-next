'use client'
import { Pencil } from "lucide-react"
import { useState } from "react"

export default function UpdateDialog({ currentValue, id, updateItem }: { currentValue: string, id: string, updateItem: ((data: number | string, id: string) => Promise<void>) | undefined }) {

    const [value, setValue] = useState(currentValue)
    const [loading, setLoading] = useState(false)
    return (
        <span className="">
            <button className="btn btn-ghost" onClick={() => (document.getElementById(id + currentValue) as HTMLDialogElement).showModal()}>
                <Pencil size={20} />
            </button>
            <dialog id={id + currentValue} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Update Barang</h3>
                    <p className="py-4">Masukkan Data Terbaru Untuk Update</p>
                    <div className="modal-action">
                        <input className="input mx-2" type="text" value={value?.toString()} onChange={(e) => setValue(e.currentTarget.value)} />
                        {!loading ? <button className="btn"
                            onClick={async () => {
                                setLoading(true)
                                if (updateItem) {
                                    await updateItem(value, id)
                                }
                                setLoading(false)
                            }}
                        >Update</button> : <button type="submit" className="btn btn-primary m-4">
                            <span className="loading loading-spinner"></span>
                        </button>}
                    </div>
                </div>
            </dialog>
        </span>
    )
}