import React from 'react';
import { ChevronLeft, ChevronRightSquare, Files, Eye, Plus, Trash2, FileCode } from 'lucide-react';

export const LeftSidebar = ({ isOpen, width, onClose, colors, files, activeFileId, onFileSelect, onAddFile, onDeleteFile }) => {
    return (
        <aside
            className={`hidden lg:flex flex-col border-r ${colors.border} ${colors.sidebar} transition-[width] duration-75 overflow-hidden`}
            style={{ width: isOpen ? `${width}px` : '0px' }}
        >
            <div className="h-9 flex items-center justify-between px-4 shrink-0 border-b border-white/5 whitespace-nowrap">
                <span className="text-[10px] uppercase font-black opacity-40 tracking-widest">Explorer</span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={onAddFile}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="New JSON File"
                    >
                        <Plus size={14} />
                    </button>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
                        <ChevronLeft size={14} />
                    </button>
                </div>
            </div>
            <div className="flex-1 p-2 overflow-auto whitespace-nowrap">
                {files.map(file => (
                    <div
                        key={file.id}
                        onClick={() => onFileSelect(file.id)}
                        className={`group flex items-center justify-between p-2 rounded cursor-pointer transition-all mb-1
                            ${activeFileId === file.id
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <FileCode size={14} className={activeFileId === file.id ? 'text-blue-400' : 'text-white/40'} />
                            <span className="text-xs font-medium truncate">{file.name}</span>
                        </div>
                        {files.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteFile(file.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 hover:text-red-400 rounded transition-all"
                            >
                                <Trash2 size={12} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
};

export const RightSidebar = ({ isOpen, width, onClose, colors, children }) => {
    return (
        <aside
            className={`hidden lg:flex flex-col border-l ${colors.border} ${colors.sidebar} transition-[width] duration-75 overflow-hidden`}
            style={{ width: isOpen ? `${width}px` : '0px' }}
        >
            <div className="h-9 flex items-center justify-between px-4 shrink-0 border-b border-white/5 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <Eye size={14} className="opacity-40" />
                    <span className="text-[10px] uppercase font-black opacity-40 tracking-widest">Outline</span>
                </div>
                <button onClick={onClose}><ChevronRightSquare size={14} /></button>
            </div>
            <div className="flex-1 p-3 overflow-auto scrollbar-thin whitespace-nowrap">
                {children}
            </div>
        </aside>
    );
};
