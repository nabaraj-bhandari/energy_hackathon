import { Zap, Target } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="backdrop-blur-md bg-gray-900/70 border-t border-gray-700/50 ">
            <div className="container mx-auto px-4 py-8 flex items-center justify-center text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span>Energy Hackathon © 2026</span>
                </div>
            </div>
        </footer>
    );
}
