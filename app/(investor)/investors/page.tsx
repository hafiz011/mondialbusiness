"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function InvestorProjects() {
    // Mock data
    const [projects] = useState([
        {
            id: "1",
            title: "Eco-Friendly Straws",
            shortPitch: "Biodegradable straws made from bamboo.",
            category: "Sustainability",
            creator: { id: "101", name: "John Doe" }
        },
        {
            id: "2",
            title: "AI Personal Assistant",
            shortPitch: "An AI that organizes your entire life.",
            category: "Technology",
            creator: { id: "102", name: "Jane Smith" }
        },
        {
            id: "3",
            title: "Urban Vertical Farming",
            shortPitch: "Growing food in city skyscrapers.",
            category: "Agriculture",
            creator: { id: "103", name: "Mike Johnson" }
        }
    ])

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects for Investors</h1>
                <p className="text-xl text-gray-600">Discover ideas from creators around the world.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Health">Health</option>
                </select>
                <Button>Search</Button>
            </div>

            {/* Project Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{project.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-6 flex-1">{project.shortPitch}</p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <Link href={`/creator/${project.creator.id}`} className="text-sm text-gray-500 hover:text-blue-600">
                                by {project.creator.name}
                            </Link>
                            <Link href={`/investors/project/${project.id}`}>
                                <Button size="sm" variant="outline">View Project</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
