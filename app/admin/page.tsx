'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (res?.ok) {
            router.push('admin/dashboard')
        } else {
            setError('Invalid credentials')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow w-80 space-y-4">
                <h1 className="text-xl font-semibold text-center">Admin Login</h1>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded cursor-pointer"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}

