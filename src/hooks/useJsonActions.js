import { useState, useCallback, useEffect } from 'react';
import { get, set } from 'idb-keyval';
import { INITIAL_DATA, STORAGE_KEY } from '../constants/config';

export function useJsonActions() {
    const [files, setFiles] = useState([
        { id: 'main.json', name: 'main.json', content: JSON.stringify(INITIAL_DATA, null, 2) }
    ]);
    const [activeFileId, setActiveFileId] = useState('main.json');
    const [statusMsg, setStatusMsg] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial Load from IndexedDB
    useEffect(() => {
        async function loadData() {
            try {
                const savedFiles = await get(`${STORAGE_KEY}_files_db`);
                const savedActiveId = await get(`${STORAGE_KEY}_active_file_db`);

                if (savedFiles && Array.isArray(savedFiles)) {
                    setFiles(savedFiles);
                }
                if (savedActiveId) {
                    setActiveFileId(savedActiveId);
                }
            } catch (err) {
                console.error('Failed to load from IndexedDB:', err);
            } finally {
                setIsLoaded(true);
            }
        }
        loadData();
    }, []);

    const activeFile = files.find(f => f.id === activeFileId) || files[0];

    const showStatus = useCallback((msg) => {
        setStatusMsg(msg);
        setTimeout(() => setStatusMsg(''), 3000);
    }, []);

    const handleTextChange = useCallback((val) => {
        setFiles(prev => prev.map(f =>
            f.id === activeFileId ? { ...f, content: val } : f
        ));
    }, [activeFileId]);

    const beautify = useCallback(() => {
        if (!activeFile) return;
        try {
            const parsed = JSON.parse(activeFile.content);
            const formatted = JSON.stringify(parsed, null, 2);
            handleTextChange(formatted);
            showStatus('Formatted');
        } catch (e) {
            showStatus('Invalid JSON', 'error');
        }
    }, [activeFile, handleTextChange, showStatus]);

    const minify = useCallback(() => {
        if (!activeFile) return;
        try {
            const parsed = JSON.parse(activeFile.content);
            const minified = JSON.stringify(parsed);
            handleTextChange(minified);
            showStatus('Minified');
        } catch (e) {
            showStatus('Invalid JSON', 'error');
        }
    }, [activeFile, handleTextChange, showStatus]);

    const copyToClipboard = useCallback(() => {
        if (!activeFile) return;
        navigator.clipboard.writeText(activeFile.content).then(() => {
            showStatus('Copied');
        });
    }, [activeFile, showStatus]);

    const pasteFromClipboard = useCallback(async () => {
        try {
            const text = await navigator.clipboard.readText();
            handleTextChange(text);
            showStatus('Pasted');
        } catch (e) {
            showStatus('Paste Failed', 'error');
        }
    }, [handleTextChange, showStatus]);

    const exportJson = useCallback(() => {
        if (!activeFile) return;
        const blob = new Blob([activeFile.content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = activeFile.name;
        a.click();
        showStatus('Exported');
    }, [activeFile, showStatus]);

    const addFile = useCallback((name) => {
        if (name && name.endsWith('.json')) {
            const newFile = {
                id: name + '_' + Date.now(), // Ensure unique ID
                name: name,
                content: '{\n  \n}'
            };
            setFiles(prev => [...prev, newFile]);
            setActiveFileId(newFile.id);
            showStatus('File Created');
            return true;
        }
        return false;
    }, [showStatus]);


    const deleteFile = useCallback((id) => {
        if (files.length === 1) return;
        if (confirm(`Delete this file?`)) {
            const remainingFiles = files.filter(f => f.id !== id);
            setFiles(remainingFiles);
            if (activeFileId === id) {
                setActiveFileId(remainingFiles[0].id);
            }
            showStatus('File Deleted');
        }
    }, [files, activeFileId, showStatus]);

    // Save to IndexedDB whenever files or active selection changes
    useEffect(() => {
        if (!isLoaded) return; // Prevent overwriting with initial state

        async function saveData() {
            try {
                await set(`${STORAGE_KEY}_files_db`, files);
                await set(`${STORAGE_KEY}_active_file_db`, activeFileId);
            } catch (err) {
                console.error('Failed to save to IndexedDB:', err);
            }
        }
        saveData();
    }, [files, activeFileId, isLoaded]);

    const updateJsonAt = useCallback((path, key, value) => {
        try {
            const currentData = JSON.parse(activeFile.content);

            // Helper to mutate object by path
            const mutate = (obj, pathParts) => {
                let target = obj;
                // path is like "root.features" -> parts are ["features"]
                // "root" is ignored
                const parts = pathParts.split('.').slice(1);

                for (const part of parts) {
                    target = target[part];
                }

                if (Array.isArray(target)) {
                    target.push(value);
                } else {
                    target[key] = value;
                }
                return obj;
            };

            const newData = mutate(currentData, path);
            handleTextChange(JSON.stringify(newData, null, 2));
            showStatus('Data Added');
        } catch (e) {
            showStatus('Mutation Failed', 'error');
        }
    }, [activeFile, handleTextChange, showStatus]);

    return {
        files,
        activeFile,
        activeFileId,
        setActiveFileId,
        statusMsg,
        handleTextChange,
        beautify,
        minify,
        copyToClipboard,
        pasteFromClipboard,
        exportJson,
        addFile,
        deleteFile,
        updateJsonAt,
        showStatus,
        isLoaded
    };
}

