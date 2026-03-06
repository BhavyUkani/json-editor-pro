import React from 'react';
import { Braces, Sun, Moon } from 'lucide-react';

const Header = ({ isDark, setTheme, colors }) => {
    return (
        <header className={`h-10 flex items-center justify-between px-3 shrink-0 border-b ${colors.border} ${colors.header} z-50`}>
            <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="w-5 h-5 rounded-md shadow-sm" />
                <span className="text-xs font-black tracking-widest uppercase opacity-90">JSON Pro IDE</span>
            </div>

            <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-1.5 rounded-md hover:bg-white/10 transition-all`}
            >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
        </header>
    );
};

export default Header;
