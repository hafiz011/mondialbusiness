"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function InvestorProjectDetail() {
    const params = useParams()
    const id = params.id

    // Mock data would normally be fetched based on ID
    const project = {
        id,
        title: "Eco-Friendly Straws",
        shortPitch: "Biodegradable straws made from bamboo.",
        category: "Sustainability",
        status: "Ready for investment",
        problem: "Plastic straws are polluting our oceans and harming marine life. Current alternatives like paper straws get soggy and are disliked by consumers.",
        solution: "Our bamboo straws are 100% biodegradable, durable, and tasteless. They provide the perfect drinking experience without the environmental guilt.",
        targetMarket: "Restaurants, cafes, hotels, and eco-conscious consumers worldwide. The global market for eco-friendly straws is projected to reach $3B by 2030.",
        brandConcept: "EcoSip: Sip sustainably. Nature's straw.",
        investorDescription: "We have secured a supply chain with bamboo farmers in Vietnam and have a prototype ready. We are looking for $50k seed funding to launch our first production run and marketing campaign.",
        creator: {
            id: "101",
            name: "John Doe",
            country: "USA",
            city: "New York"
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-6">
                <Link href="/investors" className="text-sm text-gray-500 hover:text-blue-600">← Back to Projects</Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{project.category}</span>
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">{project.status}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                        <p className="text-xl text-gray-600">{project.shortPitch}</p>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
                            <p className="text-gray-700 leading-relaxed">{project.problem}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
                            <p className="text-gray-700 leading-relaxed">{project.solution}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Target Market</h2>
                            <p className="text-gray-700 leading-relaxed">{project.targetMarket}</p>
                        </section>

                        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Brand Concept</h2>
                            <p className="text-gray-700 font-medium italic mb-4">"{project.brandConcept}"</p>
                            <h3 className="font-bold text-gray-900 mb-2">Investor Summary</h3>
                            <p className="text-gray-700">{project.investorDescription}</p>
                        </section>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Creator Info */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Created by</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xl">
                                {project.creator.name.charAt(0)}
                            </div>
                            <div>
                                <Link href={`/creator/${project.creator.id}`} className="font-bold text-blue-600 hover:underline">
                                    {project.creator.name}
                                </Link>
                                <div className="text-sm text-gray-500">{project.creator.city}, {project.creator.country}</div>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">View Creator Profile</Button>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-lg font-bold text-blue-900 mb-4">Interested in this project?</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-800 mb-1">Your Name</label>
                                <input type="text" className="w-full px-3 py-2 border border-blue-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-800 mb-1">Your Email</label>
                                <input type="email" className="w-full px-3 py-2 border border-blue-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-800 mb-1">Message</label>
                                <textarea rows={3} className="w-full px-3 py-2 border border-blue-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            </div>
                            <Button className="w-full">Send Message to Creator</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
