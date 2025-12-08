"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { registerApi, RegisterModel } from "@/service/auth"

export default function Signup() {
    const router = useRouter()

    // Form state
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("creator")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrorMsg("")

        try {
            const model: RegisterModel = {
                Name: fullName,
                Email: email,
                Password: password,
                User: role
            }

            await registerApi(model)

            // Redirect based on role
            if (role === "creator") {
                router.push("/my-profile")
            } else {
                router.push("/investors")
            }
        } catch (err: any) {
            console.error(err)
            setErrorMsg(err?.response?.data?.message || "Registration failed")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Your Account</h1>

            {errorMsg && (
                <div className="mb-4 text-red-600 text-sm text-center">{errorMsg}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-cyan outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-cyan outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-cyan outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-cyan outline-none bg-white"
                    >
                        <option value="creator">Creator (I have an idea)</option>
                        <option value="investor">Investor (I want to invest)</option>
                    </select>
                </div>

                <Button type="submit" className="w-full mt-4" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-brand-cyan hover:underline font-medium">Log in</Link>
            </div>
        </>
    )
}
