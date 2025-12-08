import ProjectWizard from "@/components/ProjectWizard"

export default function StartPage() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
                backgroundAttachment: "fixed"
            }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(12, 15, 18, 0.7), rgba(12, 15, 18, 0.95))" }}></div>

            <div className="relative z-10 w-full">
                <ProjectWizard />
            </div>
        </div>
    )
}
