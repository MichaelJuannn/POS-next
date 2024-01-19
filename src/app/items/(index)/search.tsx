'use client'

import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import { Search as SearchIcon } from 'lucide-react'

export default function Search({ disabled }: { disabled?: boolean }) {
    const { replace } = useRouter()
    const pathName = usePathname()
    const [isPending, startTransition] = useTransition()

    function handleSearch(term: string) {
        const params = new URLSearchParams(window.location.search)
        if (term) {
            params.set('q', term)
        } else {
            params.delete('q')
        }

        startTransition(() => {
            replace(`${pathName}?${params.toString()}`)
        })
    }
    return (
        <div className="relative mt-5 max-w-md">
            <label htmlFor="search" className="label sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon size={18} />
                </div>
                <input
                    id="search"
                    name="search"
                    className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:bg-white focus:border-white focus:ring-0 disabled:opacity-50"
                    placeholder="Search"
                    type="search"
                    disabled={disabled}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

        </div>
    )
}