import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Pricing() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-brand-black mb-4">Start Free. Grow With Support.</h1>
                <p className="text-xl text-gray-600">Choose the plan that fits your ambition.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                {/* Free Plan */}
                <div className="border border-gray-200 rounded-2xl p-8 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-brand-black">Start With Your Idea</h2>
                        <p className="text-gray-600 mt-2">Best for: People with an idea and no budget.</p>
                    </div>
                    <div className="text-4xl font-bold text-brand-black mb-6">$0</div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex gap-3 text-gray-700">✓ Free account registration</li>
                        <li className="flex gap-3 text-gray-700">✓ Idea submission in a few minutes</li>
                        <li className="flex gap-3 text-gray-700">✓ Full project build within 48 hours</li>
                        <li className="flex gap-3 text-gray-700">✓ Basic brand concept</li>
                        <li className="flex gap-3 text-gray-700">✓ Project published on investor page</li>
                        <li className="flex gap-3 text-gray-700">✓ Access to potential investors</li>
                    </ul>
                    <Link href="/signup" className="w-full">
                        <Button className="w-full" size="lg">Start Free</Button>
                    </Link>
                </div>

                {/* Premium Plan */}
                <div className="border-2 border-brand-cyan rounded-2xl p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-brand-cyan text-brand-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
                        RECOMMENDED
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-brand-black">Grow Your Project</h2>
                        <p className="text-gray-600 mt-2">Best for: Creators who want to move faster.</p>
                    </div>
                    <div className="text-4xl font-bold text-brand-black mb-6">Contact Us</div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex gap-3 text-gray-700">✓ <strong>Everything in Free</strong></li>
                        <li className="flex gap-3 text-gray-700">✓ Deeper project structuring and strategy</li>
                        <li className="flex gap-3 text-gray-700">✓ Stronger, more detailed brand concept</li>
                        <li className="flex gap-3 text-gray-700">✓ Priority visibility on investor page</li>
                        <li className="flex gap-3 text-gray-700">✓ Priority handling and support</li>
                        <li className="flex gap-3 text-brand-cyan font-medium">✓ 50% discount on all services</li>
                    </ul>
                    <Link href="/contact" className="w-full">
                        <Button variant="primary" className="w-full bg-brand-dark hover:bg-brand-dark/90" size="lg">Upgrade to Premium</Button>
                    </Link>
                </div>
            </div>

            <div className="max-w-3xl mx-auto text-center bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Which plan should I choose?</h3>
                <div className="space-y-2 text-gray-700">
                    <p>If you just have an idea and no money, start with the <strong>Free plan</strong>.</p>
                    <p>If you want to move fast and look professional, choose the <strong>Premium plan</strong>.</p>
                </div>
            </div>
        </div>
    )
}
