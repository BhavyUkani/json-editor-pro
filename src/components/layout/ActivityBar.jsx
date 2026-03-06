import React from 'react';
import { Files, LayoutGrid, Settings } from 'lucide-react';

const ActivityBar = ({
    leftSidebarOpen,
    setLeftSidebarOpen,
    rightSidebarOpen,
    setRightSidebarOpen,
    colors
}) => {
    return (
        <div className={`hidden lg:flex w-12 flex-col items-center py-4 gap-4 shrink-0 ${colors.activity} z-30 border-r ${colors.border}`}>
            {/* Left Sidebar Toggle */}
            <button
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                title="Explorer"
                className={`relative group p-2 rounded-lg transition-all duration-200 
                    ${leftSidebarOpen
                        ? 'text-white bg-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
            >
                <Files size={22} strokeWidth={leftSidebarOpen ? 2 : 1.5} />
                {leftSidebarOpen && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-blue-500 rounded-r-full" />
                )}
                {!leftSidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#333] text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
                        Explorer
                    </div>
                )}
            </button>

            {/* Right Sidebar Toggle */}
            <button
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                title="Outline"
                className={`relative group p-2 rounded-lg transition-all duration-200 
                    ${rightSidebarOpen
                        ? 'text-white bg-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
            >
                <LayoutGrid size={22} strokeWidth={rightSidebarOpen ? 2 : 1.5} />
                {rightSidebarOpen && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-blue-500 rounded-l-full" />
                )}
                {!rightSidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#333] text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
                        Outline
                    </div>
                )}
            </button>

            <div className="mt-auto mb-2 flex flex-col gap-4">
                <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all group relative">
                    <Settings size={20} />
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#333] text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
                        Settings
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ActivityBar;
