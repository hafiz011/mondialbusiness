import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-brand-black mb-6">How It Works</h1>
                    <p className="text-xl text-gray-600">
                        You don't need business experience or money. Just tell us your idea, and we help you turn it into a structured project in 48 hours.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {[
                        {
                            step: "Step 1",
                            title: "Share Your Idea",
                            desc: "Create a free account and describe your idea in simple words. No complex forms."
                        },
                        {
                            step: "Step 2",
                            title: "We Build Your Project in 48 Hours",
                            desc: "The Mondial.eco team structures your idea into a clear project: concept, market positioning, and brand direction."
                        },
                        {
                            step: "Step 3",
                            title: "Your Project Goes Public to Investors",
                            desc: "We publish your project on the Mondial.eco investor page so investors and partners can discover it."
                        },
                        {
                            step: "Step 4",
                            title: "Build and Grow Your Company",
                            desc: "You can continue improving your project, turn it into a micro-company on the platform, and use services to grow faster."
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-brand-cyan font-bold mb-2">{item.step}</div>
                            <h3 className="text-2xl font-bold text-brand-black mb-4">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl shadow-sm max-w-4xl mx-auto mb-16">
                    <h3 className="text-2xl font-bold text-brand-black text-center mb-8">Timeline</h3>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
                        <div className="flex-1">
                            <div className="font-bold text-brand-black mb-2">Day 0</div>
                            <div className="text-gray-600">Sign up and submit idea</div>
                        </div>
                        <div className="hidden md:block text-gray-300">→</div>
                        <div className="flex-1">
                            <div className="font-bold text-brand-black mb-2">Within 48h</div>
                            <div className="text-gray-600">Project concept is built</div>
                        </div>
                        <div className="hidden md:block text-gray-300">→</div>
                        <div className="flex-1">
                            <div className="font-bold text-brand-black mb-2">After that</div>
                            <div className="text-gray-600">Project is visible to investors</div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link href="/signup">
                        <Button size="lg">Start With Your Idea (Free)</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
