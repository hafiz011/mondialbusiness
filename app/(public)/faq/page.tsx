import Link from "next/link"

export default function FAQ() {
    const faqs = [
        {
            q: "Do I need money to start?",
            a: "No. You can start with the Free plan, submit your idea, and receive a full project build in 48 hours at no cost."
        },
        {
            q: "Who builds my project?",
            a: "The Mondial.eco team structures your idea into a clear project with branding and market positioning so you can present it professionally."
        },
        {
            q: "How do investors see my project?",
            a: "Your project is published on the Mondial.eco investor page, where investors, partners, and supporters can discover and contact you."
        },
        {
            q: "What is the benefit of the Premium plan?",
            a: "With Premium, you get more support and 50% discounts on website, marketing, and other services to grow faster."
        },
        {
            q: "Can I really create a company from this?",
            a: "Yes. Mondial.eco helps you transform your project into a real business and grow it inside our global ecosystem."
        }
    ]

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <h1 className="text-4xl font-bold text-brand-black mb-12 text-center">Frequently Asked Questions</h1>

            <div className="max-w-3xl mx-auto space-y-8">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-brand-black mb-3">{faq.q}</h3>
                        <p className="text-gray-600">{faq.a}</p>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12 text-gray-600">
                Still have questions? <Link href="/contact" className="text-brand-cyan hover:underline">Contact us</Link>
            </div>
        </div>
    )
}
