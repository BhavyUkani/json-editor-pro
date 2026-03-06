import React from 'react';
import Editor from '@monaco-editor/react';
import { Plus, Trash2, FileCode } from 'lucide-react';

const EditorPane = ({
    jsonText,
    handleTextChange,
    mobileTab,
    setMobileTab,
    isDark,
    colors,
    error,
    renderPreview,
    files = [],
    activeFileId,
    onFileSelect,
    onAddFile,
    onDeleteFile
}) => {
    const editorTheme = isDark ? 'vs-dark' : 'light';

    const editorOptions = {
        fontSize: window.innerWidth < 1024 ? 16 : 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        lineNumbers: 'on',
        glyphMargin: false,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        formatOnPaste: true,
        formatOnType: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        bracketPairColorization: { enabled: true },
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
        // Mobile specific improvements
        fixedOverflowWidgets: true,
        dragAndDrop: false,
        links: false,
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
        }
    };

    return (
        <main className={`flex-1 flex flex-col min-w-0 ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
            {/* Mobile Tabbed Nav */}
            <div className="lg:hidden flex h-10 border-b border-white/5 shrink-0">
                <button
                    onClick={() => setMobileTab('files')}
                    className={`flex-1 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${mobileTab === 'files' ? 'text-blue-500 border-b-2 border-blue-500' : 'opacity-40'}`}
                >
                    Files
                </button>
                <button
                    onClick={() => setMobileTab('editor')}
                    className={`flex-1 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${mobileTab === 'editor' ? 'text-blue-500 border-b-2 border-blue-500' : 'opacity-40'}`}
                >
                    Editor
                </button>
                <button
                    onClick={() => setMobileTab('preview')}
                    className={`flex-1 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${mobileTab === 'preview' ? 'text-blue-500 border-b-2 border-blue-500' : 'opacity-40'}`}
                >
                    Preview
                </button>
            </div>

            <div className="flex-1 flex relative overflow-hidden">
                {(mobileTab === 'editor' || window.innerWidth > 1024) && (
                    <div className="flex-1 overflow-hidden h-full w-full">
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            theme={editorTheme}
                            value={jsonText}
                            onChange={(value) => handleTextChange(value || '')}
                            options={editorOptions}
                            loading={
                                <div className="flex items-center justify-center h-full opacity-20 text-xs uppercase tracking-widest">
                                    Initializing Editor...
                                </div>
                            }
                        />
                    </div>
                )}

                {window.innerWidth <= 1024 && mobileTab === 'files' && (
                    <div className="flex-1 p-4 overflow-auto bg-[#1e1e1e] text-[#cccccc]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] uppercase font-black opacity-40 tracking-widest">Explorer</span>
                            <button
                                onClick={() => {
                                    console.log('Mobile Add File clicked');
                                    onAddFile();
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-[10px] font-bold uppercase tracking-wider active:bg-blue-600/40 transition-all"
                            >
                                <Plus size={14} /> New File
                            </button>

                        </div>
                        <div className="space-y-2">
                            {files.map(file => (
                                <div
                                    key={file.id}
                                    onClick={() => {
                                        onFileSelect(file.id);
                                        setMobileTab('editor');
                                    }}
                                    className={`flex items-center justify-between p-4 rounded-xl transition-all
                                        ${activeFileId === file.id
                                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            : 'bg-white/5 text-white/60'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <FileCode size={18} />
                                        <span className="text-sm font-medium">{file.name}</span>
                                    </div>
                                    {files.length > 1 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteFile(file.id);
                                            }}
                                            className="p-2 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {window.innerWidth <= 1024 && mobileTab === 'preview' && (
                    <div className="flex-1 p-4 overflow-auto bg-[#1e1e1e]">
                        {error ? (
                            <div className="p-8 flex flex-col items-center justify-center opacity-30 text-center gap-4">
                                <FileCode size={48} />
                                <span className="text-sm">Fix syntax errors to view dynamic outline</span>
                            </div>
                        ) : renderPreview()}
                    </div>
                )}
            </div>
        </main>
    );
};

export default EditorPane;
