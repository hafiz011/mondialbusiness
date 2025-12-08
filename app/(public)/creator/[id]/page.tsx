"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function PublicCreatorProfile() {
    const params = useParams()
    const id = params.id

    // Mock data
    const creator = {
        id,
        name: "John Doe",
        country: "USA",
        city: "New York",
        bio: "Passionate entrepreneur with a background in sustainable design. I love solving problems that help the planet.",
        skills: ["Product Design", "Sustainability", "Marketing"],
        interests: ["Clean Tech", "Circular Economy"],
        memberSince: "2023"
    }

    const projects = [
        {
            id: "1",
            title: "Eco-Friendly Straws",
            shortPitch: "Biodegradable straws made from bamboo.",
            category: "Sustainability"
        }
    ]

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl">
                        {creator.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{creator.name}</h1>
                        <div className="text-gray-600 mb-4">{creator.city}, {creator.country} • Member since {creator.memberSince}</div>
                        <p className="text-gray-700 max-w-2xl">{creator.bio}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column: About */}
                    <div className="md:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">About this Creator</h2>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {creator.skills.map(skill => (
                                        <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {creator.interests.map(interest => (
                                        <span key={interest} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">{interest}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Creator</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                </div>
                                <Button className="w-full">Send Message</Button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Ideas */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideas by {creator.name}</h2>
                        <div className="space-y-6">
                            {projects.map(project => (
                                <div key={project.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{project.category}</span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{project.shortPitch}</p>
                                    <Link href={`/investors/project/${project.id}`}>
                                        <Button variant="outline" size="sm">View Idea</Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
