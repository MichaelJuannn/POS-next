'use client'
import Link from 'next/dist/client/link'
type Item = {
    id: string
    name: string | null,
    price: number | null,

}

export default function Table({ data }: { data: Item[] }) {

    const itemsList = data.map((item: Item) => (
        <tr key={item.id}>
            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold">{item.name}</div>
                    </div>
                </div>
            </td>
            <td>
                {item.price}
            </td>
            <th>
                <Link href={`/items/${item.id}`}><button className="btn btn-ghost ">Details</button></Link>
            </th>
        </tr>
    ))
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