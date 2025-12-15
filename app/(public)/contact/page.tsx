"use client"

import { useState } from "react"

export default function Contact() {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock submission
        console.log("Form submitted")
        setSubmitted(true)
    }

    return (
        <main className="min-h-screen px-4 py-8 md:py-12 max-w-6xl mx-auto">

            {/* 1. Contact Hero Section */}
            <header className="contact-hero-section mb-12 py-16 px-8 md:px-12 flex flex-col justify-center shadow-sm">
                <div className="max-w-3xl">
                    {/* Cyan Badge */}
                    <span className="inline-block py-1 px-3 rounded-full bg-cyan-50 text-primary-accent text-xs font-bold tracking-wider uppercase mb-4 border border-cyan-100">
                        Get in Touch
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-navy tracking-tight leading-tight">
                        We're here to help you <span className="text-primary-accent" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.05)' }}>build.</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                        Have a question about the MondialScore™, our investor network, or how to get started? Our team is ready to support your journey from idea to funding.
                    </p>
                </div>
            </header>

            {/* 2. Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">

                {/* Left Column: Contact Form */}
                <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 md:p-10 relative overflow-hidden">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"></div>

                    {submitted ? (
                        <div className="text-center py-10 h-full flex flex-col justify-center items-center">
                            <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mb-4 text-primary-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-navy mb-2">Message Sent!</h3>
                            <p className="text-gray-600 mb-8 max-w-xs mx-auto">We'll get back to you within 24 hours.</p>
                            <button onClick={() => setSubmitted(false)} className="cta-button font-bold py-3 px-8 rounded-lg transition hover:opacity-90">
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-navy mb-2">Send us a message</h2>
                            <p className="text-gray-500 mb-8 text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-navy mb-2">First Name</label>
                                        <input type="text" className="form-input" placeholder="Jane" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-navy mb-2">Last Name</label>
                                        <input type="text" className="form-input" placeholder="Doe" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-navy mb-2">Email Address</label>
                                    <input type="email" className="form-input" placeholder="jane@example.com" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-navy mb-2">Topic</label>
                                    <select className="form-input text-gray-600">
                                        <option>I have a project idea</option>
                                        <option>Question about MondialScore™</option>
                                        <option>Investor Partnership</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-navy mb-2">Message</label>
                                    <textarea className="form-input h-32 resize-none" placeholder="Tell us about your project or question..." required></textarea>
                                </div>

                                <button type="submit" className="cta-button w-full font-bold py-4 rounded-lg text-lg tracking-wide">
                                    Send Message
                                </button>
                            </form>
                        </>
                    )}
                </section>

                {/* Right Column: Info & FAQ */}
                <div className="flex flex-col gap-8">

                    {/* Quick Contact Info */}
                    <section className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm relative">
                        <h3 className="text-xl font-bold text-navy mb-6">Reach out directly</h3>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-cyan-50 p-3 rounded-lg text-primary-accent mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-navy">Email Us</p>
                                    <a href="mailto:info@mondial.eco" className="text-gray-500 hover:text-primary-accent transition">support@mondial.eco</a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-cyan-50 p-3 rounded-lg text-primary-accent mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-navy">For Investors</p>
                                    <a href="mailto:investors@mondial.eco" className="text-gray-500 hover:text-primary-accent transition">investors@mondial.eco</a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-cyan-50 p-3 rounded-lg text-primary-accent mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-navy">Global HQ</p>
                                    <p className="text-gray-500">Digital-First · Available Worldwide</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Snippet */}
                    <div className="relative pl-6 pt-4">
                        {/* Cyan Accent Bar */}
                        <div className="accent-bar shadow-lg shadow-cyan-200"></div>

                        <h3 className="text-xl font-bold text-navy mb-4">Frequently Asked</h3>
                        <div className="space-y-4">
                            <details className="group bg-white p-4 rounded-xl cursor-pointer border border-gray-100 hover:border-cyan-100 transition shadow-sm">
                                <summary className="font-semibold text-navy flex justify-between items-center list-none outline-none">
                                    Is it really free?
                                    <span className="text-primary-accent transition group-open:rotate-180">▼</span>
                                </summary>
                                {/* Using the Secondary Red for Emphasis in text if needed */}
                                <p className="text-gray-600 mt-2 text-sm">Yes. We only take a <span className="font-bold text-secondary-accent">3% equity stake</span> if and when you successfully receive funding.</p>
                            </details>
                            <details className="group bg-white p-4 rounded-xl cursor-pointer border border-gray-100 hover:border-cyan-100 transition shadow-sm">
                                <summary className="font-semibold text-navy flex justify-between items-center list-none outline-none">
                                    How fast is the process?
                                    <span className="text-primary-accent transition group-open:rotate-180">▼</span>
                                </summary>
                                <p className="text-gray-600 mt-2 text-sm">Once you submit your answers, you will receive your complete business plan in 48 hours.</p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Final CTA */}
            <section className="bg-white border border-gray-100 rounded-2xl shadow-sm py-20 px-6 text-center relative overflow-hidden">
                {/* Decorative circles using Cyan */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-200 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-200 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

                <h2 className="text-3xl font-bold text-navy mb-4 relative z-10">Ready to start instead?</h2>
                <p className="text-gray-600 max-w-xl mx-auto mb-10 text-lg relative z-10">
                    Skip the queue. Answer a few questions and get your business plan in 48 hours.
                </p>
                <a href="/start" className="cta-button inline-block font-bold py-4 px-12 rounded-xl text-lg relative z-10 hover:opacity-95 text-decoration-none">
                    Start My Project
                </a>
            </section>

        </main>
    )
}
