"use client"

import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="font-sans bg-white text-gray-800 min-h-screen">
            <style jsx global>{`
        :root {
          --color-primary: #36E0F8; /* Cyan */
          --color-secondary: #DA2824; /* Red */
          --color-background: #FFFFFF;
          --color-surface: #F8FAFC; /* Very light slate */
          --color-dark: #151821; /* Dark Blue */
          --color-black: #0C0F12; /* Black */
        }
        
        .text-primary-accent {
            background: linear-gradient(90deg, #DA2824 0%, #36E0F8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
        }
        .text-secondary-accent {
            color: var(--color-secondary);
        }
        .bg-primary-accent {
            background: linear-gradient(90deg, #DA2824 0%, #36E0F8 100%);
        }
        .cta-button {
            transition: all 0.2s ease-in-out;
            box-shadow: 0 4px 6px -1px rgba(54, 224, 248, 0.2);
            color: white !important; /* White text on Gradient button looks better, user had white/transparent on button before or dark? Original was dark on cyan. Gradient usually needs white. */
        }
        /* Override if user strictly wants original text color on button, but dark on red might be low contrast. I will switch to white for better contrast on red/cyan gradient. */
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(54, 224, 248, 0.4);
            opacity: 0.9;
        }
        
        .gray-box {
            background-color: var(--color-surface);
            border-radius: 1rem;
            border: 1px solid #E2E8F0;
        }
        
        .accent-bar {
            width: 6px;
            background: linear-gradient(to bottom, #DA2824 0%, #36E0F8 100%);
            border-radius: 99px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            box-shadow: 0 0 10px rgba(54, 224, 248, 0.3);
        }
        
        .fair-deal-card {
            background-color: #F0FDFA; /* Light Cyan tint */
            border: 2px solid var(--color-primary);
            box-shadow: 0 10px 25px -5px rgba(54, 224, 248, 0.15);
        }

        .hero-section {
            background-image: 
                linear-gradient(to right, rgba(255, 255, 255, 0.81) 20%, rgba(255, 255, 255, 0.72) 100%),
                url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop');
            background-size: cover;
            background-position: center center;
            border-radius: 1.5rem;
            position: relative;
            overflow: hidden;
        }
        
        @keyframes float {
            0% { background-position: center center; }
            50% { background-position: center 52%; }
            100% { background-position: center center; }
        }
      `}</style>

            <main className="min-h-screen px-4 py-8 md:py-12 max-w-6xl mx-auto">

                {/* 1. Header Section */}
                <header className="hero-section mb-12 py-16 px-8 md:px-12 flex flex-col justify-center shadow-sm border border-gray-100">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight">
                            About <span className="text-primary-accent">Mondial.eco</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-snug">
                            Turn your idea into a real, investor-ready project.
                        </p>
                        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                            Mondial.eco Project Creator gives you a complete business plan, a MondialScore™, and 1 year of visibility to investors — all for free.
                        </p>

                        <div className="mt-8">
                            <Link href="/start" className="cta-button inline-block bg-primary-accent text-white font-bold py-3 px-8 rounded-lg text-lg">
                                Start My Project
                            </Link>
                        </div>
                    </div>
                </header>

                {/* 2. What We Do */}
                <section className="gray-box p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Do</h2>
                    <div className="flex flex-wrap gap-4">
                        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-primary-accent hover:text-primary-accent cursor-default">
                            Complete Business Plan
                        </span>
                        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-primary-accent hover:text-primary-accent cursor-default">
                            Unique MondialScore™
                        </span>
                        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-primary-accent hover:text-primary-accent cursor-default">
                            1 Year Visibility
                        </span>
                        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-primary-accent hover:text-primary-accent cursor-default">
                            Investor Network
                        </span>
                    </div>
                </section>

                {/* 3. Philosophy Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Creator-First Philosophy</h2>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* Left: Text Block */}
                        <div className="gray-box p-8 flex flex-col justify-center">
                            <p className="text-gray-700 mb-4 font-medium text-lg">
                                We believe that funding should be performance-based. You don&apos;t pay to create your business plan or to appear on our investor network.
                            </p>
                            <p className="text-gray-900 font-bold text-xl">
                                We only win when you do.
                            </p>
                        </div>

                        {/* Right: Fair Deal Card */}
                        <div className="fair-deal-card rounded-2xl p-8 relative flex flex-col justify-center transform transition hover:scale-[1.02] duration-300">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-1.5 bg-primary-accent rounded-l-full"></div>

                            <h3 className="text-xl font-bold text-primary-accent mb-2 uppercase tracking-wide">The Fair Deal</h3>
                            <div className="flex items-baseline space-x-3">
                                <span className="text-6xl font-extrabold text-primary-accent">3%</span>
                                <span className="text-sm font-semibold text-gray-600 leading-tight max-w-[150px]">
                                    equity stake if you get funded.
                                </span>
                            </div>
                            <p className="mt-4 text-sm font-medium text-gray-500 border-t border-green-200 pt-4">
                                No funding = No equity = No fees.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Split Grid: Engine & Audience */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Left Column: The Engine */}
                        <div className="relative pl-6">
                            <div className="accent-bar"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Engine: AI + Human</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white border-2 border-gray-100 p-5 rounded-xl text-center shadow-sm hover:border-primary-accent transition duration-300 group">
                                    <span className="text-xs font-bold text-primary-accent uppercase tracking-wide block mb-1 group-hover:scale-110 transition-transform">Fast</span>
                                    <span className="text-sm font-semibold text-gray-800">AI Structure</span>
                                </div>
                                <div className="bg-white border-2 border-gray-100 p-5 rounded-xl text-center shadow-sm hover:border-primary-accent transition duration-300 group">
                                    <span className="text-xs font-bold text-primary-accent uppercase tracking-wide block mb-1 group-hover:scale-110 transition-transform">Smart</span>
                                    <span className="text-sm font-semibold text-gray-800">Data Analysis</span>
                                </div>
                                <div className="bg-white border-2 border-gray-100 p-5 rounded-xl text-center shadow-sm hover:border-primary-accent transition duration-300 group">
                                    <span className="text-xs font-bold text-primary-accent uppercase tracking-wide block mb-1 group-hover:scale-110 transition-transform">Real</span>
                                    <span className="text-sm font-semibold text-gray-800">Human Review</span>
                                </div>
                                <div className="bg-white border-2 border-gray-100 p-5 rounded-xl text-center shadow-sm hover:border-primary-accent transition duration-300 group">
                                    <span className="text-xs font-bold text-primary-accent uppercase tracking-wide block mb-1 group-hover:scale-110 transition-transform">Credible</span>
                                    <span className="text-sm font-semibold text-gray-800">Investor Ready</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Who We're Built For */}
                        <div className="relative pl-6">
                            <div className="accent-bar"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Who We&apos;re Built For</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition">
                                    <span className="text-2xl mb-2">🎨</span>
                                    <span className="text-sm font-semibold text-gray-800">Creators & Makers</span>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition">
                                    <span className="text-2xl mb-2">💼</span>
                                    <span className="text-sm font-semibold text-gray-800">Founders</span>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition">
                                    <span className="text-2xl mb-2">🚀</span>
                                    <span className="text-sm font-semibold text-gray-800">Innovators</span>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition">
                                    <span className="text-2xl mb-2">🌍</span>
                                    <span className="text-sm font-semibold text-gray-800">Social Impact</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 5. Final CTA */}
                <section className="gray-box py-20 px-6 text-center relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-accent opacity-5 rounded-full"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-accent opacity-5 rounded-full"></div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">Final Call to Action</h2>
                    <p className="text-gray-600 max-w-xl mx-auto mb-10 text-lg relative z-10">
                        Ready to turn your idea into a real project? Start now and get your plan in 48 hours.
                    </p>
                    <Link href="/start" className="cta-button inline-block bg-primary-accent text-white font-bold py-4 px-12 rounded-xl text-lg relative z-10">
                        Start My Project
                    </Link>
                </section>

            </main>
        </div>
    )
}
