"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function MyProfile() {
    // Mock state
    const [projects, setProjects] = useState([
        { id: "1", title: "Eco-Friendly Straws", status: "published", date: "2023-10-15" },
        { id: "2", title: "AI Personal Assistant", status: "draft", date: "2023-11-02" }
    ])

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Update your information and manage your ideas.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Info */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" defaultValue="John Doe" className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" defaultValue="john@example.com" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input type="text" defaultValue="USA" className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input type="text" defaultValue="New York" className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="publicProfile" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                                <label htmlFor="publicProfile" className="text-sm text-gray-700">Public Profile</label>
                            </div>
                            <Button type="submit" className="w-full">Save Profile</Button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Ideas & Projects */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Create New Idea */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Idea</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Idea Title</label>
                                <input type="text" placeholder="e.g. Uber for Dog Walking" className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Pitch</label>
                                <input type="text" placeholder="One sentence summary" className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                        <option>Technology</option>
                                        <option>Health</option>
                                        <option>Education</option>
                                        <option>Finance</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea rows={4} placeholder="Describe your idea in detail..." className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            </div>
                            <div className="flex gap-4">
                                <Button type="button" variant="outline">Save as Draft</Button>
                                <Button type="submit">Submit to Mondial.eco</Button>
                            </div>
                        </form>
                    </div>

                    {/* My Ideas List */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">My Ideas</h2>
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                                    <div>
                                        <div className="font-bold text-gray-900">{project.title}</div>
                                        <div className="text-sm text-gray-500">Created: {project.date}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${project.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                        </span>
                                        <Link href={`/project/${project.id}`}>
                                            <Button size="sm" variant="outline">View / Edit</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
