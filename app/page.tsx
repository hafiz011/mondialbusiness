import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_bg.png"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
            Turn Your Idea Into a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-dark">
              Real Business
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            No budget? No experience? No problem. <br />
            Build a full project in 48 hours and connect with global investors.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-brand-red hover:bg-green-700 text-white border-0 text-lg px-8 py-6 h-auto rounded-full shadow-lg shadow-brand-cyan/20 transition-all hover:scale-105">
                Start With Your Idea (Free)
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 hover:text-white text-lg px-8 py-6 h-auto rounded-full backdrop-blur-sm transition-all">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section: For Creators */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <Image
                  src="/images/feature_creator_collab.png"
                  alt="Creators collaborating in a futuristic workspace"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-6 leading-tight">
                A Global &quot;Shark Tank&quot; <br />
                <span className="text-brand-cyan">For Everyone</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Anyone with an idea can transform it into a real business project.
                Our platform provides the tools, structure, and network you need to succeed.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "No business knowledge required",
                  "No team needed to start",
                  "Zero upfront capital needed"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="h-6 w-6 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-red text-sm">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button variant="ghost" className="text-brand-cyan hover:text-brand-dark hover:bg-brand-cyan/20 p-0 font-semibold text-lg">
                  Start Building Now →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: For Investors */}
      <section className="py-20 md:py-32 overflow-hidden" style={{ backgroundColor: "rgb(246, 246, 246)" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-6 leading-tight">
                Sustainable Growth <br />
                <span className="text-brand-red">For Investors</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Discover the next unicorn before it&apos;s famous. Invest in sustainable,
                vetted projects from creators around the globe.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-brand-dark mb-1">48h</div>
                  <div className="text-sm text-gray-500">Project Turnaround</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-brand-red mb-1">100%</div>
                  <div className="text-sm text-gray-500">Vetted Ideas</div>
                </div>
              </div>
              <Link href="/investors">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-white">
                  Explore Investment Opportunities
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
                <div className="absolute inset-0 bg-gradient-to-bl from-brand-red/20 to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <Image
                  src="/images/feature_eco_invest.png"
                  alt="Sustainable investment growth chart"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is It For? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-black mb-12">Who Is It For?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "People with an idea but no money",
              "People who don't know how to build a project or business plan",
              "People who want to attract investors but don't know where to start",
              "People who dream of launching their own company"
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="h-12 w-12 bg-brand-cyan/20 rounded-full flex items-center justify-center mb-4 text-brand-cyan font-bold text-xl">
                  {i + 1}
                </div>
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Short Overview) */}
      <section id="text_12" className="py-16 md:py-24" style={{ backgroundColor: "#f6f6f6" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-black mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Share your idea", desc: "Tell us what you want to build." },
              { title: "We build it in 48h", desc: "We structure your project professionally." },
              { title: "Publish to investors", desc: "Your project goes live on our platform." },
              { title: "Grow your company", desc: "Connect with partners and scale." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-xl font-bold text-brand-dark mb-2">{step.title}</div>
                <p className="text-brand-dark/80">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-brand-cyan">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Premium (Preview) */}
      <section className="py-16 bg-white text-brand-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Free Plan</h3>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-center gap-2">✓ 48h project build</li>
                <li className="flex items-center gap-2">✓ Basic brand concept</li>
                <li className="flex items-center gap-2">✓ Project listed on investor page</li>
              </ul>
              <Link href="/signup">
                <Button className="w-full bg-brand-dark text-white hover:bg-brand-dark/90 shadow-md">Start Free</Button>
              </Link>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
              <p className="mb-6 text-brand-cyan font-medium">For those who want to move faster and look more professional.</p>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-center gap-2">✓ Everything in Free</li>
                <li className="flex items-center gap-2">✓ Deeper strategy</li>
                <li className="flex items-center gap-2">✓ Priority investor placement</li>
                <li className="flex items-center gap-2">✓ 50% off all services</li>
              </ul>
              <Link href="/pricing">
                <Button variant="outline" className="w-full border-brand-dark text-brand-dark hover:bg-brand-dark/5">View Pricing</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center bg-brand-cyan">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
            Got an idea but no money?
          </h2>
          <p className="text-xl text-brand-dark/80 mb-10">
            That&apos;s exactly why Mondial.eco exists.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-12 bg-brand-dark text-white hover:bg-brand-dark/90 shadow-lg">Create Your Free Account</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
