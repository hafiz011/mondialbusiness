"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProjectEdit() {
    const params = useParams()
    const id = params.id

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link href="/my-profile" className="text-sm text-gray-500 hover:text-blue-600 mb-2 inline-block">← Back to Profile</Link>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
                    <p className="text-gray-600">Project ID: {id}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Preview</Button>
                    <Button>Save Changes</Button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-4xl mx-auto">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                        <input type="text" defaultValue="Eco-Friendly Straws" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Pitch</label>
                        <input type="text" defaultValue="Biodegradable straws made from bamboo." className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Problem</label>
                            <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Plastic straws are polluting our oceans..."></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
                            <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Our bamboo straws are 100% biodegradable..."></textarea>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Market</label>
                        <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Restaurants, cafes, and eco-conscious consumers."></textarea>
                    </div>

                    <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Mondial.eco Generated Content</h3>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Concept</label>
                                <div className="text-gray-600 text-sm">EcoSip: Sip sustainably. Nature's straw.</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Investor Description</label>
                                <div className="text-gray-600 text-sm">A scalable solution to the single-use plastic problem...</div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
