import Image from "next/image";

export default function Header() {
    return (
        <header className="backdrop-blur-md bg-gray-900/70 border-b border-gray-700/50 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-6 flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div>
                        <Image src="/logo.png" alt="Power Pulse Logo" width={48} height={48} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Power Pulse</h1>
                        <p className="text-sm text-gray-400">Ultimate Smart Power Controller for Demand Side Management</p>
                    </div>
                </div>
            </div>


        </header >
    );
}
