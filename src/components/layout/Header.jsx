import { useState, useEffect } from 'react';

function Header({ darkMode, setDarkMode }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Real-time clock - updates every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <header className="bg-white/80 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800/50 px-6 py-4 sticky top-0 z-20 backdrop-blur-xl transition-colors duration-300">
            <div className="flex items-center justify-between max-w-[1920px] mx-auto">
                <div className="flex items-center gap-4">
                    {/* Logo/Brand */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-blue-200 bg-clip-text text-transparent transition-all">HAITANI EMPIRE</h1>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 tracking-widest mt-0.5 uppercase font-medium transition-colors">Point of Sale System</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-medium transition-colors">
                            {currentTime.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono transition-colors">{currentTime.toLocaleTimeString()}</p>
                    </div>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2" />
                                <path d="M12 20v2" />
                                <path d="m4.93 4.93 1.41 1.41" />
                                <path d="m17.66 17.66 1.41 1.41" />
                                <path d="M2 12h2" />
                                <path d="M20 12h2" />
                                <path d="m6.34 17.66-1.41 1.41" />
                                <path d="m19.07 4.93-1.41 1.41" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
