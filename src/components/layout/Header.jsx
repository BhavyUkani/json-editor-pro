import React, { useState, useRef, useEffect } from 'react';
import { Palette, ChevronDown, Github } from 'lucide-react';

import { THEMES } from '../../constants/themes';

const Header = ({ theme, setTheme, colors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className={`h-11 flex items-center justify-between px-3 sm:px-4 shrink-0 border-b ${colors.border} ${colors.header} z-50`}>
            <div className="flex items-center gap-2 sm:gap-3">
                <img src="/logo.png" alt="Logo" className="w-7 h-7 sm:w-8 sm:h-8 rounded-md shadow-sm" />
                <div className="flex flex-col">
                    <span className="text-[10px] sm:text-[11px] font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase opacity-90 truncate max-w-[80px] sm:max-w-none">
                        JSON Pro
                    </span>
                    <div className="flex items-center gap-1 opacity-30 text-[8px] uppercase font-bold tracking-tighter">
                        <ShieldCheck size={10} className="text-emerald-500" />
                        <span className="hidden xs:inline">Local-Only</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4" ref={dropdownRef}>
                {/* Theme Selector Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg border ${colors.border} bg-black/10 hover:bg-black/20 transition-all text-[10px] font-bold uppercase tracking-wider active:scale-95`}
                    >
                        <Palette size={14} className={colors.accent} />
                        <span className="hidden sm:inline opacity-80">{THEMES[theme]?.name || 'Theme'}</span>
                        <ChevronDown size={12} className={`opacity-40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div className={`absolute right-0 top-full mt-1 w-48 rounded-xl border ${colors.border} ${colors.sidebar} shadow-2xl transition-all z-[100] transform origin-top-right p-1
                        ${isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}
                    >
                        {Object.entries(THEMES).map(([key, t]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setTheme(key);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-colors ${theme === key ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}
                            >
                                {t.name}
                                {theme === key && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* GitHub Link */}
                <a
                    href="https://github.com/BhavyUkani/json-editor-pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${colors.border} bg-black/10 hover:bg-black/20 transition-all text-[10px] font-bold uppercase tracking-wider active:scale-95`}
                >
                    <Github size={14} />
                    <span className="hidden md:inline">GitHub</span>
                </a>
            </div>

        </header>
    );
};

export default Header;
