import React from 'react';
import { ShieldCheck } from 'lucide-react';


const Footer = ({ error, jsonText, statusMsg, theme, colors }) => {
    const isLight = theme === 'light';

    return (
        <footer className={`h-6 shrink-0 border-t ${colors.border} ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-blue-600 text-white'} flex items-center px-3 justify-between text-[10px] font-bold z-50 transition-colors`}>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`} />
                    <span className="opacity-90">{error ? 'Syntax Error' : 'JSON Valid'}</span>
                </div>
                <span className="opacity-60 font-mono tracking-tighter">
                    Ln {jsonText.split('\n').length}, Col {jsonText.length}
                </span>

                <div className="h-3 w-[1px] bg-white/10 mx-1 hidden sm:block" />

                <div className="hidden sm:flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-help" title="Your data never leaves your browser. All processing is 100% local.">
                    <ShieldCheck size={12} className="text-emerald-400" />
                    <span className="uppercase tracking-tighter">Privacy First / Local-Only</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {statusMsg && (
                    <span className={`animate-pulse ${isLight ? 'bg-blue-500 text-white' : 'bg-white/20 text-white'} px-2 py-0.5 rounded tracking-normal normal-case`}>
                        {statusMsg}
                    </span>
                )}
                <span className="opacity-60 uppercase tracking-widest">UTF-8 / JSON</span>
            </div>
        </footer>
    );
};

export default Footer;
