import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg text-brand-dark">Mondial.eco</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Turn your idea into a business in 48 hours.
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm text-gray-600">
                        <Link href="/faq" className="hover:text-brand-cyan">FAQ</Link>
                        <Link href="/terms" className="hover:text-brand-cyan">Terms</Link>
                        <Link href="/privacy" className="hover:text-brand-cyan">Privacy</Link>
                        <Link href="/contact" className="hover:text-brand-cyan">Contact</Link>
                    </div>

                    <div className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Mondial.eco
                    </div>
                </div>
            </div>
        </footer>
    )
}
