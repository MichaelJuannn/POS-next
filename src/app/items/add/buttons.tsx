'use client'
import { useFormStatus } from "react-dom"

export function SubmitButton() {
    const { pending } = useFormStatus()
    if (pending) {
        return <button type="submit" className="btn btn-primary m-4">
            <span className="loading loading-spinner"></span>
        </button>
    }
    return <button type="submit" className="btn btn-primary m-4">Tambahkan Item</button>
}
