import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertCircle, Plus, X, Braces, List } from 'lucide-react';

const JsonOutline = ({ data, colors, error, onAdd }) => {
    const [expandedPaths, setExpandedPaths] = useState(new Set(['root']));
    const [showAddModal, setShowAddModal] = useState(null); // { path: string, isArray: boolean }
    const [newItem, setNewItem] = useState({ key: '', value: '', type: 'string' });

    const toggleExpand = (path) => {
        const next = new Set(expandedPaths);
        if (next.has(path)) next.delete(path);
        else next.add(path);
        setExpandedPaths(next);
    };

    const handleAddClick = (e, path, isArray) => {
        e.stopPropagation();
        setShowAddModal({ path, isArray });
        setNewItem({ key: '', value: '', type: 'string' });
    };

    const submitAdd = () => {
        let finalValue = newItem.value;
        if (newItem.type === 'number') finalValue = Number(newItem.value);
        if (newItem.type === 'boolean') finalValue = newItem.value === 'true';
        if (newItem.type === 'object') finalValue = {};
        if (newItem.type === 'array') finalValue = [];

        onAdd(showAddModal.path, newItem.key, finalValue);
        setShowAddModal(null);
    };

    const renderOutline = (obj, path = 'root') => {
        const isExpanded = expandedPaths.has(path);
        const isArray = Array.isArray(obj);
        const isObject = typeof obj === 'object' && obj !== null;

        if (!isObject) return null;

        return (
            <div className="text-[12px] font-sans">
                <div
                    className="group flex items-center justify-between py-1 px-2 hover:bg-white/5 cursor-pointer rounded transition-colors"
                    onClick={() => toggleExpand(path)}
                >
                    <div className="flex items-center gap-1 overflow-hidden">
                        {isExpanded ? <ChevronDown size={14} className="opacity-40" /> : <ChevronRight size={14} className="opacity-40" />}
                        <span className={`${colors.accent} font-mono font-bold shrink-0`}>{isArray ? '[]' : '{}'}</span>
                        <span className="opacity-80 truncate">{path === 'root' ? 'root' : path.split('.').pop()}</span>
                    </div>

                    <button
                        onClick={(e) => handleAddClick(e, path, isArray)}
                        className="opacity-100 lg:opacity-0 group-hover:opacity-100 p-2 lg:p-1 hover:bg-blue-500/20 text-blue-400 rounded transition-all"
                    >
                        <Plus size={20} className="lg:w-3.5 lg:h-3.5" />
                    </button>

                </div>

                {isExpanded && (
                    <div className="ml-3 border-l border-white/10 pl-2">
                        {Object.entries(obj).map(([key, value]) => {
                            const childPath = `${path}.${key}`;
                            const isChildObj = typeof value === 'object' && value !== null;

                            return (
                                <div key={key}>
                                    {isChildObj ? (
                                        renderOutline(value, childPath)
                                    ) : (
                                        <div className="flex items-center gap-2 py-0.5 px-2 hover:bg-white/5 rounded">
                                            <span className="opacity-40 font-mono text-[10px] uppercase tracking-tighter shrink-0">{key}:</span>
                                            <span className={`font-mono truncate ${typeof value === 'string' ? 'text-emerald-500' : 'text-orange-400'}`}>
                                                {JSON.stringify(value)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    if (error) {
        return (
            <div className="p-4 flex flex-col items-center justify-center h-full opacity-30 text-center gap-2">
                <AlertCircle size={24} />
                <span className="text-[10px]">Fix JSON to preview</span>
            </div>
        );
    }

    return (
        <div className="relative h-full">
            {renderOutline(data)}

            {/* In-Line Popup for Adding Items */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className={`w-80 p-5 rounded-2xl shadow-2xl border ${colors.border} ${colors.sidebar}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <Plus size={16} className="text-blue-500" />
                                Add to {showAddModal.isArray ? 'Array' : 'Object'}
                            </h3>
                            <button onClick={() => setShowAddModal(null)} className="opacity-40 hover:opacity-100"><X size={16} /></button>
                        </div>

                        <div className="space-y-4">
                            {!showAddModal.isArray && (
                                <div>
                                    <label className="text-[10px] uppercase font-bold opacity-40 block mb-1">Key Name</label>
                                    <input
                                        autoFocus
                                        className={`w-full bg-black/20 border ${colors.border} rounded-lg px-3 py-2 text-xs focus:ring-1 ring-blue-500 outline-none`}
                                        placeholder="e.g. username"
                                        value={newItem.key}
                                        onChange={(e) => setNewItem({ ...newItem, key: e.target.value })}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="text-[10px] uppercase font-bold opacity-40 block mb-1">Value Type</label>
                                <select
                                    className={`w-full bg-black/20 border ${colors.border} rounded-lg px-3 py-2 text-xs outline-none`}
                                    value={newItem.type}
                                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                                >
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="boolean">Boolean</option>
                                    <option value="object">Object { }</option>
                                    <option value="array">Array []</option>
                                </select>
                            </div>

                            {(newItem.type !== 'object' && newItem.type !== 'array') && (
                                <div>
                                    <label className="text-[10px] uppercase font-bold opacity-40 block mb-1">Value</label>
                                    {newItem.type === 'boolean' ? (
                                        <select
                                            className={`w-full bg-black/20 border ${colors.border} rounded-lg px-3 py-2 text-xs outline-none`}
                                            value={newItem.value}
                                            onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                                        >
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    ) : (
                                        <input
                                            className={`w-full bg-black/20 border ${colors.border} rounded-lg px-3 py-2 text-xs focus:ring-1 ring-blue-500 outline-none`}
                                            placeholder="Value..."
                                            value={newItem.value}
                                            onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                                        />
                                    )}
                                </div>
                            )}

                            <button
                                onClick={submitAdd}
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JsonOutline;
