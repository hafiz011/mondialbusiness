import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Services() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-brand-black mb-4">Services to Help You Grow</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Mondial.eco offers optional services to help you turn your project into a strong brand and business.
                </p>
                <div className="mt-4 inline-block bg-brand-cyan/20 text-brand-dark px-4 py-2 rounded-full font-medium text-sm">
                    Premium users get 50% off all services
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {[
                    { title: "Website Creation", desc: "Professional website or landing page for your project or company." },
                    { title: "Branding & Design", desc: "Logo, colors, visual identity, and brand story." },
                    { title: "Social Media Marketing", desc: "Setup and management for social platforms to grow your audience." },
                    { title: "Digital Marketing & Ads", desc: "Online campaigns to reach your ideal customers." },
                    { title: "Pitch Deck Creation", desc: "Investor presentations that clearly explain your project." },
                    { title: "Custom Support", desc: "Custom strategy or support tailored to your project's needs." }
                ].map((service, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-brand-black mb-3">{service.title}</h3>
                        <p className="text-gray-600">{service.desc}</p>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <Link href="/contact">
                    <Button size="lg">Talk to Us About Services</Button>
                </Link>
            </div>
        </div>
    )
}
