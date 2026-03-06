import React, { useState } from 'react';
import { Plus, X, FileCode } from 'lucide-react';

const NewFileModal = ({ isOpen, onClose, onAdd, colors }) => {
    const [name, setName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!name.endsWith('.json')) {
            alert('Filename must end with .json');
            return;
        }
        if (onAdd(name)) {
            setName('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className={`${colors.sidebar} border ${colors.border} w-full max-w-sm rounded-2xl p-6 shadow-2xl`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <FileCode size={20} className="text-blue-500" />
                        <h3 className="text-sm font-black uppercase tracking-widest">Create New File</h3>
                    </div>
                    <button onClick={onClose} className="opacity-40 hover:opacity-100 transition-opacity">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] uppercase font-bold opacity-30 block mb-2 px-1">Filename</label>
                        <input
                            autoFocus
                            className={`w-full p-4 rounded-xl border ${colors.border} ${colors.bg} text-sm focus:outline-none focus:ring-2 ring-blue-500/50 transition-all font-mono`}
                            placeholder="my-data.json"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                    >
                        Create File
                    </button>

                    <p className="text-[10px] text-center opacity-30">
                        The file will be saved in your local workspace.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewFileModal;
