import React from 'react';
import { Copy, Clipboard, Link, Zap, Code, Download } from 'lucide-react';

const MenuBar = ({
    copyToClipboard,
    pasteFromClipboard,
    setShowUrlModal,
    beautify,
    minify,
    exportJson,
    colors
}) => {
    return (
        <nav className={`h-10 flex items-center px-2 gap-1 shrink-0 border-b ${colors.border} ${colors.menubar} overflow-x-auto no-scrollbar z-40`}>
            <button onClick={copyToClipboard} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded text-[11px] font-bold">
                <Copy size={13} /> Copy
            </button>
            <button onClick={pasteFromClipboard} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded text-[11px] font-bold">
                <Clipboard size={13} /> Paste
            </button>
            <button onClick={() => setShowUrlModal(true)} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded text-[11px] font-bold">
                <Link size={13} /> Load URL
            </button>
            <div className={`h-4 w-[1px] ${colors.border} mx-2`} />
            <button onClick={beautify} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded text-[11px] font-bold">
                <Zap size={13} className="text-yellow-500" /> Beautify
            </button>
            <button onClick={minify} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded text-[11px] font-bold">
                <Code size={13} className="text-blue-500" /> Minify
            </button>
            <button onClick={exportJson} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded text-[11px] font-bold">
                <Download size={13} className="text-emerald-500" /> Export
            </button>
        </nav>
    );
};

export default MenuBar;
