import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 py-8 mt-20 relative z-10 glass">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>© {currentYear} AuroraFolio by Your Name. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        GitHub
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        LinkedIn
                    </Link>
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        Twitter
                    </Link>
                </div>
            </div>
        </footer>
    );
}
