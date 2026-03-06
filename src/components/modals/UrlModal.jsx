import React from 'react';
import { Link } from 'lucide-react';

const UrlModal = ({ isOpen, onClose, urlInput, setUrlInput, onLoad, colors }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className={`${colors.sidebar} border ${colors.border} w-full max-w-md rounded-2xl p-6 shadow-2xl`}>
                <div className="flex items-center gap-2 mb-4">
                    <Link size={18} className="text-blue-500" />
                    <h3 className="text-sm font-black uppercase tracking-widest">Load JSON</h3>
                </div>
                <input
                    autoFocus
                    className={`w-full p-4 rounded-xl border ${colors.border} ${colors.bg} text-sm focus:outline-none focus:ring-2 ring-blue-500/50 mb-6`}
                    placeholder="https://api.example.com/data.json"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onLoad()}
                />
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 text-xs font-bold opacity-60">Cancel</button>
                    <button onClick={onLoad} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20">Fetch</button>
                </div>
            </div>
        </div>
    );
};

export default UrlModal;
