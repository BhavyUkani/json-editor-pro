import React from 'react';

const Footer = ({ error, jsonText, statusMsg, isDark, colors }) => {
    return (
        <footer className={`h-6 shrink-0 border-t ${colors.border} ${isDark ? 'bg-[#007acc]' : 'bg-[#e5e5e5]'} text-white flex items-center px-3 justify-between text-[10px] font-bold z-50`}>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`} />
                    <span className={isDark ? 'text-white' : 'text-slate-800'}>{error ? 'Syntax Error' : 'JSON Valid'}</span>
                </div>
                <span className={`opacity-80 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    Ln {jsonText.split('\n').length}, Col {jsonText.length}
                </span>
            </div>
            <div className="flex items-center gap-4">
                {statusMsg && (
                    <span className="animate-pulse bg-white/20 px-2 rounded tracking-normal normal-case">
                        {statusMsg}
                    </span>
                )}
                <span className={`opacity-80 ${isDark ? 'text-white' : 'text-slate-800'}`}>JSON</span>
            </div>
        </footer>
    );
};

export default Footer;
