import React, { useState, useCallback, useEffect } from 'react';
import { useResizer } from './hooks/useResizer';
import { useJsonActions } from './hooks/useJsonActions';
import { THEME_KEY } from './constants/config';
import { THEMES } from './constants/themes';


// Components
import Header from './components/layout/Header';
import MenuBar from './components/layout/MenuBar';
import ActivityBar from './components/layout/ActivityBar';
import { LeftSidebar, RightSidebar } from './components/layout/Sidebar';
import Resizer from './components/common/Resizer';
import Footer from './components/layout/Footer';
import EditorPane from './components/editor/EditorPane';
import JsonOutline from './components/preview/JsonOutline';
import UrlModal from './components/modals/UrlModal';
import NewFileModal from './components/modals/NewFileModal';


export default function App() {
    // --- Theme ---
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem(THEME_KEY) || 'dark';
    });

    useEffect(() => {
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    // --- JSON Logic (Multiple Files) ---
    const {
        files, activeFile, activeFileId, setActiveFileId,
        statusMsg, handleTextChange, beautify, minify,
        copyToClipboard, pasteFromClipboard, exportJson,
        addFile, deleteFile, updateJsonAt, showStatus, isLoaded
    } = useJsonActions();


    // Parse active content for preview/errors
    const [previewData, setPreviewData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!activeFile) return;
        try {
            const parsed = JSON.parse(activeFile.content);
            setPreviewData(parsed);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }, [activeFile]);

    // --- Sidebar & Resizing ---
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
    const {
        leftWidth, rightWidth, isResizingLeft, isResizingRight,
        startResizingLeft, startResizingRight
    } = useResizer();

    // --- Modals & Mobile ---
    const [showUrlModal, setShowUrlModal] = useState(false);
    const [showNewFileModal, setShowNewFileModal] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [mobileTab, setMobileTab] = useState('editor');

    const handleAddFileClick = useCallback(() => {
        setShowNewFileModal(true);
    }, []);


    const loadFromUrl = useCallback(async () => {
        if (!urlInput) return;
        showStatus('Fetching...');
        try {
            const response = await fetch(urlInput);
            const fetchedData = await response.json();
            const content = JSON.stringify(fetchedData, null, 2);
            handleTextChange(content);
            setShowUrlModal(false);
            showStatus('Loaded from URL');
        } catch (e) {
            showStatus('Fetch Failed', 'error');
        }
    }, [urlInput, handleTextChange, showStatus]);

    // --- CRITICAL: Conditional return must come AFTER all hook declarations ---
    if (!isLoaded) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-[#1e1e1e] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs uppercase tracking-[0.2em] font-black opacity-40">Initializing Workspace...</span>
                </div>
            </div>
        );
    }

    // --- UI Theme Derivation ---
    const activeTheme = THEMES[theme] || THEMES.dark;
    const colors = activeTheme.colors;

    return (
        <div className={`flex flex-col h-screen overflow-hidden ${colors.bg} ${colors.text} font-sans ${isResizingLeft || isResizingRight ? 'cursor-col-resize select-none' : ''}`}>

            <Header theme={theme} setTheme={setTheme} colors={colors} />

            <MenuBar
                copyToClipboard={copyToClipboard}
                pasteFromClipboard={pasteFromClipboard}
                setShowUrlModal={setShowUrlModal}
                beautify={beautify}
                minify={minify}
                exportJson={exportJson}
                colors={colors}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ActivityBar
                    leftSidebarOpen={leftSidebarOpen}
                    setLeftSidebarOpen={setLeftSidebarOpen}
                    rightSidebarOpen={rightSidebarOpen}
                    setRightSidebarOpen={setRightSidebarOpen}
                    colors={colors}
                />

                <LeftSidebar
                    isOpen={leftSidebarOpen}
                    width={leftWidth}
                    onClose={() => setLeftSidebarOpen(false)}
                    colors={colors}
                    files={files}
                    activeFileId={activeFileId}
                    onFileSelect={setActiveFileId}
                    onAddFile={handleAddFileClick}
                    onDeleteFile={deleteFile}
                />

                <Resizer
                    onMouseDown={startResizingLeft}
                    isVisible={leftSidebarOpen}
                    className={colors.resizer}
                />

                <EditorPane
                    jsonText={activeFile ? activeFile.content : ''}
                    handleTextChange={handleTextChange}
                    mobileTab={mobileTab}
                    setMobileTab={setMobileTab}
                    theme={theme}
                    colors={colors}
                    error={error}
                    renderPreview={() => <JsonOutline data={previewData} colors={colors} error={error} onAdd={updateJsonAt} />}
                    files={files}
                    activeFileId={activeFileId}
                    onFileSelect={setActiveFileId}
                    onAddFile={handleAddFileClick}
                    onDeleteFile={deleteFile}
                />


                <Resizer
                    onMouseDown={startResizingRight}
                    isVisible={rightSidebarOpen}
                    className={colors.resizer}
                />

                <RightSidebar
                    isOpen={rightSidebarOpen}
                    width={rightWidth}
                    onClose={() => setRightSidebarOpen(false)}
                    colors={colors}
                >
                    <JsonOutline data={previewData} colors={colors} error={error} onAdd={updateJsonAt} />
                </RightSidebar>

            </div>

            <Footer
                error={error}
                jsonText={activeFile ? activeFile.content : ''}
                statusMsg={statusMsg}
                theme={theme}
                colors={colors}
            />

            <UrlModal
                isOpen={showUrlModal}
                onClose={() => setShowUrlModal(false)}
                urlInput={urlInput}
                setUrlInput={setUrlInput}
                onLoad={loadFromUrl}
                colors={colors}
            />

            <NewFileModal
                isOpen={showNewFileModal}
                onClose={() => setShowNewFileModal(false)}
                onAdd={addFile}
                colors={colors}
            />

            <style dangerouslySetInnerHTML={{

                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                textarea { caret-color: #007acc; outline: none !important; }
                .scrollbar-thin::-webkit-scrollbar { width: 4px; }
                .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(120,120,120,0.1); border-radius: 10px; }
            `}} />
        </div>
    );
}
