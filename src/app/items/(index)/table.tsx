'use client'
import { useRouter } from 'next/navigation'
import { deleteItem } from './actions'
type Item = {
    id: string
    name: string | null,
    price: number | null,

}

export default function Table({ data }: { data: Item[] }) {
    const router = useRouter()

    const itemsList = data.map((item: Item) => (
        <tr key={item.id} className='hover cursor-pointer' onClick={() => router.push(`/items/${item.id}`)}>
            <td>
                <div className="font-bold">{item.name}</div>
            </td>
            <td>
                {item.price}
            </td>
            <td>
                <button className="btn btn-ghost " onClick={async (e) => {
                    e.stopPropagation()
                    await deleteItem(item.id)
                }}>Delete</button>
            </td>
        </tr>
    ))
    console.log(itemsList)
    const NoResult = () => {
        return (
            <tr>
                <td colSpan={3} className="text-center">No Result</td>
            </tr>
        )
    }
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {itemsList.length === 0 && <NoResult />}
                    {itemsList}
                </tbody>
            </table>
        </div>
    )
}